import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';
import { sendEmiReminderEmail } from '@/lib/brevoMailer';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Optional secret check for authorized cron invocations
    const { searchParams } = new URL(request.url);
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = request.headers.get('authorization');
    const querySecret = searchParams.get('secret');

    if (cronSecret && querySecret !== cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized cron invocation' }, { status: 401 });
    }

    await clientPromise();
    const collection = mongoose.connection.collection('student_registrations');

    // Find all registrations with outstanding EMI balance
    const pendingStudents = await collection
      .find({
        remainingBalance: { $gt: 0 },
        emiCount: { $gt: 0 },
      })
      .toArray();

    const now = new Date();
    let remindersSent = 0;
    const results: any[] = [];

    for (const student of pendingStudents) {
      if (!student.email || !student.createdAt) continue;

      const createdDate = new Date(student.createdAt);
      const daysSinceRegistration = Math.floor(
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const emiCount = Number(student.emiCount || 3);
      const emiAmount = Number(student.emiAmount || Math.ceil(student.remainingBalance / emiCount));

      // Determine if an installment is currently due for reminder
      let dueInstallment: number | null = null;
      let installmentDueDate = '';

      if (daysSinceRegistration >= 25 && daysSinceRegistration <= 32) {
        dueInstallment = 1;
        const d = new Date(createdDate);
        d.setDate(d.getDate() + 30);
        installmentDueDate = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if (daysSinceRegistration >= 55 && daysSinceRegistration <= 62) {
        dueInstallment = 2;
        const d = new Date(createdDate);
        d.setDate(d.getDate() + 60);
        installmentDueDate = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if (emiCount === 3 && daysSinceRegistration >= 85 && daysSinceRegistration <= 92) {
        dueInstallment = 3;
        const d = new Date(createdDate);
        d.setDate(d.getDate() + 90);
        installmentDueDate = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      }

      if (dueInstallment !== null) {
        // Prevent sending duplicate reminder for the same installment within 10 days
        const lastSent = student.lastEmiReminderSent;
        if (
          lastSent &&
          lastSent.installmentNumber === dueInstallment &&
          Math.floor((now.getTime() - new Date(lastSent.date).getTime()) / (1000 * 60 * 60 * 24)) < 10
        ) {
          continue;
        }

        const paymentLink = `https://www.adshalaa.com/student-registration?payEmi=true&course=${encodeURIComponent(
          student.course || ''
        )}&email=${encodeURIComponent(student.email)}&amount=${emiAmount}`;

        await sendEmiReminderEmail({
          studentName: student.name || 'Student',
          studentEmail: student.email,
          course: student.course || 'Adshalaa Professional Course',
          installmentNumber: dueInstallment,
          totalInstallments: emiCount,
          emiAmount,
          dueDate: installmentDueDate,
          paymentLink,
        });

        // Record that this installment reminder was sent
        await collection.updateOne(
          { _id: student._id },
          {
            $set: {
              lastEmiReminderSent: {
                installmentNumber: dueInstallment,
                date: now,
              },
            },
          }
        );

        remindersSent++;
        results.push({
          studentEmail: student.email,
          installment: dueInstallment,
          amount: emiAmount,
          dueDate: installmentDueDate,
        });
      }
    }

    return NextResponse.json({
      success: true,
      processedCount: pendingStudents.length,
      remindersSent,
      results,
      executedAt: now.toISOString(),
    });
  } catch (error: any) {
    console.error('[EMI Reminders Cron Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
