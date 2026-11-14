'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import adshalaaFooterLogo from '@/assets/img/brand/Adshalaa_footer_logo.png';
import { INSTITUTE } from '@/config/institute';
import { amountToWords } from '@/utils/amountToWords';
import './Registration.css';

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  city?: string;
  course: string;
  batch: string;
  batchSchedule?: string;
  batchMode?: string;
  paymentAmount?: number | string;
  paymentId: string;
  orderId?: string;
  registeredAt?: string;
}

interface RegistrationSuccessProps {
  embeddedPaymentId?: string;
  onRegisterAnother?: () => void;
  isEmbedded?: boolean;
}

export default function RegistrationSuccess({
  embeddedPaymentId,
  onRegisterAnother,
  isEmbedded = false,
}: RegistrationSuccessProps) {
  const searchParams = useSearchParams();
  const paymentId = embeddedPaymentId || searchParams.get('paymentId');

  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentId) {
      setLoading(false);
      setError('No payment reference found. If you completed a payment, please check your email for the confirmation receipt.');
      return;
    }

    async function fetchRecord() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/student-register/verify?paymentId=${encodeURIComponent(paymentId as string)}`);
        const data = await res.json();

        if (res.ok && data.found) {
          setRegistration(data.registration);
          if (typeof window !== 'undefined' && data.registration.paymentId) {
            localStorage.setItem('adshaala_last_payment_id', data.registration.paymentId);
          }
        } else {
          setError(data.error || 'Unable to locate this registration. Please verify your payment reference or contact support.');
        }
      } catch (err) {
        console.error('Error verifying registration:', err);
        setError('A network error occurred while retrieving your registration details.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecord();
  }, [paymentId]);

  const handleRegisterAnotherClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adshaala_last_payment_id');
    }
    if (onRegisterAnother) {
      onRegisterAnother();
    } else {
      window.location.href = '/student-registration?new=true';
    }
  };

  // Shared Global Print Styles (Included in all render branches)
  const printStyles = (
    <style jsx global>{`
      /* Ensure print-only document is NEVER visible on screen */
      .print-only {
        display: none !important;
      }
      @media screen {
        .print-only {
          display: none !important;
        }
      }
      /* Clean, strict 2-page print formatting with zero blank spill pages */
      @media print {
        @page {
          size: A4 portrait;
          margin: 10mm 14mm;
        }
        body, html {
          background: #ffffff !important;
          color: #000000 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        /* Print on plain white paper: strip every background colour/image and shadow */
        body, body * {
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
        }
        html, body {
          background-color: #ffffff !important;
        }
        header, footer, nav, .tg-header__area, #sticky-header, #header-fixed-height,
        .no-print, .receipt-sidebar, .breadcrumb, .embedded-notice, .receipt-card-print,
        .registration-brand-info, .step-actions, .progress-bar-container,
        .embedded-receipt-wrapper > .embedded-notice,
        .sticky-bar, .sticky-action, .action-center, .whatsapp,
        .scroll__top, .scroll-to-target, .Toastify,
        div[role="navigation"].sticky-bar {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        .print-only {
          display: block !important;
        }
        .print-page-1 {
          display: block !important;
          page-break-after: always !important;
          break-after: page !important;
          box-sizing: border-box !important;
        }
        .print-page-2 {
          display: block !important;
          page-break-before: always !important;
          break-before: page !important;
          box-sizing: border-box !important;
        }
      }
    `}</style>
  );

  if (loading) {
    return (
      <div className="registration-container" style={{ padding: isEmbedded ? '30px 0' : '60px 0', textAlign: 'center' }}>
        <div className="registration-card" style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e0ebe6',
              borderTopColor: '#1a3f32',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161439', margin: '0 0 8px 0' }}>
            Retrieving Registration
          </h3>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            Verifying your enrollment details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="registration-container" style={{ padding: isEmbedded ? '20px 0' : '60px 0' }}>
        <div className="registration-card" style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center', padding: '36px 24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#dc2626',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '14px'
            }}
          >
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#161439', margin: '0 0 8px 0' }}>
            Record Not Found
          </h2>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: '0 0 24px 0' }}>
            {error}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleRegisterAnotherClick}
              className="btn"
              style={{ padding: '12px 26px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <i className="fas fa-user-plus"></i>
              <span>Start New Registration</span>
            </button>
            <Link
              href="/"
              className="btn btn-border"
              style={{ padding: '12px 22px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // The official payment receipt (shared by the on-screen card and print page 1)
  const amountPaid = Number(registration.paymentAmount || 0);
  const amountPaidText = amountPaid.toLocaleString('en-IN');

  const field = (label: string, value: ReactNode, extraClass = '') => (
    <div className={`rcpt-field ${extraClass}`.trim()}>
      <span className="rcpt-label">{label}</span>
      <span className="rcpt-value">{value}</span>
    </div>
  );

  const receiptSheet = (
    <div className="rcpt-sheet">
      {/* Tilted brand watermark */}
      <div className="rcpt-watermark" aria-hidden="true">
        <img src={adshalaaFooterLogo.src} alt="" />
      </div>

      <div className="rcpt-body">
        {/* Letterhead: logo left, registration text right (address lives on page 2) */}
        <div className="receipt-header-responsive rcpt-head">
          <img src={adshalaaFooterLogo.src} alt="Adshalaa EduTech" className="rcpt-logo" />
          <div className="receipt-header-text rcpt-head-text">
            <div className="receipt-header-title rcpt-head-title">
              <h2>Registration Confirmed</h2>
              <span className="rcpt-verified">Verified Enrollment</span>
            </div>
            <p>Official admission slip issued by {INSTITUTE.name}.</p>
            <p className="rcpt-contact">{INSTITUTE.phones.join(' / ')} · {INSTITUTE.email}</p>
          </div>
        </div>

        {/* Title bar with receipt number and date */}
        <div className="rcpt-title">
          <span className="rcpt-title-text">PAYMENT RECEIPT</span>
          <span className="rcpt-title-meta">
            Receipt No: <strong className="rcpt-mono">{registration.paymentId}</strong>
            <span className="rcpt-sep">|</span>
            Date: <strong>{registration.registeredAt || '—'}</strong>
          </span>
        </div>

        {/* Student information */}
        <div className="rcpt-section">
          <h3>Student Information</h3>
          <div className="rcpt-grid">
            {field('Candidate Name', registration.name || '—')}
            {field('Email Address', registration.email || '—')}
            {field('Phone Number', registration.phone || '—')}
            {registration.city && field('City / Campus', registration.city)}
          </div>
        </div>

        {/* Program details */}
        <div className="rcpt-section">
          <h3>Program Details</h3>
          <div className="rcpt-grid">
            {field('Selected Course', registration.course || '—', 'rcpt-span-all')}
            {field('Batch Schedule', registration.batchSchedule || registration.batch || '—')}
            {field('Learning Mode', registration.batchMode || '—')}
          </div>
        </div>

        {/* Payment summary */}
        <div className="rcpt-section">
          <h3>Payment Summary</h3>
          <div className="rcpt-grid">
            {field('Amount Paid', <span className="rcpt-amount">₹{amountPaidText}</span>)}
            {field('Payment Status', <span className="rcpt-ok">✓ Successful</span>)}
            {field('Payment Mode', 'Online (Razorpay)')}
            {field('Transaction ID', <span className="rcpt-mono">{registration.paymentId}</span>, 'rcpt-span-2')}
            {registration.orderId && field('Gateway Order ID', <span className="rcpt-mono">{registration.orderId}</span>)}
          </div>
        </div>

        {/* Amount in words + PAID stamp */}
        <div className="rcpt-words-row">
          <div className="rcpt-words">
            <span className="rcpt-label">Amount in words</span>
            <strong>{amountToWords(amountPaid)}</strong>
          </div>
          <div className="rcpt-stamp" aria-label="Paid">PAID</div>
        </div>

        {/* Signature */}
        <div className="rcpt-sign-row">
          <div className="rcpt-thanks">Received with thanks. Please retain this receipt for future reference and fee reconciliation.</div>
          <div className="rcpt-sign">
            <div className="rcpt-sign-line"></div>
            <strong>Authorised Signatory</strong>
            <span>For {INSTITUTE.name}</span>
          </div>
        </div>

        <div className="rcpt-foot">
          This is a computer-generated receipt and is valid without a physical signature. · {INSTITUTE.website}
        </div>
      </div>
    </div>
  );

  // Screen view: receipt sheet + actions
  const receiptCardContent = (
    <div
      className="receipt-card-print verified-receipt-card"
      style={{
        position: 'relative',
        background: '#ffffff',
        border: '1px solid #dce5e0',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      {receiptSheet}

      <div className="no-print" style={{ fontSize: '13px', color: '#444', lineHeight: '1.6', margin: '18px 0', padding: '12px 16px', background: '#f4f8f6', borderRadius: '10px', border: '1px solid #dbe7df' }}>
        <i className="fas fa-shield-alt me-2" style={{ color: '#1a3f32' }}></i>
        This official admission slip is digitally verified by Adshaala Admissions Board. A copy has been dispatched to your email address.
      </div>

      <div className="receipt-actions no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="btn btn-border"
          style={{ padding: '12px 24px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <i className="fas fa-print"></i>
          <span>Print / Download Receipt</span>
        </button>

        <Link
          href="/"
          className="btn btn-border"
          style={{ padding: '12px 22px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
      </div>
    </div>
  );

  // Dedicated 2-page print layout for PDF / Printing (Controlled heights to completely eliminate empty 2nd page spills)
  const printDocumentPages = (
    <div className="print-only" style={{ display: 'none' }}>
      {/* ── PRINT PAGE 1: Payment Receipt ── */}
      <div className="print-page-1" style={{ position: 'relative', padding: '0 0 10px 0' }}>
        {receiptSheet}
        <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '10.5px', color: '#888' }}>
          Page 1 of 2 — Official Student Payment Receipt · {INSTITUTE.website} · {INSTITUTE.email}
        </div>
      </div>

      {/* ── PRINT PAGE 2: Guidelines, Support & Accreditations ── */}
      <div className="print-page-2" style={{ position: 'relative', padding: '10px 0 0 0', overflow: 'hidden' }}>
        {/* Tilted watermark logo */}
        <div className="rcpt-watermark" aria-hidden="true">
          <img src={adshalaaFooterLogo.src} alt="" />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Page 2 Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #1a3f32', paddingBottom: '12px', marginBottom: '14px' }}>
          <div>
            <img src={adshalaaFooterLogo.src} alt="Adshalaa EduTech" style={{ height: '38px', objectFit: 'contain' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1a3f32' }}>STUDENT ONBOARDING & HELPDESK DIRECTORY</div>
            <div style={{ fontSize: '10.5px', color: '#666' }}>Page 2 of 2</div>
          </div>
        </div>

        {/* Section: Admissions Helpdesk */}
        <div style={{ marginBottom: '16px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: '#f5f5f5', padding: '6px 10px', fontWeight: 700, fontSize: '11.5px', color: '#1a3f32', borderBottom: '1px solid #ddd' }}>
            ADMISSIONS & ACADEMIC HELPDESK
          </div>
          <table style={{ width: '100%', fontSize: '11.5px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 10px', width: '25%', color: '#666', borderBottom: '1px solid #eee' }}>Helpline Numbers:</td>
                <td style={{ padding: '6px 10px', width: '75%', fontWeight: 600, borderBottom: '1px solid #eee' }}>
                  +91 8652199991 / +91 7760775875
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', color: '#666', borderBottom: '1px solid #eee' }}>Official Email:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600, borderBottom: '1px solid #eee' }}>info@adshalaa.com</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', color: '#666', borderBottom: '1px solid #eee' }}>Campus Center:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600, borderBottom: '1px solid #eee' }}>{INSTITUTE.address}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', color: '#666' }}>Support Hours:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>Monday to Saturday (9:30 AM to 7:00 PM IST)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section: Academic Guidelines */}
        <div style={{ marginBottom: '16px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: '#f5f5f5', padding: '6px 10px', fontWeight: 700, fontSize: '11.5px', color: '#1a3f32', borderBottom: '1px solid #ddd' }}>
            ESSENTIAL STUDENT INSTRUCTIONS
          </div>
          <div style={{ padding: '10px 12px', fontSize: '11.5px', color: '#333', lineHeight: '1.5' }}>
            <p style={{ margin: '0 0 6px 0' }}>
              <strong>1. Portal & LMS Access:</strong> Your Learning Management System credentials and live class link will be dispatched to your registered email prior to the batch launch.
            </p>
            <p style={{ margin: '0 0 6px 0' }}>
              <strong>2. Document Verification:</strong> All students are requested to complete physical identity verification at the center before final module completion. Please keep original ID (Aadhaar / Voter ID / Passport) available.
            </p>
            <p style={{ margin: '0 0 6px 0' }}>
              <strong>3. Practical Live Projects:</strong> Full participation in agency-level capstone projects is mandatory to qualify for 100% placement assistance.
            </p>
            <p style={{ margin: 0 }}>
              <strong>4. Installments & Receipts:</strong> Retain this payment receipt for future account reconciliations.
            </p>
          </div>
        </div>

        {/* Section: Recognized Certifications */}
        <div style={{ marginBottom: '16px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: '#f5f5f5', padding: '6px 10px', fontWeight: 700, fontSize: '11.5px', color: '#1a3f32', borderBottom: '1px solid #ddd' }}>
            ACCREDITATIONS & RECOGNITIONS
          </div>
          <div style={{ padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', alignItems: 'center' }}>
            {[
              '/certificate1.png',
              '/certificate2.png',
              '/certificate3.png',
              '/certificate4.png',
              '/certificate5.png',
              '/certificate6.png',
            ].map((src, i) => (
              <div key={i} style={{ border: '1px solid #eee', padding: '4px', textAlign: 'center', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={src} alt="Accreditation" style={{ maxHeight: '28px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '10.5px', color: '#888', borderTop: '1px solid #eee', paddingTop: '6px' }}>
          Page 2 of 2 — Adshalaa EduTech | www.adshalaa.com | Admissions Desk: info@adshalaa.com
        </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // ── SIMPLE SUCCESS CARD (Active while Razorpay domain verification is in progress) ──
  // =========================================================================
  const simpleSuccessCard = (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e0ebe6',
        borderRadius: '16px',
        padding: '32px 24px',
        maxWidth: isEmbedded ? '100%' : '620px',
        margin: '0 auto',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Icon & Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#e8f5e9',
            color: '#1a3f32',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            marginBottom: '12px',
          }}
        >
          <i className="fas fa-check"></i>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#161439', margin: '0 0 6px 0' }}>
          Registration Successful
        </h2>
        <p style={{ fontSize: '13.5px', color: '#666', margin: 0 }}>
          Your course registration details have been received and recorded.
        </p>
      </div>

      {/* Selected Course & Student Details */}
      <div
        style={{
          background: '#f8faf9',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dashed #e2e8f0', fontSize: '13.5px' }}>
          <span style={{ color: '#666' }}>Student Name</span>
          <span style={{ fontWeight: 600, color: '#161439', textAlign: 'right' }}>{registration.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dashed #e2e8f0', fontSize: '13.5px' }}>
          <span style={{ color: '#666' }}>Registered Email</span>
          <span style={{ fontWeight: 500, color: '#161439', textAlign: 'right' }}>{registration.email}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dashed #e2e8f0', fontSize: '13.5px' }}>
          <span style={{ color: '#666' }}>Phone Number</span>
          <span style={{ fontWeight: 500, color: '#161439', textAlign: 'right' }}>{registration.phone}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dashed #e2e8f0', fontSize: '13.5px' }}>
          <span style={{ color: '#666' }}>Selected Course</span>
          <span style={{ fontWeight: 600, color: '#1a3f32', textAlign: 'right' }}>{registration.course}</span>
        </div>
        {registration.batch && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dashed #e2e8f0', fontSize: '13.5px' }}>
            <span style={{ color: '#666' }}>Batch & Schedule</span>
            <span style={{ fontWeight: 500, color: '#161439', textAlign: 'right' }}>
              {registration.batchSchedule || registration.batch}
              {registration.batchMode ? ` (${registration.batchMode})` : ''}
            </span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dashed #e2e8f0', fontSize: '13.5px' }}>
          <span style={{ color: '#666' }}>Registration Fee</span>
          <span style={{ fontWeight: 700, color: '#1a3f32', textAlign: 'right' }}>
            ₹{Number(registration.paymentAmount || 2000).toLocaleString('en-IN')}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0 2px', fontSize: '13px' }}>
          <span style={{ color: '#666' }}>Payment Reference</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#555', textAlign: 'right' }}>
            {registration.paymentId}
          </span>
        </div>
      </div>

      {/* Manual Verification Helpdesk Notice */}
      <div
        style={{
          background: '#f4f8f6',
          border: '1px solid #d2e4db',
          borderRadius: '10px',
          padding: '14px 16px',
          marginBottom: '22px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <div style={{ color: '#1a3f32', fontSize: '16px', marginTop: '2px' }}>
          <i className="fas fa-headset"></i>
        </div>
        <div style={{ fontSize: '12.5px', color: '#333', lineHeight: 1.5 }}>
          <strong style={{ color: '#161439', display: 'block', marginBottom: '2px' }}>
            Admissions Desk Verification
          </strong>
          Our admissions team is manually verifying UPI payments. To confirm your seat immediately or for batch queries:
          <div style={{ marginTop: '4px', fontWeight: 600 }}>
            <a href="tel:+918652199991" style={{ color: '#1a3f32', textDecoration: 'none' }}>+91 8652199991</a>
            {' '}/ <a href="tel:+917760775875" style={{ color: '#1a3f32', textDecoration: 'none' }}>+91 7760775875</a>
            {' '}| Email: <a href="mailto:info@adshalaa.com" style={{ color: '#1a3f32', textDecoration: 'none' }}>info@adshalaa.com</a>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <Link
          href="/"
          style={{
            background: '#f1f5f3',
            color: '#1a3f32',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #d2e4db',
          }}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
      </div>
    </div>
  );

  // Set to true when Razorpay domain verification is approved to restore full printable tax receipt
  const SHOW_FULL_RAZORPAY_RECEIPT = true;

  if (!SHOW_FULL_RAZORPAY_RECEIPT) {
    return (
      <div className="container" style={{ padding: isEmbedded ? '10px 0' : '36px 15px 70px' }}>
        {simpleSuccessCard}
      </div>
    );
  }

  // If embedded inside /student-registration (Option A)
  if (isEmbedded) {
    return (
      <div className="embedded-receipt-wrapper">
        {printStyles}

        <div
          className="embedded-notice no-print"
          style={{
            background: '#eef6f2',
            border: '1px solid #c7e0d3',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fas fa-info-circle" style={{ color: '#1a3f32', fontSize: '18px' }}></i>
            <span style={{ fontSize: '14px', color: '#1a3f32', fontWeight: 500 }}>
              Recent registration detected. Review your official admission receipt below.
            </span>
          </div>
          <Link
            href={`/student-registration/success?paymentId=${encodeURIComponent(paymentId as string)}`}
            style={{ fontSize: '13px', color: '#1a3f32', fontWeight: 600, textDecoration: 'underline' }}
          >
            Full Confirmation Page →
          </Link>
        </div>

        {receiptCardContent}
        {printDocumentPages}
      </div>
    );
  }

  // Full page view on /student-registration/success with responsive typography, navbar buttons, and helpdesk
  return (
    <div className="container" style={{ padding: '24px 15px 70px' }}>
      {printStyles}

      {/* Top Banner Header */}
      <div className="mb-4 no-print">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e8f5e9', color: '#2e7d32', padding: '5px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>
          <i className="fas fa-check-circle"></i> Enrollment Confirmed
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 700, color: '#161439', margin: '0 0 8px 0' }}>
          Admission Confirmation & Payment Receipt
        </h1>
        <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
          Your application has been received and verified. Below is your official copy and admissions support information.
        </p>
      </div>

      <div className="row g-4 align-items-start no-print">
        
        {/* Left Column: Official Receipt Card */}
        <div className="col-lg-8">
          {receiptCardContent}
        </div>

        {/* Right Column: Admissions Helpdesk & Accreditations */}
        <div className="col-lg-4 receipt-sidebar">
          
          {/* Card 1: Admissions Helpdesk */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #dce5e0',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#edf4f0',
                  color: '#1a3f32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0
                }}
              >
                <i className="fas fa-headset"></i>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#161439', margin: 0 }}>
                Admissions Helpdesk
              </h3>
            </div>

            <p style={{ fontSize: '13.5px', color: '#555', margin: '0 0 16px 0', lineHeight: '1.5' }}>
              Have questions regarding batch timings, installment receipts, or classroom directions? Our counselors are here to help.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '14px', borderTop: '1px solid #edf4f0' }}>
              {/* Phone Contacts */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
                  Helpline Numbers
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <a
                    href="tel:+918652199991"
                    style={{ fontSize: '15px', fontWeight: 600, color: '#1a3f32', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fas fa-phone-alt" style={{ fontSize: '13px', color: '#ffc224' }}></i>
                    +91 8652199991
                  </a>
                  <a
                    href="tel:+917760775875"
                    style={{ fontSize: '15px', fontWeight: 600, color: '#1a3f32', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fas fa-phone-alt" style={{ fontSize: '13px', color: '#ffc224' }}></i>
                    +91 7760775875
                  </a>
                </div>
              </div>

              {/* Email Support */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
                  Official Email
                </div>
                <a
                  href="mailto:info@adshalaa.com"
                  style={{ fontSize: '15px', fontWeight: 600, color: '#1a3f32', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fas fa-envelope" style={{ fontSize: '13px', color: '#ffc224' }}></i>
                  info@adshalaa.com
                </a>
              </div>

              {/* Location */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
                  Institute Campus
                </div>
                <div style={{ fontSize: '14px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-map-marker-alt" style={{ fontSize: '14px', color: '#ffc224', marginTop: '4px', alignSelf: 'flex-start' }}></i>
                  <span style={{ lineHeight: 1.5 }}>
                    {INSTITUTE.address}
                    <a
                      href={INSTITUTE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', marginTop: '4px', fontSize: '13px', fontWeight: 600, color: '#1a3f32', textDecoration: 'underline' }}
                    >
                      View on Google Maps →
                    </a>
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
                  Working Hours
                </div>
                <div style={{ fontSize: '14px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-clock" style={{ fontSize: '13px', color: '#ffc224' }}></i>
                  Monday – Saturday (9:30 AM – 7:00 PM)
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Accreditations & Licences */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #dce5e0',
              borderRadius: '16px',
              padding: '22px 24px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <i className="fas fa-award" style={{ color: '#1a3f32', fontSize: '16px' }}></i>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#161439', margin: 0 }}>
                Accreditations & Certifications
              </h4>
            </div>
            <p style={{ fontSize: '12.5px', color: '#666', margin: '0 0 12px 0' }}>
              Government recognized and industry accredited educational programs.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}
            >
              {[
                '/certificate1.png',
                '/certificate2.png',
                '/certificate3.png',
                '/certificate4.png',
                '/certificate5.png',
                '/certificate6.png',
              ].map((src, i) => (
                <div
                  key={i}
                  style={{
                    background: '#f8faf9',
                    border: '1px solid #e0ebe6',
                    borderRadius: '8px',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '48px',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={src}
                    alt={`Accreditation ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Render the 2-page print document for PDF printing */}
      {printDocumentPages}
    </div>
  );
}
