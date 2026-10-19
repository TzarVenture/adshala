import nodemailer from 'nodemailer';

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
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8f7; margin: 0; padding: 20px; color: #222; }
        .card { max-width: 500px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ebe6; border-radius: 12px; overflow: hidden; }
        .header { background: #1a3f32; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
        .content { padding: 30px 24px; }
        .otp-box { text-align: center; margin: 24px 0; padding: 18px; background: #f0f7f3; border: 1px dashed #1a3f32; border-radius: 8px; }
        .otp-code { font-family: 'Courier New', monospace; font-size: 32px; font-weight: 700; color: #1a3f32; letter-spacing: 6px; }
        .footer { background: #fdfdfd; padding: 16px 24px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #777; text-align: center; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Adshalaa EduTech</h1>
        </div>
        <div class="content">
          <h2 style="font-size: 18px; color: #161439; margin-top: 0;">Email Verification Code</h2>
          <p style="font-size: 14px; color: #555; line-height: 1.5;">
            Thank you for starting your registration with Adshalaa EduTech. Please use the verification code below to verify your email address:
          </p>
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.4;">
            This verification code is valid for <strong>10 minutes</strong>. If you did not request this verification, please disregard this email.
          </p>
        </div>
        <div class="footer">
          Adshalaa EduTech • Admissions Support<br />
          Helpline: +91 8652199991 / +91 7760775875 | corporate@tzar.co
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

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Receipt - Adshalaa EduTech</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8f7; margin: 0; padding: 20px; color: #222; }
        .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ebe6; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .header { background: #1a3f32; color: #ffffff; padding: 26px 24px; text-align: center; }
        .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px; }
        .header p { margin: 0; font-size: 13px; color: #c4d8ce; }
        .content { padding: 28px 24px; }
        .receipt-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13.5px; }
        .receipt-table td { padding: 10px 12px; border-bottom: 1px solid #e9f0ec; }
        .receipt-table td.label { color: #666; width: 40%; }
        .receipt-table td.val { color: #161439; font-weight: 600; text-align: right; }
        .total-row td { border-top: 2px solid #1a3f32; border-bottom: 2px solid #1a3f32; font-size: 15px; color: #1a3f32; }
        .btn-wrap { text-align: center; margin: 26px 0 16px; }
        .btn-receipt { display: inline-block; background: #1a3f32; color: #ffffff !important; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; }
        .support-box { background: #f8faf9; border: 1px solid #e0ebe6; border-radius: 8px; padding: 14px 18px; margin-top: 20px; font-size: 12.5px; color: #444; line-height: 1.5; }
        .footer { background: #fdfdfd; padding: 16px 24px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #777; text-align: center; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Adshalaa EduTech</h1>
          <p>Registration Confirmation & Payment Receipt</p>
        </div>
        <div class="content">
          <p style="font-size: 15px; color: #161439; margin-top: 0;">
            Dear <strong>${data.studentName}</strong>,
          </p>
          <p style="font-size: 14px; color: #555; line-height: 1.5; margin-bottom: 18px;">
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
              <td class="label" style="font-weight: 700; color: #1a3f32;">Amount Paid</td>
              <td class="val" style="font-weight: 700; color: #1a3f32;">₹${formattedAmount}</td>
            </tr>
          </table>

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
          Adshalaa EduTech • Admissions Helpdesk<br />
          Call: +91 8652199991 / +91 7760775875 | Email: corporate@tzar.co<br />
          Mumbai Campus, Maharashtra
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
