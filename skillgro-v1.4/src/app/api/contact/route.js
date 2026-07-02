import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { google } from 'googleapis';

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
    new Date().toISOString().split('T')[0],
    data.user_name,
    data.user_email,
    data.phone,
    data.message,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Contacts!A:E',   // ← tab named "Contacts" in the same spreadsheet
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

async function saveToMongo(data) {
  await clientPromise();

  const mongoose = (await import('mongoose')).default;
  await mongoose.connection.collection('contacts').insertOne({  // ← "contacts" collection
    ...data,
    createdAt: new Date(),
  });
}

export async function POST(req) {
  try {
    const data = await req.json();

    const { user_name, user_email } = data;
    if (!user_name || !user_email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [mongoResult, sheetResult] = await Promise.allSettled([
      saveToMongo(data),
      appendToSheet(data),
    ]);

    if (mongoResult.status === 'rejected')
      console.error('[Contact] MongoDB failed:', mongoResult.reason);
    if (sheetResult.status === 'rejected')
      console.error('[Contact] Google Sheets failed:', sheetResult.reason);

    if (mongoResult.status === 'rejected') {
      const reasonMessage = mongoResult.reason?.message || String(mongoResult.reason);
      return NextResponse.json({ error: `Failed to save contact: ${reasonMessage}` }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[Contact] Unexpected error:', err);
    return NextResponse.json({ error: `Internal server error: ${err.message || err}` }, { status: 500 });
  }
}