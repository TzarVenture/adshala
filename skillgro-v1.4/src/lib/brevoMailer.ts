import nodemailer from 'nodemailer';
import adshalaaFooterLogo from '@/assets/img/brand/Adshalaa_footer_logo.png';

const BASE_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'https://www.adshalaa.com';
const LOGO_URL = adshalaaFooterLogo?.src?.startsWith('http')
  ? adshalaaFooterLogo.src
  : `${BASE_DOMAIN}${adshalaaFooterLogo?.src || '/_next/static/media/Adshalaa_footer_logo.png'}`;

const getTransporter = () => {
  const host = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
  const port = Number(process.env.BREVO_SMTP_PORT) || 587;
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;

  if (!user || !pass) {
    throw new Error('Brevo SMTP credentials are not configured in environment variables.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false, // Port 587 uses STARTTLS
    auth: {
      user,
      pass,
    },
  });
};

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'info@adshalaa.com';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Adshalaa EduTech';
const ADMIN_EMAIL = 'corporate@tzar.co';

/**
 * Sends email either via Brevo REST API (preferred, no IP restrictions)
 * or via Brevo SMTP relay (nodemailer fallback).
 */
async function sendEmail({
  toEmail,
  toName,
  subject,
  html,
  text,
}: {
  toEmail: string;
  toName?: string;
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (apiKey) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: SENDER_NAME,
          email: SENDER_EMAIL,
        },
        to: [
          {
            email: toEmail,
            name: toName || toEmail,
          },
        ],
        subject,
        htmlContent: html,
        textContent: text,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`Brevo API Error (${res.status}): ${errData.message || res.statusText}`);
    }

    return await res.json();
  }

  // Fallback to Brevo SMTP via nodemailer
  const transporter = getTransporter();
  return transporter.sendMail({
    from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    to: toEmail,
    subject,
    text,
    html,
  });
}

/**
 * Sends a 6-digit verification OTP email to verify the student's email on Step 1.
 */
