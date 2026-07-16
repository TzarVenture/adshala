import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract standard text fields
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const dob = formData.get('dob') || '';
    const city = formData.get('city') || '';
    const professionalStatus = formData.get('professionalStatus') || '';
    const company = formData.get('company') || '';
    const designation = formData.get('designation') || '';
    const experience = formData.get('experience') || '';
    const course = formData.get('course') || '';
    const coursePrice = formData.get('coursePrice') || '';
    const batch = formData.get('batch') || '';
    const source = formData.get('source') || '';
    const goals = formData.get('goals') || '';
    const emergencyName = formData.get('emergencyName') || '';
    const emergencyRelation = formData.get('emergencyRelation') || '';
    const emergencyPhone = formData.get('emergencyPhone') || '';
    
    // Extract new Document Mode and Payment Fields
    const documentMode = formData.get('documentMode') || '';
    const paymentAmount = formData.get('paymentAmount') || '';

    // TODO: Extract Files for Google Drive Upload
    // const aadhaarFile = formData.get('aadhaarFile');
    // const secondaryFile = formData.get('secondaryFile');
    // We will upload these to Google Drive in the next step.

    // 1. Initialize Google Auth for Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        // 'https://www.googleapis.com/auth/drive.file' // Will need this for Drive
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Append to registrationSheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'registrationSheet!A:S',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            name, email, phone, dob, city,
            professionalStatus, company, designation, experience,
            course, batch, source, goals,
            emergencyName, emergencyRelation, emergencyPhone,
            documentMode, paymentAmount
          ],
        ],
      },
    });

    return NextResponse.json({ success: true, message: 'Data saved successfully' }, { status: 200 });

  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
