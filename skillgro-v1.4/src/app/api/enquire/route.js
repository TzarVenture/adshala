import { NextResponse } from 'next/server';
import clientPromise  from '@/lib/mongodb';
import { google } from 'googleapis';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Google Sheets ────────────────────────────────────────────────────────────
async function appendToSheet(data) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const row = [
    new Date().toISOString().split("T")[0],
    data.name,
    data.phone,
    data.email,
    data.city,
    data.program,
    data.message,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ─── MongoDB ──────────────────────────────────────────────────────────────────
import mongoose from "mongoose";

async function saveToMongo(data) {
  await clientPromise();

  console.log(data);
  await mongoose.connection.collection("enquiries").insertOne({
    ...data,
    createdAt: new Date(),
  });
}

// ─── Email ────────────────────────────────────────────────────────────────────
// async function sendEmail(data) {
//   await resend.emails.send({
//     from: process.env.EMAIL_FROM,           // e.g. 'no-reply@yourdomain.com'
//     to: process.env.EMAIL_TO,               // client's email
//     subject: `New Enquiry — ${data.program}`,
//     html: `
//       <h2>New Enquiry Received</h2>
//       <p><strong>Name:</strong> ${data.name}</p>
//       <p><strong>Phone:</strong> ${data.phone}</p>
//       <p><strong>Email:</strong> ${data.email}</p>
//       <p><strong>City:</strong> ${data.city}</p>
//       <p><strong>Program:</strong> ${data.program}</p>
//       <p><strong>Message:</strong> ${data.message}</p>
//     `,
//   });
// }

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const data = await req.json();

    const { name, phone, email, city, program } = data;
    if (!name || !phone || !email || !city || !program) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [mongoResult, sheetResult] = await Promise.allSettled([
      saveToMongo(data),
      appendToSheet(data),
    ]);

    // Log failures without blocking response
    if (mongoResult.status === 'rejected')
      console.error('[Enquiry] MongoDB failed:', mongoResult.reason);
    if (sheetResult.status === 'rejected')
      console.error('[Enquiry] Google Sheets failed:', sheetResult.reason);
    // if (emailResult.status === 'rejected')
    //   console.error('[Enquiry] Email failed:', emailResult.reason);

    // Only hard-fail if MongoDB failed (primary store)
    if (mongoResult.status === 'rejected') {
      return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[Enquiry] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}