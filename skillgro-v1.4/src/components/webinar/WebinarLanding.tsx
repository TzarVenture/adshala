"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../courses/course-enquiry/enquiry-hero.css";
import "../homes/home-one/EnquiryForm.css";
import WhyChooseUs from "../courses/course-enquiry/WhyChooseUs";
import AccreditationLogos from "../courses/course-enquiry/AccreditationLogos";

/* ─── Webinar data ──────────────────────────────────────────────────── */
const WEBINAR = {
  title: "The Shifting Role of Digital Marketing in the AI Era – 2026",
  desc:
    "Join industry experts from TZAR Digital Agency for a power-packed 1-hour free live webinar. Discover how AI is reshaping digital marketing careers in 2026, explore real career paths, salary insights, and get actionable strategies to land your first job with 3 LPA+ starting salary.",
  date: "16 Aug 2026",
  day: "Sunday",
  time: "12 PM – 1 PM",
  venue: "Sakivihar, Andheri East, Mumbai",
  phones: ["+91 8652199991", "+91 7760775875"],
  speakers: [
    { name: "Rahul Rastogi", role: "Founder – TZAR Digital Agency", initial: "R", bg: "#1a4731" },
    { name: "Nidhi", role: "Co-Founder – TZAR Digital Agency", initial: "N", bg: "#c9961a" },
  ],
  whatYouLearn: [
    "Future of Digital Marketing in the AI era",
    "Career paths & salary expectations in 2026",
    "How top brands use AI in their marketing",
    "Real-world case studies from TZAR Digital Agency",
    "How to land your first DM job with 3 LPA+",
    "Live Q&A with industry experts",
  ],
};

