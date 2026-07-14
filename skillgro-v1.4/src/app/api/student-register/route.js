import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// ─── Google Sheets ────────────────────────────────────────────────────────────
async function appendToRegistrationSheet(data) {
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
    data.name || '',
    data.email || '',
    data.phone || '',
    data.dob || '',
    data.city || '',
    data.professionalStatus || '',
    data.company || '',
    data.designation || '',
    data.experience || '',
    data.course || '',
    data.batch || '',
    data.source || '',
    data.goals || '',
    data.emergencyName || '',
    data.emergencyRelation || '',
    data.emergencyPhone || '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'registrationSheet!A:Q',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const data = await req.json();

    await appendToRegistrationSheet(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[Student Register] Error:', err);
    return NextResponse.json(
      { error: `Internal server error: ${err.message || err}` },
      { status: 500 }
    );
  }
}
