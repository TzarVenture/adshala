// Central CRM Ingestion Helper for Adshalaa Leads

export interface CRMIngestPayload {
  name?: string;
  fullName?: string;
  username?: string;
  user_name?: string;
  email?: string;
  useremail?: string;
  user_email?: string;
  phone?: string;
  userphone?: string;
  city?: string;
  program?: string;
  course?: string;
  message?: string;
  goals?: string;
  professionalStatus?: string;
  batch?: string;
  source?: string;
  formType?: string;
  adshalaaData?: Record<string, any>;
}

export async function forwardToCRM(payload: CRMIngestPayload) {
  try {
    const crmUrl = process.env.TZAR_CRM_URL || "http://localhost:3000/api/v1/ingest";
    const apiKey = process.env.TZAR_INGEST_API_KEY || "tzar_live_ingest_key_demo";

    const fullName = payload.name || payload.fullName || payload.username || payload.user_name || "";
    const email = payload.email || payload.useremail || payload.user_email || "";
    const phone = payload.phone || payload.userphone || "";
    const city = payload.city || "";
    const programName = payload.program || payload.course || "";
    const interestedServices = programName ? [programName] : [];
    const requirementsMessage = payload.message || payload.goals || "";

    // Map source and formType to valid CRM Zod enums
    let source = payload.source || "WEBSITE_ENQUIRY";
    if (source === "BROCHURE_DOWNLOAD") source = "WEBSITE_BROCHURE";
    if (source === "WEBINAR_REGISTRATION") source = "WEBSITE_WEBINAR";
    if (source === "CONTACT_FORM") source = "WEBSITE_CONTACT";
    if (source === "STUDENT_REGISTRATION") source = "WEBSITE_REGISTRATION";

    let formType = payload.formType || "ENQUIRY";
    if (formType === "STUDENT_REGISTRATION") formType = "REGISTRATION";

    const body = {
      business: "adshalaa",
      source,
      fullName,
      email,
      phone,
      city,
      interestedServices,
      requirementsMessage,
      adshalaaData: {
        formType,
        programName,
        professionalStatus: payload.professionalStatus || "",
        batch: payload.batch || "",
        ...(payload.adshalaaData || {}),
      },
    };

    const res = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tzar-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Central CRM Ingestion] HTTP ${res.status}:`, errText);
    } else {
      console.log(`[Central CRM Ingestion] Success (${payload.formType || 'ENQUIRY'}):`, fullName);
    }
  } catch (crmErr: any) {
    console.error("Central CRM Ingestion Error:", crmErr?.message || crmErr);
  }
}
