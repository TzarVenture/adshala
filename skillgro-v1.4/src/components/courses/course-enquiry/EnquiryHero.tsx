"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./enquiry-hero.css";
import mobileBannerImg from "@/assets/img/banner/DM_Banner_Enquiry_Page.png";
import { CourseDataType } from "@/data/inner-data/InnerCourseData";
import { COURSE_TOOLS, DEFAULT_TOOLS } from "@/data/inner-data/CourseToolsData";
import { EnquiryFormContainer } from "@/components/homes/home-one/EnquiryForm";
import BrochurePopup from "@/components/common/BrochurePopup";
import ToolsSlider from "@/components/common/ToolsSlider/ToolsSlider";
import WhyChooseUs from "./WhyChooseUs";
import AccreditationLogos from "./AccreditationLogos";
import CourseCertificates from "./CourseCertificates";

interface EnquiryHeroProps {
  course: CourseDataType;
}

export default function EnquiryHero({ course }: EnquiryHeroProps) {
  const [brochureOpen, setBrochureOpen] = useState(false);

  const displayCategory = course.category || "Certification";
  // const displayPhone = "+91 86521 99991 / +91 77607 75875";

  // Look up per-course tool data; fall back to generic tools if not found
  const courseTools = course.overview
    ? (COURSE_TOOLS[course.overview] ?? DEFAULT_TOOLS)
    : DEFAULT_TOOLS;

  return (
    <>
      <div className="enquiry-page__wrapper">

        {/* Breadcrumb */}
        <div className="enquiry-breadcrumb">
          <Link href="/">Home</Link> &gt; <Link href="/courses">Courses</Link> &gt;{" "}
          <span>{course.title}</span>
        </div>

        {/* ── Hero Card ── */}
        <section className="enquiry-hero__card">
          <div className="enquiry-hero__grid">

            {/* Left: Course info */}
            <div className="enquiry-hero__content">
              <div className="enquiry-hero__tag-group">
                <span className="enquiry-hero__tag-popular">Popular</span>
                <span className="enquiry-hero__tag-category">{displayCategory}</span>
              </div>

              <div className="enquiry-hero__desktop-text">
                <h1 className="enquiry-hero__title">{course.title}</h1>
                <p className="enquiry-hero__desc">
                  {course.desc ||
                    "Learn professional skills with expert mentorship and recognized certification."}
                </p>
              </div>

              <div className="enquiry-hero__mobile-image">
                <Image
                  src={mobileBannerImg}
                  alt={course.title}
                  style={{ width: "100%", height: "auto", borderRadius: "12px", marginBottom: "20px" }}
                  priority
                />
              </div>

              {/* 3 info stats */}
              <div className="enquiry-hero__stats">
                <div className="enquiry-hero__stat-item">
                  <div className="enquiry-hero__stat-label">Duration</div>
                  <div className="enquiry-hero__stat-value">
                    {course.duration || "3 Months"}
                  </div>
                </div>

                <div className="enquiry-hero__stat-item">
                  <div className="enquiry-hero__stat-label">Mode</div>
                  <div className="enquiry-hero__stat-value">
                    {course.mode || "Offline"}
                  </div>
                </div>

                <div className="enquiry-hero__stat-item">
                  <div className="enquiry-hero__stat-label">Pricing</div>
                  <div className="enquiry-hero__stat-value">
                    ₹{Number(course.price || 0).toLocaleString("en-IN")}
                    <span className="emi-tag">EMI Options Available</span>
                  </div>
                </div>
              </div>

              {/* Brochure button */}
              <div className="enquiry-hero__actions">
                <button
                  onClick={() => setBrochureOpen(true)}
                  className="enquiry-hero__btn-brochure"
                >
                  <i className="fas fa-download"></i> Download Brochure
                </button>
              </div>

              {/* Phone */}
              <div className="enquiry-hero__call-info">
                <span>For enquiries call: </span>
                <a>
                  <i className="fas fa-phone-alt"><span> +91 86521 99991 / +91 77607 75875</span></i>
                </a>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="enquiry-hero__form-wrapper" id="enquiry-form-section">
              <EnquiryFormContainer defaultProgram={course.title} />
            </div>

          </div>
        </section>

        {/* ── Tools Slider (per-course) ── */}
        <ToolsSlider tools={courseTools} />

        {/* ── Why Choose Adshalaa section ── */}
        <WhyChooseUs courseOverviewKey={course.overview} />

        {/* ── Accreditation / Partner Logos ── */}
        <AccreditationLogos />

        {/* ── Course + Internship Certificate Images ── */}
        {course.certificateImages && course.certificateImages.length > 0 && (
          <CourseCertificates
            certificates={course.certificateImages}
            courseTitle={course.title}
          />
        )}

        {/* ── Bottom Enquire Now CTA ── */}
        <div style={{ textAlign: "center", marginTop: "-20px" }}>
          <button
            onClick={() => {
              document.getElementById("enquiry-form-section")?.scrollIntoView({ behavior: "smooth" });
              setTimeout(() => {
                const firstInput = document.querySelector("#enquiry-form-section input") as HTMLInputElement;
                if (firstInput) firstInput.focus();
              }, 500);
            }}
            className="btn btn-two arrow-btn"
          >
            Enquire Now <i className="fas fa-arrow-right"></i>
          </button>
        </div>

      </div>

      {/* Brochure Popup */}
      <BrochurePopup isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
    </>
  );
}