/* ─── Webinar Registration Form ─────────────────────────────────────── */
function WebinarForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<{ loading: boolean; success: boolean | null; message: string }>({
    loading: false,
    success: null,
    message: "",
  });

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(form.name)) e.name = "Name should contain only alphabets";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit WhatsApp number";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setStatus({ loading: true, success: null, message: "" });
    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ loading: false, success: true, message: "You are registered! Check WhatsApp for your Google Meet link." });
        setForm({ name: "", phone: "", email: "", city: "" });
        setAgreed(false);
      } else {
        setStatus({ loading: false, success: false, message: data.error || "Something went wrong." });
      }
    } catch {
      setStatus({ loading: false, success: false, message: "Network error. Please try again." });
    }
  }

  return (
    <div className="form-container" id="webinar-form-section">
      <h2 className="form-title">Register for Free Webinar</h2>
      <form onSubmit={handleSubmit} className="enquiry-form" noValidate>

        <div className="form-group">
          <label htmlFor="wb-name">Full Name *</label>
          <input
            type="text"
            id="wb-name"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          {errors.name && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.name}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="wb-phone">WhatsApp Number *</label>
            <input
              type="text"
              id="wb-phone"
              placeholder="Enter Your Phone No."
              inputMode="numeric"
              maxLength={10}
              onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""); }}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
            {errors.phone && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="wb-email">Email Address *</label>
            <input
              type="email"
              id="wb-email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            {errors.email && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.email}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="wb-city">City *</label>
          <input
            type="text"
            id="wb-city"
            placeholder="Enter City"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          />
          {errors.city && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.city}</p>}
        </div>

        <div className="consent-group">
          <label className="consent-label">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <span>
              By Proceeding, I agree to{" "}
              <Link href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">T&C</Link>
              {" "}and{" "}
              <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
              . Yes, I would like to receive updates via SMS &amp; WhatsApp.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-two arrow-btn"
          style={{ width: "100%" }}
          disabled={status.loading || !agreed}
        >
          <span style={{ width: "100%" }}>
            {status.loading ? "Submitting..." : "Register for Free"}
          </span>
        </button>

        {status.message && (
          <div className={`status-banner ${status.success ? "success" : "error"}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}

/* ─── Main Page Component ───────────────────────────────────────────── */
export default function WebinarLanding() {
  return (
    <>
      <style>{`
        .wb-speakers-section {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid #edf2f0;
        }
        .wb-speakers-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #718096;
          margin-bottom: 12px;
        }
        .wb-speakers-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .wb-speaker-card {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 190px;
          background: #f8faf9;
          border: 1px solid #edf2f0;
          border-radius: 12px;
          padding: 12px 16px;
          transition: border-color 0.2s;
        }
        .wb-speaker-card:hover { border-color: #1a3f32; }
        .wb-speaker-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .wb-speaker-name { font-size: 14px; font-weight: 700; color: #1a3f32; }
        .wb-speaker-role { font-size: 12px; color: #718096; }

        .wb-learn-section {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid #edf2f0;
        }
        .wb-learn-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #718096;
          margin-bottom: 12px;
        }
        .wb-learn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 600px) { .wb-learn-grid { grid-template-columns: 1fr; } }
        .wb-learn-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 13.5px;
          color: #4a5568;
          line-height: 1.5;
        }
        .wb-learn-item i { color: #1a3f32; font-size: 11px; margin-top: 4px; flex-shrink: 0; }

        /* Date/Time/Venue stat cells override for webinar */
        .wb-stat-value-green { color: #1a3f32 !important; }

        /* Enquiry form wrapper override – make it full width on right */
        .enquiry-hero__form-wrapper .form-container { max-width: 100%; }
      `}</style>

      <div className="enquiry-page__wrapper">

        {/* Breadcrumb */}
        <div className="enquiry-breadcrumb">
          <Link href="/">Home</Link> &gt; <Link href="/courses">Courses</Link> &gt;{" "}
          <span>Digital Marketing Webinar – 2026</span>
        </div>

        {/* ── Hero Card ── */}
        <section className="enquiry-hero__card">
          <div className="enquiry-hero__grid">

            {/* Left: Webinar info */}
            <div className="enquiry-hero__content">
              <div className="enquiry-hero__tag-group">
                <span className="enquiry-hero__tag-popular">Free</span>
                <span className="enquiry-hero__tag-category">Live Webinar</span>
              </div>

              <div className="enquiry-hero__desktop-text">
                <h1 className="enquiry-hero__title">{WEBINAR.title}</h1>
                <p className="enquiry-hero__desc">{WEBINAR.desc}</p>
              </div>

              {/* Webinar post image on mobile */}
              <div className="enquiry-hero__mobile-image">
                <Image
                  src="/webinarPost.jpeg"
                  alt="Digital Marketing Webinar 2026 – Adshalaa"
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "auto", borderRadius: "12px", marginBottom: "20px" }}
                  priority
                />
              </div>

              {/* 3 stat cells — Date / Time / Venue */}
              <div className="enquiry-hero__stats">
                <div className="enquiry-hero__stat-item">
                  <div className="enquiry-hero__stat-label">
                    <i className="fas fa-calendar-days" style={{ marginRight: 5 }} />
                    Date
                  </div>
                  <div className="enquiry-hero__stat-value wb-stat-value-green">
                    {WEBINAR.date}
                    <span className="emi-tag">{WEBINAR.day}</span>
                  </div>
                </div>

                <div className="enquiry-hero__stat-item">
                  <div className="enquiry-hero__stat-label">
                    <i className="fas fa-clock" style={{ marginRight: 5 }} />
                    Time
                  </div>
                  <div className="enquiry-hero__stat-value wb-stat-value-green">
                    {WEBINAR.time}
                  </div>
                </div>

                <div className="enquiry-hero__stat-item">
                  <div className="enquiry-hero__stat-label">
                    <i className="fas fa-location-dot" style={{ marginRight: 5 }} />
                    Venue
                  </div>
                  <div className="enquiry-hero__stat-value wb-stat-value-green" style={{ fontSize: 14 }}>
                    {WEBINAR.venue}
                  </div>
                </div>
              </div>

              {/* What you will learn */}
              <div className="wb-learn-section">
                <div className="wb-learn-label">
                  <i className="fas fa-graduation-cap" style={{ marginRight: 6 }} />
                  What You Will Learn
                </div>
                <div className="wb-learn-grid">
                  {WEBINAR.whatYouLearn.map((item) => (
                    <div key={item} className="wb-learn-item">
                      <i className="fas fa-circle-check" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="wb-speakers-section">
                <div className="wb-speakers-label">
                  <i className="fas fa-microphone" style={{ marginRight: 6 }} />
                  Speakers
                </div>
                <div className="wb-speakers-row">
                  {WEBINAR.speakers.map((sp) => (
                    <div key={sp.name} className="wb-speaker-card">
                      <div className="wb-speaker-avatar" style={{ background: sp.bg }}>
                        {sp.initial}
                      </div>
                      <div>
                        <div className="wb-speaker-name">{sp.name}</div>
                        <div className="wb-speaker-role">{sp.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div className="enquiry-hero__call-info" style={{ marginTop: 24 }}>
                <span>For enquiries call:</span>
                <a href={`tel:${WEBINAR.phones[0]}`}>
                  <i className="fas fa-phone-alt">
                    <span> {WEBINAR.phones[0]} / {WEBINAR.phones[1]}</span>
                  </i>
                </a>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div className="enquiry-hero__form-wrapper" id="webinar-form-anchor">
              <WebinarForm />
            </div>

          </div>
        </section>

        {/* ── Why Choose Adshalaa (reuse existing component) ── */}
        <WhyChooseUs courseOverviewKey="certification-in-advanced-digital-marketing-&-ai" />

        {/* ── Accreditation Logos (reuse existing component) ── */}
        <AccreditationLogos />

        {/* ── Bottom CTA ── */}
        <div style={{ textAlign: "center", marginTop: "-20px", paddingBottom: "60px" }}>
          <button
            onClick={() => {
              document.getElementById("webinar-form-anchor")?.scrollIntoView({ behavior: "smooth" });
              setTimeout(() => {
                const firstInput = document.querySelector("#webinar-form-section input") as HTMLInputElement;
                if (firstInput) firstInput.focus();
              }, 500);
            }}
            className="btn btn-two arrow-btn"
          >
            Register Now <i className="fas fa-arrow-right" />
          </button>
        </div>

      </div>
    </>
  );
}
