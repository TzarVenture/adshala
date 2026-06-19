// // app/api/enquire/route.js
// import { NextResponse } from "next/server";
// // import { MongoClient } from "mongodb";
// // import { google } from "googleapis";
// import { Resend } from "resend";

// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

// export async function POST(req) {
//   const formData = await req.json();

//   // 1. Save to MongoDB
//   // const saveToMongo = async () => {
//   //   const client = new MongoClient(MONGO_URI);
//   //   try {
//   //     await client.connect();
//   //     const db = client.db("your_database_name");
//   //     const collection = db.collection("enquiries");
//   //     await collection.insertOne({ ...formData, createdAt: new Date() });
//   //   } finally {
//   //     await client.close(); // always close
//   //   }
//   // };

//   // 2. Append to Google Sheet
//   // const saveToRemoteSheet = async () => {
//   //   const auth = new google.auth.GoogleAuth({
//   //     credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}"),
//   //     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//   //   });

//   //   const sheets = google.sheets({ version: "v4", auth });
//   //   await sheets.spreadsheets.values.append({
//   //     spreadsheetId: process.env.GOOGLE_SHEET_ID,
//   //     range: "Sheet1!A:F",
//   //     valueInputOption: "USER_ENTERED",
//   //     requestBody: {
//   //       values: [
//   //         [
//   //           formData.name,
//   //           formData.phone,
//   //           formData.email,
//   //           formData.city,
//   //           formData.program,
//   //           formData.message,
//   //         ],
//   //       ],
//   //     },
//   //   });
//   // };

//   // 3. Send email via Resend
//   const sendEmailNotification = async () => {
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: ["anwarkhan0840@gmail.com"],
//       replyTo: formData.email, // ✅ closure over formData, no param needed
//       subject: `New Enquiry from ${formData.name}`,
//       html: `
//         <h2>New Enquiry Received</h2>
//         <p><strong>Name:</strong> ${formData.name}</p>
//         <p><strong>Phone:</strong> ${formData.phone}</p>
//         <p><strong>Email:</strong> ${formData.email}</p>
//         <p><strong>City:</strong> ${formData.city}</p>
//         <p><strong>Program:</strong> ${formData.program}</p>
//         <p><strong>Message:</strong></p>
//         <p>${formData.message}</p>
//       `,
//     });
//   };

//   // Run all independently — one failure won't block others
//   const results = await Promise.allSettled([
//     saveToMongo(),
//     saveToRemoteSheet(),
//     sendEmailNotification(),
//   ]);

//   const syncLog = {
//     mongodb: results[0].status === "fulfilled" ? "success" : "failed",
//     sheet: results[1].status === "fulfilled" ? "success" : "failed",
//     email: results[2].status === "fulfilled" ? "success" : "failed",
//   };

//   return NextResponse.json(
//     { message: "Processes finalized", syncLog },
//     { status: 200 },
//   );
// }
