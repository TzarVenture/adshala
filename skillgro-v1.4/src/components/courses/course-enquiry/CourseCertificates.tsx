"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./course-certificates.css";
import { CourseCertificate } from "@/data/inner-data/InnerCourseData";

interface CourseCertificatesProps {
  certificates: CourseCertificate[];
  courseTitle: string;
}

export default function CourseCertificates({
  certificates,
  courseTitle,
}: CourseCertificatesProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Don't render if no certificates available
  if (!certificates || certificates.length === 0) return null;

  return (
    <section className="cc__section">
      <div className="cc__wrapper">
        {/* Header */}
        <div className="section__title text-center mb-40">
          <span className="sub-title">What You Will Earn</span>
          <h2 className="title">
            Industry-Recognised Certification
          </h2>
          <p className="desc" style={{ marginTop: '10px' }}>
            Earn industry-recognised credentials that employers trust — boosting your career from day one.
          </p>
        </div>

        {/* Desktop: side by side grid | Mobile: single column */}
        <div className="cc__grid" style={{ "--count": certificates.length } as React.CSSProperties}>
          {certificates.map((cert, i) => (
            <div
              className={`cc__card ${activeIdx === i ? "cc__card--active" : ""}`}
              key={i}
              onClick={() => setActiveIdx(i)}
            >
              {/* Certificate title badge */}
              <div className="cc__card-badge">
                <i className="fas fa-certificate"></i>
                <span>{cert.title}</span>
              </div>

              {/* Certificate image */}
              <div className="cc__img-frame">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="cc__footer-note">
          <i className="fas fa-shield-alt"></i>
          Certificates are verified, accredited by MSME, NSDC &amp; Skill India, and shareable on LinkedIn.
        </p>
      </div>
    </section>
  );
}