export async function sendOtpEmail(toEmail: string, otp: string) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Email Verification - Adshalaa EduTech</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f3; margin: 0; padding: 24px 12px; color: #222; }
        .card { max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #dce8e2; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
        .header { background: #1a3f32; color: #ffffff; padding: 28px 24px 22px; text-align: center; }
        .header img { height: 46px; max-width: 100%; object-fit: contain; margin-bottom: 6px; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .content { padding: 32px 26px; }
        .otp-box { text-align: center; margin: 26px 0; padding: 22px 18px; background: #f0f7f3; border: 1.5px dashed #1a3f32; border-radius: 10px; }
        .otp-code { font-family: 'Courier New', monospace; font-size: 34px; font-weight: 800; color: #1a3f32; letter-spacing: 8px; user-select: all; -webkit-user-select: all; }
        .copy-pill { display: inline-block; margin-top: 10px; background: #1a3f32; color: #ffffff !important; padding: 7px 16px; border-radius: 6px; font-size: 12.5px; font-weight: 600; text-decoration: none; }
        .footer { background: #fafcfb; padding: 18px 24px; border-top: 1px solid #eef2f0; font-size: 12px; color: #666; text-align: center; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <img src="${LOGO_URL}" alt="Adshalaa EduTech" style="height: 48px; max-width: 220px; object-fit: contain; margin-bottom: 8px;" />
          <h1>Adshalaa EduTech</h1>
        </div>
        <div class="content">
          <h2 style="font-size: 19px; color: #161439; margin-top: 0; margin-bottom: 12px;">Email Verification Code</h2>
          <p style="font-size: 14.5px; color: #444; line-height: 1.55; margin: 0 0 16px;">
            Thank you for starting your registration with <strong>Adshalaa EduTech</strong>. Please use the verification code below to verify your email address:
          </p>
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <div>
              <span class="copy-pill">Copy Code: ${otp}</span>
            </div>
            <div style="font-size: 11px; color: #666; margin-top: 8px;">(Tap code or hold to copy)</div>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">
            This verification code is valid for <strong>10 minutes</strong>. If you did not request this verification, please disregard this email.
          </p>
        </div>
        <div class="footer">
          <strong>Adshalaa EduTech • Admissions Support</strong><br />
          Helpline: +91 8652199991 / +91 7760775875 | Email: info@adshalaa.com<br />
          Website: www.adshalaa.com
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    toEmail,
    subject: `Your Verification Code: ${otp} - Adshalaa EduTech`,
    text: `Your Adshalaa EduTech verification code is: ${otp}. It is valid for 10 minutes.`,
    html: htmlContent,
  });
}

export interface ReceiptEmailData {
  studentName: string;
  email: string;
  phone: string;
  course: string;
  batch?: string;
  paymentAmount: string | number;
  paymentId: string;
  orderId?: string;
  date?: string;
  remainingBalance?: string | number;
  emiPlanType?: string;
  emiAmount?: string | number;
  emiCount?: string | number;
}

/**
 * Sends a transactional course registration & payment receipt email upon successful payment.
 */
export async function sendPaymentReceiptEmail(data: ReceiptEmailData) {
  const receiptUrl = `https://www.adshalaa.com/student-registration/success?paymentId=${encodeURIComponent(data.paymentId)}`;
  const formattedDate = data.date || new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedAmount = Number(data.paymentAmount || 2000).toLocaleString('en-IN');
  const remainingNum = Number(data.remainingBalance || 0);
  const emiCountNum = Number(data.emiCount || 0);
  const emiAmountNum = Number(data.emiAmount || 0);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Receipt - Adshalaa EduTech</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f3; margin: 0; padding: 24px 12px; color: #222; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #dce8e2; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
        .header { background: #1a3f32; color: #ffffff; padding: 28px 24px 22px; text-align: center; }
        .header img { height: 46px; max-width: 100%; object-fit: contain; margin-bottom: 6px; }
        .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
        .header p { margin: 0; font-size: 13px; color: #c4d8ce; }
        .content { padding: 30px 24px; }
        .receipt-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13.5px; }
        .receipt-table td { padding: 10px 12px; border-bottom: 1px solid #e9f0ec; }
        .receipt-table td.label { color: #666; width: 40%; }
        .receipt-table td.val { color: #161439; font-weight: 600; text-align: right; }
        .total-row td { border-top: 2px solid #1a3f32; border-bottom: 2px solid #1a3f32; font-size: 15px; color: #1a3f32; }
        .emi-box { background: #f8faf9; border: 1.5px solid #1a3f32; border-radius: 10px; padding: 16px; margin: 22px 0 16px; }
        .btn-wrap { text-align: center; margin: 26px 0 16px; }
        .btn-receipt { display: inline-block; background: #1a3f32; color: #ffffff !important; padding: 12px 26px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; }
        .support-box { background: #fdfdfd; border: 1px solid #e0ebe6; border-radius: 8px; padding: 14px 18px; margin-top: 20px; font-size: 12.5px; color: #444; line-height: 1.5; }
        .footer { background: #fafcfb; padding: 18px 24px; border-top: 1px solid #eef2f0; font-size: 12px; color: #666; text-align: center; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <img src="${LOGO_URL}" alt="Adshalaa EduTech" style="height: 48px; max-width: 220px; object-fit: contain; margin-bottom: 8px;" />
          <h1>Adshalaa EduTech</h1>
          <p>Registration Confirmation & Payment Receipt</p>
        </div>
        <div class="content">
          <p style="font-size: 15.5px; color: #161439; margin-top: 0;">
            Dear <strong>${data.studentName}</strong>,
          </p>
          <p style="font-size: 14px; color: #555; line-height: 1.55; margin-bottom: 18px;">
            Thank you for enrolling with <strong>Adshalaa EduTech</strong>. Your payment has been received and your course seat is successfully reserved.
          </p>

          <table class="receipt-table">
            <tr>
              <td class="label">Course Name</td>
              <td class="val">${data.course}</td>
            </tr>
            ${data.batch ? `
            <tr>
              <td class="label">Batch & Schedule</td>
              <td class="val">${data.batch}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="label">Payment ID</td>
              <td class="val" style="font-family: monospace; font-size: 12.5px;">${data.paymentId}</td>
            </tr>
            <tr>
              <td class="label">Date</td>
              <td class="val">${formattedDate}</td>
            </tr>
            <tr class="total-row">
              <td class="label" style="font-weight: 700; color: #1a3f32;">Amount Paid Today</td>
              <td class="val" style="font-weight: 700; color: #1a3f32;">₹${formattedAmount}</td>
            </tr>
          </table>

          ${remainingNum > 0 ? `
          <div class="emi-box">
            <strong style="color: #1a3f32; font-size: 14px; display: block; margin-bottom: 6px;">
              Remaining Balance & EMI Installment Schedule
            </strong>
            <p style="font-size: 12.5px; color: #555; margin: 0 0 10px;">
              Remaining Balance: <strong>₹${remainingNum.toLocaleString('en-IN')}</strong> payable in <strong>${emiCountNum} installments</strong> of approximately <strong>₹${emiAmountNum.toLocaleString('en-IN')}/month</strong>.
            </p>
            <div style="font-size: 12px; color: #666; line-height: 1.5;">
              • Installments are due every 30 days during your course duration.<br />
              • Automated reminder emails with direct payment links will be sent before each due date.
            </div>
          </div>
          ` : `
          <div style="background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: 8px; padding: 10px 14px; margin: 16px 0; color: #1b5e20; font-size: 12.5px;">
            ✓ <strong>Full Course Fee Paid Upfront</strong> — No remaining balance or EMI installments required.
          </div>
          `}

          <div class="btn-wrap">
            <a href="${receiptUrl}" class="btn-receipt" target="_blank">
              View & Print Official Receipt →
            </a>
          </div>

          <div class="support-box">
            <strong>What's Next?</strong><br />
            Our academic coordinator will reach out to you with your batch schedule, learning materials, and orientation details. If you have any questions, feel free to contact our admissions desk.
          </div>
        </div>
        <div class="footer">
          <strong>Adshalaa EduTech • Admissions Desk</strong><br />
          Helpline: +91 8652199991 / +91 7760775875 | Email: info@adshalaa.com<br />
          Mumbai Campus, Maharashtra, India · www.adshalaa.com
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    toEmail: data.email,
    toName: data.studentName,
    subject: `Admission Confirmed & Payment Receipt - Adshalaa EduTech`,
    text: `Dear ${data.studentName}, your registration for ${data.course} has been confirmed. Amount Paid: ₹${formattedAmount}. Payment ID: ${data.paymentId}. View receipt: ${receiptUrl}`,
    html: htmlContent,
  });
}

/**
 * Sends an instant administrative alert email to corporate@tzar.co whenever a student registers.
 */
export async function sendAdminRegistrationNotification(data: {
  studentName: string;
  email: string;
  phone: string;
  city?: string;
  course: string;
  batch?: string;
  paymentAmount: string | number;
  paymentId: string;
  orderId?: string;
  remainingBalance?: string | number;
  emiPlanType?: string;
  emiAmount?: string | number;
  source?: string;
  goals?: string;
}) {
  const formattedAmount = Number(data.paymentAmount || 0).toLocaleString('en-IN');
  const remainingNum = Number(data.remainingBalance || 0);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Registration Alert - Adshalaa EduTech</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px 12px; color: #222; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #dcdfe4; border-radius: 12px; overflow: hidden; }
        .header { background: #161439; color: #ffffff; padding: 22px 24px; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
        .header p { margin: 4px 0 0 0; font-size: 13px; color: #bcc1cd; }
        .content { padding: 24px; }
        .table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13.5px; }
        .table td { padding: 9px 12px; border-bottom: 1px solid #edf0f2; }
        .table td.lbl { color: #666; width: 35%; font-weight: 500; }
        .table td.val { color: #111; font-weight: 600; }
        .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 700; }
        .footer { background: #fafbfc; padding: 14px 24px; border-top: 1px solid #eaeef2; font-size: 12px; color: #888; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🔔 New Student Enrollment</h1>
          <p>Adshalaa EduTech • Admission & Payment Notification</p>
        </div>
        <div class="content">
          <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
            <span class="badge">Payment Confirmed ✓</span>
            <span style="font-size: 13px; color: #555;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
          </div>

          <table class="table">
            <tr>
              <td class="lbl">Student Name</td>
              <td class="val">${data.studentName}</td>
            </tr>
            <tr>
              <td class="lbl">Email Address</td>
              <td class="val"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td class="lbl">Phone Number</td>
              <td class="val"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            ${data.city ? `
            <tr>
              <td class="lbl">City</td>
              <td class="val">${data.city}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="lbl">Course Enrolled</td>
              <td class="val" style="color: #1a3f32;">${data.course}</td>
            </tr>
            ${data.batch ? `
            <tr>
              <td class="lbl">Batch & Mode</td>
              <td class="val">${data.batch}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="lbl">Amount Paid Today</td>
              <td class="val" style="color: #2e7d32; font-size: 15px;">₹${formattedAmount}</td>
            </tr>
            <tr>
              <td class="lbl">Remaining Balance</td>
              <td class="val">₹${remainingNum.toLocaleString('en-IN')} ${data.emiPlanType ? `(${data.emiPlanType})` : ''}</td>
            </tr>
            ${data.emiAmount ? `
            <tr>
              <td class="lbl">EMI Installment</td>
              <td class="val">₹${Number(data.emiAmount).toLocaleString('en-IN')} / month</td>
            </tr>
            ` : ''}
            <tr>
              <td class="lbl">Razorpay Payment ID</td>
              <td class="val" style="font-family: monospace;">${data.paymentId}</td>
            </tr>
            ${data.orderId ? `
            <tr>
              <td class="lbl">Razorpay Order ID</td>
              <td class="val" style="font-family: monospace;">${data.orderId}</td>
            </tr>
            ` : ''}
            ${data.source ? `
            <tr>
              <td class="lbl">Discovery Source</td>
              <td class="val">${data.source}</td>
            </tr>
            ` : ''}
            ${data.goals ? `
            <tr>
              <td class="lbl">Career Goals</td>
              <td class="val" style="font-weight: 400; font-size: 13px;">${data.goals}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        <div class="footer">
          Adshalaa EduTech Admin Alert • Sent to ${ADMIN_EMAIL}
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    toEmail: ADMIN_EMAIL,
    toName: 'Adshalaa Admin',
    subject: `🔔 New Admission: ${data.studentName} enrolled in ${data.course} (₹${formattedAmount})`,
    text: `New student registration: ${data.studentName} has enrolled in ${data.course}. Amount Paid: ₹${formattedAmount}. Payment ID: ${data.paymentId}. Phone: ${data.phone}, Email: ${data.email}.`,
    html: htmlContent,
  });
}

/**
 * Sends an EMI installment reminder email to the student with payment details.
 */
export async function sendEmiReminderEmail(data: {
  studentName: string;
  studentEmail: string;
  course: string;
  installmentNumber: number;
  totalInstallments: number;
  emiAmount: number;
  dueDate: string;
  paymentLink?: string;
}) {
  const payUrl = data.paymentLink || 'https://www.adshalaa.com/student-registration';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>EMI Payment Reminder - Adshalaa EduTech</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f3; margin: 0; padding: 24px 12px; color: #222; }
        .card { max-width: 540px; margin: 0 auto; background: #ffffff; border: 1px solid #dce8e2; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
        .header { background: #1a3f32; color: #ffffff; padding: 26px 24px; text-align: center; }
        .header img { height: 44px; margin-bottom: 6px; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
        .content { padding: 28px 24px; }
        .due-card { background: #fff8e1; border: 1.5px solid #ffe082; border-radius: 10px; padding: 16px; margin: 20px 0; text-align: center; }
        .due-amount { font-size: 26px; font-weight: 800; color: #e65100; margin: 4px 0; }
        .btn-pay { display: inline-block; background: #1a3f32; color: #ffffff !important; padding: 13px 28px; border-radius: 6px; font-size: 15px; font-weight: 700; text-decoration: none; }
        .footer { background: #fafcfb; padding: 16px 24px; border-top: 1px solid #eef2f0; font-size: 12px; color: #666; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <img src="${LOGO_URL}" alt="Adshalaa EduTech" style="height: 48px; max-width: 220px; object-fit: contain; margin-bottom: 8px;" />
          <h1>Adshalaa EduTech</h1>
        </div>
        <div class="content">
          <h2 style="font-size: 18px; color: #161439; margin-top: 0;">EMI Payment Reminder</h2>
          <p style="font-size: 14px; color: #555; line-height: 1.5;">
            Dear <strong>${data.studentName}</strong>,<br /><br />
            This is a friendly reminder regarding your upcoming course fee installment for <strong>${data.course}</strong>.
          </p>

          <div class="due-card">
            <div style="font-size: 12px; color: #b26a00; font-weight: 600; text-transform: uppercase;">
              Installment ${data.installmentNumber} of ${data.totalInstallments}
            </div>
            <div class="due-amount">₹${data.emiAmount.toLocaleString('en-IN')}</div>
            <div style="font-size: 13px; color: #444;">Due Date: <strong>${data.dueDate}</strong></div>
          </div>

          <div style="text-align: center; margin: 24px 0 16px;">
            <a href="${payUrl}" class="btn-pay" target="_blank">Pay Installment Online →</a>
          </div>

          <p style="font-size: 12.5px; color: #777; line-height: 1.4; text-align: center; margin: 0;">
            If you have already paid this installment, please ignore this notice.
          </p>
        </div>
        <div class="footer">
          <strong>Adshalaa EduTech • Accounts Desk</strong><br />
          Helpline: +91 8652199991 / +91 7760775875 | Email: info@adshalaa.com<br />
          www.adshalaa.com
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    toEmail: data.studentEmail,
    toName: data.studentName,
    subject: `EMI Payment Reminder (Installment ${data.installmentNumber}) - Adshalaa EduTech`,
    text: `Dear ${data.studentName}, your EMI installment of ₹${data.emiAmount.toLocaleString('en-IN')} for ${data.course} is due on ${data.dueDate}. Pay online: ${payUrl}`,
    html: htmlContent,
  });
}
