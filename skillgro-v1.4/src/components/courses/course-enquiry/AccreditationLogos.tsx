import React from "react";
import Image from "next/image";
import "./accreditation-logos.css";

import brand_1 from "@/assets/accreditationImgs/certificate1.png";
import brand_2 from "@/assets/accreditationImgs/certificate2.png";
import brand_3 from "@/assets/accreditationImgs/certificate3.png";
import brand_4 from "@/assets/accreditationImgs/certificate4.png";
import brand_5 from "@/assets/accreditationImgs/certificate5.png";
import brand_6 from "@/assets/accreditationImgs/certificate6.png";

const PARTNER_LOGOS = [
  { src: brand_1, alt: "Directorate of Skill Development" },
  { src: brand_2, alt: "Government of India" },
  { src: brand_3, alt: "MSME – Micro, Small & Medium Enterprises" },
  { src: brand_4, alt: "NSDC – National Skill Development Corporation" },
  { src: brand_5, alt: "Skill India" },
  { src: brand_6, alt: "Accreditation Partner" },
];

export default function AccreditationLogos() {
  return (
    <section className="accred__section">
      <div className="accred__wrapper">
        <div className="section__title text-center mb-40">
          <span className="sub-title">Accredited &amp; Recognised By</span>
          <h2 className="title">Our Certifications Are Backed By Industry Leaders</h2>
        </div>

        <div className="accred__grid">
          {PARTNER_LOGOS.map((logo, i) => (
            <div className="accred__card" key={i}>
              <div className="accred__logo-wrap">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "72px", objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
