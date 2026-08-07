import type { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import WebinarLanding from "@/components/webinar/WebinarLanding";

export const metadata: Metadata = {
  title: "Free Webinar: Digital Marketing in the AI Era 2026 | Adshalaa",
  description:
    "Join Adshalaa's free live webinar – 'The Shifting Role of Digital Marketing in the AI Era 2026' on 16 Aug 2026, 12 PM–1 PM. Speakers: Rahul Rastogi & Nidhi from TZAR Digital Agency. Register free and get the Google Meet link on WhatsApp!",
  keywords: [
    "digital marketing webinar 2026",
    "free webinar Mumbai",
    "AI digital marketing",
    "Adshalaa webinar",
    "TZAR digital agency",
    "digital marketing career",
  ],
  openGraph: {
    title: "Free Webinar: Digital Marketing in the AI Era 2026 | Adshalaa",
    description:
      "16 Aug 2026 · 12 PM–1 PM · Sakivihar, Andheri East, Mumbai. Register free and get the Google Meet link on WhatsApp!",
    url: "https://www.adshalaa.com/digital-marketing-webinar",
    siteName: "Adshalaa",
    images: [
      {
        url: "https://www.adshalaa.com/webinarPost.jpeg",
        width: 830,
        height: 1472,
        alt: "Adshalaa Digital Marketing Webinar 2026",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Webinar: Digital Marketing in the AI Era 2026 | Adshalaa",
    description:
      "16 Aug 2026 · 12 PM–1 PM. Register free and get Google Meet link on WhatsApp!",
    images: ["https://www.adshalaa.com/webinarPost.jpeg"],
  },
};

export default function WebinarPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main className="main-area fix" style={{ backgroundColor: "#ffffff" }}>
        <WebinarLanding />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
