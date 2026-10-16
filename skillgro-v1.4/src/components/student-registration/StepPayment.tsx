"use client";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import course_data from "@/data/home-data/CourseData";

const Minimum_Fee = Number(process.env.NEXT_PUBLIC_MIN_FEE) || 2000;

export default function StepPayment() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const course = useFormContext().watch("course");
  const batch = useFormContext().watch("batch");
  const courseObj = course_data[0].course_details.find(
    (c) => c.title === course,
  );
  const coursePrice = courseObj?.price ?? 0;

  const [copiedUpi, setCopiedUpi] = useState(false);

  // Set default registration fee for UPI QR flow
  useEffect(() => {
    setValue("paymentType", "registration", { shouldValidate: true });
    setValue("paymentAmount", Minimum_Fee, { shouldValidate: true });
  }, [setValue]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("tzarventure@kotak");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  /* =========================================================================
     ── RAZORPAY PAYMENT STATE & HANDLERS (Temporarily preserved) ──
     Re-enable this block when Razorpay domain verification is approved:

     const [selectedType, setSelectedType] = useState<"registration" | "custom" | "">("");
     const [customAmount, setCustomAmount] = useState<number | "">(Minimum_Fee);

     useEffect(() => {
       setValue("paymentType", selectedType, { shouldValidate: true });
     }, [selectedType, setValue]);

     useEffect(() => {
       const amt = selectedType === "registration"
         ? Minimum_Fee
         : typeof customAmount === "number" ? customAmount : 0;
       setValue("paymentAmount", amt, { shouldValidate: true });
     }, [selectedType, customAmount, setValue]);
     ========================================================================= */

  return (
    <div className="form-step">
      {/* Header */}
      <div className="payment-step-header mb-3">
        <h2 className="step-title mb-1" style={{ fontSize: '20px', fontWeight: 600, color: '#161439' }}>
          Registration Fee Payment
        </h2>
        <p className="step-subtitle" style={{ fontSize: '13px', color: '#666', margin: 0 }}>
          Scan the QR code below to pay the registration fee and reserve your seat.
        </p>
      </div>

      {/* Hidden fields for validation */}
      <input
        type="hidden"
        {...register("paymentType", {
          required: "Please complete payment step",
        })}
      />
      <input
        type="hidden"
        {...register("paymentAmount", {
          required: "Please enter a valid amount",
        })}
      />

      {/* Registration Fee Summary */}
      <div style={{ background: '#f8faf9', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 18px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '13px', color: '#666', display: 'block' }}>Course: <strong style={{ color: '#161439' }}>{course || "—"}</strong></span>
          {batch && <span style={{ fontSize: '12px', color: '#888' }}>{batch}</span>}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Payable Now</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#1a3f32' }}>₹{Minimum_Fee.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Standee Flyer Image - Full Card Width */}
      <div style={{ maxWidth: '440px', margin: '0 auto 16px', textAlign: 'center' }}>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)', background: '#fff' }}>
          <img
            src="/tzarpayment.jpg"
            alt="Pay to TZAR DIGITAL AGENCY via UPI QR Code"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Copy UPI ID Bar */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f4f8f6', border: '1px solid #d2e4db', borderRadius: '6px', padding: '5px 12px', marginTop: '12px' }}>
          <span style={{ fontSize: '12.5px', color: '#555' }}>UPI ID:</span>
          <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, color: '#161439' }}>tzarventure@kotak</span>
          <button
            type="button"
            onClick={handleCopyUpi}
            style={{
              background: '#1a3f32',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              padding: '3px 8px',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {copiedUpi ? 'Copied ✓' : 'Copy'}
          </button>
        </div>

        {/* UTR Input */}
        <div style={{ marginTop: '14px', textAlign: 'left' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#161439', display: 'block', marginBottom: '5px' }}>
            UPI Reference / UTR Number (Optional)
          </label>
          <input
            type="text"
            {...register("upiRef")}
            placeholder="e.g. 12-digit UPI reference ID"
            style={{
              width: '100%',
              padding: '9px 12px',
              fontSize: '13px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              color: '#161439',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Compact Helpline */}
        <div style={{ fontSize: '12px', color: '#666', marginTop: '12px', lineHeight: 1.5 }}>
          Helpline: <a href="tel:+918652199991" style={{ color: '#1a3f32', fontWeight: 600, textDecoration: 'none' }}>+91 8652199991</a> / <a href="tel:+917760775875" style={{ color: '#1a3f32', fontWeight: 600, textDecoration: 'none' }}>+91 7760775875</a>
          {' '}| <a href="mailto:corporate@tzar.co" style={{ color: '#1a3f32', fontWeight: 600, textDecoration: 'none' }}>corporate@tzar.co</a>
        </div>
      </div>

      {/* =========================================================================
         ── RAZORPAY PAYMENT CARDS & TRUST FOOTER (Preserved for re-enabling) ──
         Re-enable when Razorpay domain verification is approved:

         <div className="payment-summary-card">
           ... full options cards and custom amount inputs ...
         </div>
         <div className="payment-trust-footer">
           <img src="https://badge.razorpay.com/static/badge.svg" alt="Secured by Razorpay" />
         </div>
         ========================================================================= */}
    </div>
  );
}
