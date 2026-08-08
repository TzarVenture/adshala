import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { google } from 'googleapis';

// ─── Webinar Config ────────────────────────────────────────────────────────────
const WEBINAR_INFO = {
  title: 'The Shifting Role of Digital Marketing in the AI Era – 2026',
  date: '16 Aug 2026',
  time: '12 PM – 1 PM',
  venue: 'Sakivihar, Andheri East, Mumbai',
  meetLink: process.env.WEBINAR_MEET_LINK || 'https://meet.google.com/placeholder-link',
};

// ─── Google Sheets ─────────────────────────────────────────────────────────────
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
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    data.name,
    data.phone,
    data.email,
    data.city,
    WEBINAR_INFO.meetLink,
    'WhatsApp Sent',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Webinar!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ─── MongoDB ───────────────────────────────────────────────────────────────────
import mongoose from 'mongoose';

async function saveToMongo(data) {
  await clientPromise();

  await mongoose.connection.collection('webinarRegistrations').insertOne({
    ...data,
    webinar: WEBINAR_INFO.title,
    createdAt: new Date(),
  });
}

// ─── WhatsApp via Meta Cloud API ───────────────────────────────────────────────
// Requires: WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN env vars
// Template: must be pre-approved on Meta Business Manager
// Template name: "webinar_registration_confirmation" (create this in Meta)
async function sendWhatsApp(data) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || 'webinar_confirmation';

  if (!phoneNumberId || !accessToken) {
    console.warn('[Webinar] WhatsApp env vars not set — skipping WhatsApp send');
    return;
  }

  // Sanitize phone: ensure it starts with country code, no + sign, no spaces
  let phone = data.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  if (phone.startsWith('0')) phone = '91' + phone.slice(1);
  if (!phone.startsWith('91')) phone = '91' + phone;

  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  const isNoParamTemplate = templateName === 'hello_world' || templateName === 'sp_direct_integration_test_template';

  const body = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'template',
    template: {
      name: templateName,
      language: { code: isNoParamTemplate ? 'en_US' : 'en' },
      ...(isNoParamTemplate
        ? {}
        : {
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: data.name },
                  { type: 'text', text: WEBINAR_INFO.date },
                  { type: 'text', text: WEBINAR_INFO.time },
                  { type: 'text', text: WEBINAR_INFO.venue },
                  { type: 'text', text: WEBINAR_INFO.meetLink },
                ],
              },
            ],
          }),
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(`WhatsApp API error: ${JSON.stringify(result)}`);
  }

  console.log('[Webinar] WhatsApp sent successfully:', result?.messages?.[0]?.id);
  return result;
}

// ─── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const data = await req.json();

    const { name, phone, email, city } = data;
    if (!name || !phone || !email || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [mongoResult, sheetResult, whatsappResult] = await Promise.allSettled([
      saveToMongo(data),
      appendToSheet(data),
      sendWhatsApp(data),
    ]);

    // Log failures without blocking the success response
    if (mongoResult.status === 'rejected')
      console.error('[Webinar] MongoDB failed:', mongoResult.reason);
    if (sheetResult.status === 'rejected')
      console.error('[Webinar] Google Sheets failed:', sheetResult.reason);
    if (whatsappResult.status === 'rejected')
      console.error('[Webinar] WhatsApp failed:', whatsappResult.reason);

    // Only hard-fail if MongoDB failed (primary store)
    if (mongoResult.status === 'rejected') {
      const reasonMessage = mongoResult.reason?.message || String(mongoResult.reason);
      return NextResponse.json(
        { error: `Failed to save registration: ${reasonMessage}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        whatsappSent: whatsappResult.status === 'fulfilled',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('[Webinar] Unexpected error:', err);
    return NextResponse.json(
      { error: `Internal server error: ${err.message || err}` },
      { status: 500 }
    );
  }
}
