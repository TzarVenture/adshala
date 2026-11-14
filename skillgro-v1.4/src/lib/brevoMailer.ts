import nodemailer from 'nodemailer';
import adshalaaFooterLogo from '@/assets/img/brand/Adshalaa_footer_logo.png';
import { INSTITUTE } from '@/config/institute';

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

// ─────────────────────────────────────────────────────────────────────────────
// Shared email design – every email uses the same layout, logo and brand colours
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = {
  green: '#1a3f32',
  gold: '#ffc224',
  navy: '#161439',
  page: '#f1f5f3',
  border: '#dce8e2',
  muted: '#667085',
  text: '#344054',
};

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Escape user-supplied values before putting them in HTML. */
const esc = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const inr = (value: unknown): string => `₹${Number(value || 0).toLocaleString('en-IN')}`;

type DetailRow = {
  label: string;
  /** Already-escaped HTML */
  value: string;
  strong?: boolean;
  mono?: boolean;
};

/** Two-column label / value table used inside the email body. */
const detailTable = (rows: DetailRow[]): string => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-size:14px;">
    ${rows
      .map(
        (row, i) => `
    <tr>
      <td style="padding:11px 0; ${i > 0 ? `border-top:1px solid #eaf0ec;` : ''} color:${BRAND.muted}; width:38%; vertical-align:top;">${row.label}</td>
      <td style="padding:11px 0; ${i > 0 ? `border-top:1px solid #eaf0ec;` : ''} color:${BRAND.navy}; text-align:right; vertical-align:top; font-weight:${row.strong ? 700 : 600}; ${row.mono ? `font-family:'Courier New',monospace; font-size:13px;` : ''}">${row.value}</td>
    </tr>`,
      )
      .join('')}
  </table>`;

const sectionTitle = (title: string): string => `
  <div style="margin:26px 0 4px; font-size:11.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${BRAND.green}; border-bottom:2px solid ${BRAND.gold}; padding-bottom:6px;">${title}</div>`;

const ctaButton = (url: string, label: string): string => `
  <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:26px auto 6px;">
    <tr>
      <td style="background:${BRAND.green}; border-radius:8px;">
        <a href="${url}" target="_blank" style="display:inline-block; padding:13px 30px; color:#ffffff; font-size:14.5px; font-weight:700; text-decoration:none; font-family:${FONT};">${label}</a>
      </td>
    </tr>
  </table>`;

const noteBox = (html: string, tone: 'info' | 'success' | 'warn' = 'info'): string => {
  const tones = {
    info: { bg: '#f4f8f6', border: '#cfe0d7', color: BRAND.text },
    success: { bg: '#ecf8ee', border: '#a9d9b0', color: '#1b5e20' },
    warn: { bg: '#fff8e1', border: '#ffe082', color: '#7a4b00' },
  }[tone];
  return `
  <div style="margin:20px 0 0; padding:14px 16px; background:${tones.bg}; border:1px solid ${tones.border}; border-radius:10px; font-size:13px; line-height:1.55; color:${tones.color};">${html}</div>`;
};

type FooterKind = 'admissions' | 'accounts' | 'admin';

const emailFooter = (kind: FooterKind): string => {
  if (kind === 'admin') {
    return `
      <strong style="color:${BRAND.green};">Adshalaa EduTech • Admin Notification</strong><br />
      Automated alert sent to ${esc(ADMIN_EMAIL)} · ${esc(INSTITUTE.website)}`;
  }
  const desk = kind === 'accounts' ? 'Accounts Desk' : 'Admissions Desk';
  return `
      <strong style="color:${BRAND.green};">Adshalaa EduTech • ${desk}</strong><br />
      Helpline: ${esc(INSTITUTE.phones.join(' / '))}<br />
      <a href="mailto:${INSTITUTE.email}" style="color:${BRAND.green}; text-decoration:none;">${esc(INSTITUTE.email)}</a> · <a href="https://${INSTITUTE.website}" style="color:${BRAND.green}; text-decoration:none;">${esc(INSTITUTE.website)}</a><br />
      <span style="color:#8a94a0;">${esc(INSTITUTE.address)}</span><br />
      <a href="${INSTITUTE.mapUrl}" style="color:${BRAND.green}; font-weight:600; text-decoration:none;">View on Google Maps</a>`;
};

/** Page shell shared by every email: logo, brand bar, hero heading, body, footer. */
function emailLayout(opts: {
  title: string;
  preheader: string;
  heading: string;
  subheading?: string;
  bodyHtml: string;
  footer: FooterKind;
  maxWidth?: number;
}): string {
  const width = opts.maxWidth || 580;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(opts.title)}</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.page}; font-family:${FONT}; color:${BRAND.text};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; font-size:1px; line-height:1px; color:${BRAND.page};">${esc(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.page};">
    <tr>
      <td align="center" style="padding:26px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:${width}px; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:14px; overflow:hidden;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:24px 24px 18px; background:#ffffff;">
              <img src="${LOGO_URL}" alt="Adshalaa EduTech" height="54" style="height:54px; max-width:240px; width:auto; display:block; border:0;" />
            </td>
          </tr>
          <tr><td style="height:4px; line-height:4px; font-size:0; background:${BRAND.gold};">&nbsp;</td></tr>
          <!-- Hero -->
          <tr>
            <td align="center" style="background:${BRAND.green}; padding:22px 24px;">
              <div style="font-size:21px; font-weight:700; color:#ffffff; line-height:1.3;">${opts.heading}</div>
              ${opts.subheading ? `<div style="margin-top:5px; font-size:13px; color:#c9dcd2;">${opts.subheading}</div>` : ''}
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 26px 26px; font-size:14.5px; line-height:1.6;">
              ${opts.bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f8faf9; border-top:1px solid #e6eeea; padding:18px 24px; font-size:12px; line-height:1.7; color:${BRAND.muted};">
              ${emailFooter(opts.footer)}
            </td>
          </tr>
        </table>
        <div style="max-width:${width}px; margin:12px auto 0; font-size:11px; color:#98a2b3; text-align:center;">© Adshalaa EduTech. All rights reserved.</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Sends a 6-digit verification OTP email to verify the student's email on Step 1.
 */
export async function sendOtpEmail(toEmail: string, otp: string) {
  const bodyHtml = `
    <p style="margin:0 0 6px; font-size:16px; font-weight:600; color:${BRAND.navy};">Hello,</p>
    <p style="margin:0 0 20px;">
      Thank you for starting your registration with <strong>Adshalaa EduTech</strong>.
      Enter the code below on the registration page to verify your email address.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="background:#f4f8f6; border:2px dashed ${BRAND.green}; border-radius:12px; padding:24px 12px;">
          <div style="font-size:11.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${BRAND.muted}; margin-bottom:8px;">Your verification code</div>
          <div style="font-family:'Courier New',monospace; font-size:38px; font-weight:800; letter-spacing:10px; color:${BRAND.green}; padding-left:10px; user-select:all; -webkit-user-select:all;">${esc(otp)}</div>
        </td>
      </tr>
    </table>

    ${noteBox(
      `⏱ This code is valid for <strong>10 minutes</strong>.<br />🔒 For your security, never share this code with anyone. Adshalaa will never ask for it by phone or chat.`,
      'warn',
    )}

    <p style="margin:20px 0 0; font-size:12.5px; color:${BRAND.muted};">
      Didn't request this? You can safely ignore this email – no registration will be created without this code.
    </p>`;

  return sendEmail({
    toEmail,
    subject: `Your Verification Code: ${otp} - Adshalaa EduTech`,
    text: `Your Adshalaa EduTech verification code is: ${otp}. It is valid for 10 minutes. Do not share this code with anyone.`,
    html: emailLayout({
      title: 'Email Verification - Adshalaa EduTech',
      preheader: `Your Adshalaa verification code is ${otp}. Valid for 10 minutes.`,
      heading: 'Verify Your Email',
      subheading: 'One quick step to continue your registration',
      bodyHtml,
      footer: 'admissions',
      maxWidth: 520,
    }),
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

  const rows: DetailRow[] = [
    { label: 'Course', value: esc(data.course) },
    ...(data.batch ? [{ label: 'Batch & Mode', value: esc(data.batch) }] : []),
    { label: 'Payment ID', value: esc(data.paymentId), mono: true },
    { label: 'Date', value: esc(formattedDate) },
  ];

  const feeStatus =
    remainingNum > 0
      ? noteBox(
          `<strong style="color:${BRAND.green}; font-size:14px;">Remaining balance &amp; EMI schedule</strong><br />
           Remaining balance: <strong>${inr(remainingNum)}</strong>, payable in <strong>${emiCountNum} installments</strong> of about <strong>${inr(emiAmountNum)}/month</strong>.<br />
           • Installments fall due every 30 days during your course.<br />
           • We will email you a payment link before each due date.`,
          'info',
        )
      : noteBox(`✓ <strong>Full course fee paid</strong> – no remaining balance or EMI installments.`, 'success');

  const bodyHtml = `
    <p style="margin:0 0 6px; font-size:16px; font-weight:600; color:${BRAND.navy};">Dear ${esc(data.studentName)},</p>
    <p style="margin:0 0 4px;">
      Thank you for enrolling with <strong>Adshalaa EduTech</strong>. We have received your payment and your seat is reserved.
    </p>

    ${sectionTitle('Registration &amp; payment details')}
    ${detailTable(rows)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px; background:#f4f8f6; border:1px solid #cfe0d7; border-radius:10px;">
      <tr>
        <td style="padding:14px 16px; font-size:14px; font-weight:700; color:${BRAND.green};">Amount paid today</td>
        <td align="right" style="padding:14px 16px; font-size:20px; font-weight:800; color:${BRAND.green};">₹${formattedAmount}</td>
      </tr>
    </table>

    ${feeStatus}

    ${ctaButton(receiptUrl, 'View &amp; Print Official Receipt →')}

    ${noteBox(
      `<strong style="color:${BRAND.navy};">What happens next?</strong><br />
       Our academic coordinator will contact you with your batch schedule, learning materials and orientation details. For any questions, reply to this email or call our admissions desk.`,
      'info',
    )}`;

  return sendEmail({
    toEmail: data.email,
    toName: data.studentName,
    subject: `Admission Confirmed & Payment Receipt - Adshalaa EduTech`,
    text: `Dear ${data.studentName}, your registration for ${data.course} has been confirmed. Amount Paid: ₹${formattedAmount}. Payment ID: ${data.paymentId}. View receipt: ${receiptUrl}`,
    html: emailLayout({
      title: 'Payment Receipt - Adshalaa EduTech',
      preheader: `Your registration for ${data.course} is confirmed. Amount paid: ₹${formattedAmount}.`,
      heading: 'Registration Confirmed ✓',
      subheading: 'Admission confirmation &amp; payment receipt',
      bodyHtml,
      footer: 'admissions',
      maxWidth: 600,
    }),
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
  const when = `${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  const studentRows: DetailRow[] = [
    { label: 'Name', value: esc(data.studentName), strong: true },
    { label: 'Email', value: `<a href="mailto:${esc(data.email)}" style="color:${BRAND.green}; text-decoration:none;">${esc(data.email)}</a>` },
    { label: 'Phone', value: `<a href="tel:${esc(data.phone)}" style="color:${BRAND.green}; text-decoration:none;">${esc(data.phone)}</a>` },
    ...(data.city ? [{ label: 'City', value: esc(data.city) }] : []),
  ];

  const programRows: DetailRow[] = [
    { label: 'Course', value: esc(data.course), strong: true },
    ...(data.batch ? [{ label: 'Batch &amp; Mode', value: esc(data.batch) }] : []),
  ];

  const paymentRows: DetailRow[] = [
    { label: 'Amount paid today', value: inr(data.paymentAmount), strong: true },
    { label: 'Remaining balance', value: `${inr(remainingNum)}${data.emiPlanType ? ` (${esc(data.emiPlanType)})` : ''}` },
    ...(data.emiAmount ? [{ label: 'EMI installment', value: `${inr(data.emiAmount)} / month` }] : []),
    { label: 'Razorpay payment ID', value: esc(data.paymentId), mono: true },
    ...(data.orderId ? [{ label: 'Razorpay order ID', value: esc(data.orderId), mono: true }] : []),
  ];

  const otherRows: DetailRow[] = [
    ...(data.source ? [{ label: 'Discovery source', value: esc(data.source) }] : []),
    ...(data.goals ? [{ label: 'Career goals', value: `<span style="font-weight:400;">${esc(data.goals)}</span>` }] : []),
  ];

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#ecf8ee; border:1px solid #a9d9b0; border-radius:10px; padding:14px 16px;">
          <div style="font-size:12px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; color:#1b5e20;">Payment confirmed ✓</div>
          <div style="font-size:24px; font-weight:800; color:${BRAND.green}; margin-top:2px;">₹${formattedAmount}</div>
          <div style="font-size:12.5px; color:${BRAND.muted}; margin-top:2px;">${esc(when)}</div>
        </td>
      </tr>
    </table>

    ${sectionTitle('Student')}
    ${detailTable(studentRows)}

    ${sectionTitle('Program')}
    ${detailTable(programRows)}

    ${sectionTitle('Payment')}
    ${detailTable(paymentRows)}

    ${otherRows.length ? `${sectionTitle('Additional info')}${detailTable(otherRows)}` : ''}

    <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:26px auto 0;">
      <tr>
        <td style="background:${BRAND.green}; border-radius:8px;">
          <a href="tel:${esc(data.phone)}" style="display:inline-block; padding:11px 22px; color:#ffffff; font-size:13.5px; font-weight:700; text-decoration:none;">📞 Call student</a>
        </td>
        <td style="width:10px;">&nbsp;</td>
        <td style="background:#ffffff; border:1.5px solid ${BRAND.green}; border-radius:8px;">
          <a href="mailto:${esc(data.email)}" style="display:inline-block; padding:10px 22px; color:${BRAND.green}; font-size:13.5px; font-weight:700; text-decoration:none;">✉ Email student</a>
        </td>
      </tr>
    </table>`;

  return sendEmail({
    toEmail: ADMIN_EMAIL,
    toName: 'Adshalaa Admin',
    subject: `🔔 New Admission: ${data.studentName} enrolled in ${data.course} (₹${formattedAmount})`,
    text: `New student registration: ${data.studentName} has enrolled in ${data.course}. Amount Paid: ₹${formattedAmount}. Payment ID: ${data.paymentId}. Phone: ${data.phone}, Email: ${data.email}.`,
    html: emailLayout({
      title: 'New Registration Alert - Adshalaa EduTech',
      preheader: `${data.studentName} enrolled in ${data.course} – ₹${formattedAmount} received.`,
      heading: 'New Student Enrollment',
      subheading: 'Admission &amp; payment notification',
      bodyHtml,
      footer: 'admin',
      maxWidth: 620,
    }),
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

  const bodyHtml = `
    <p style="margin:0 0 6px; font-size:16px; font-weight:600; color:${BRAND.navy};">Dear ${esc(data.studentName)},</p>
    <p style="margin:0 0 4px;">
      This is a friendly reminder about your upcoming course fee installment for <strong>${esc(data.course)}</strong>.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
      <tr>
        <td align="center" style="background:#fff8e1; border:1.5px solid #ffe082; border-radius:12px; padding:20px 12px;">
          <div style="font-size:11.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#b26a00;">Installment ${data.installmentNumber} of ${data.totalInstallments}</div>
          <div style="font-size:32px; font-weight:800; color:${BRAND.green}; margin:6px 0 4px;">${inr(data.emiAmount)}</div>
          <div style="font-size:13.5px; color:${BRAND.text};">Due date: <strong>${esc(data.dueDate)}</strong></div>
        </td>
      </tr>
    </table>

    ${ctaButton(payUrl, 'Pay Installment Online →')}

    <p style="margin:18px 0 0; font-size:12.5px; color:${BRAND.muted}; text-align:center;">
      Already paid this installment? Please ignore this reminder.
    </p>`;

  return sendEmail({
    toEmail: data.studentEmail,
    toName: data.studentName,
    subject: `EMI Payment Reminder (Installment ${data.installmentNumber}) - Adshalaa EduTech`,
    text: `Dear ${data.studentName}, your EMI installment of ₹${data.emiAmount.toLocaleString('en-IN')} for ${data.course} is due on ${data.dueDate}. Pay online: ${payUrl}`,
    html: emailLayout({
      title: 'EMI Payment Reminder - Adshalaa EduTech',
      preheader: `Installment ${data.installmentNumber} of ${data.totalInstallments} (${inr(data.emiAmount)}) is due on ${data.dueDate}.`,
      heading: 'EMI Payment Reminder',
      subheading: 'Course fee installment due',
      bodyHtml,
      footer: 'accounts',
      maxWidth: 540,
    }),
  });
}
