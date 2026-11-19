// Single source for the institute's contact details used on receipts and emails.

export const INSTITUTE = {
  name: "Adshalaa EduTech",
  tagline: "Ab Lakshya Hua Asaan",
  address:
    "B, Ground Floor, Andheri E, Saki Vihar Rd, behind Finch Restaurant, Ganesh Nagar, Marol, Andheri East, Mumbai, Maharashtra 400072",
  mapUrl:
    "https://www.google.com/maps/place/ADSHALAA+Advance+Digital+Marketing+Certification+Course+in+Andheri,+Mumbai/%4019.1601052,72.863454,12z/data=!3m1!4b1!4m6!3m5!1s0x4b21caa1f3b88d6b:0x21c1ab798094afaa!8m2!3d19.1601052!4d72.863454!16s%2Fg%2F11zg002tph",
  phones: ["+91 8652199991", "+91 7760775875"],
  email: "info@adshalaa.com",
  website: "www.adshalaa.com",
  supportHours: "Monday to Saturday (9:30 AM to 7:00 PM IST)",
} as const;

// Numbers shown in the website navbar and footer
export const CONTACT_PHONES = [
  { display: "+91 7760775875", tel: "+917760775875" },
  { display: "+91 7304056607", tel: "+917304056607" },
  { display: "+91 9004250252", tel: "+919004250252" },
] as const;
