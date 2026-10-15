'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
        header, footer, nav, .tg-header__area, #sticky-header, #header-fixed-height,
        .no-print, .receipt-sidebar, .breadcrumb, .embedded-notice, .receipt-card-print,
        .registration-brand-info, .step-actions, .progress-bar-container,
        .embedded-receipt-wrapper > .embedded-notice {
          display: none !important;
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

  // The official admission receipt card (Screen view)
  const receiptCardContent = (
    <div
      className="receipt-card-print"
      style={{
        background: '#ffffff',
        border: '1px solid #dce5e0',
        borderRadius: '16px',
        padding: '28px 30px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Top Institute Header with Brand Logo */}
      <div className="receipt-header-responsive" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e7efe9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src="/Adshalaa_Logo.png"
            alt="Adshalaa Logo"
            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#161439', margin: 0 }}>
                Registration Confirmed
              </h2>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#2e7d32',
                  background: '#e8f5e9',
                  padding: '4px 10px',
                  borderRadius: '14px'
                }}
              >
                Verified Enrollment
              </span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#555', margin: '4px 0 0 0' }}>
              Official admission slip issued by Adshaala (by Tzar Digital).
            </p>
          </div>
        </div>

        <div className="no-print" style={{ fontSize: '13.5px', color: '#555' }}>
          <div>Payment ID: <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#161439' }}>{registration.paymentId}</span></div>
          {registration.registeredAt && <div style={{ marginTop: '2px' }}>Date: <span style={{ fontWeight: 600, color: '#161439' }}>{registration.registeredAt}</span></div>}
        </div>
      </div>

      {/* Structured Details Box */}
      <div
        style={{
          background: '#f8faf9',
          border: '1px solid #e2ece5',
          borderRadius: '12px',
          padding: '22px',
          marginBottom: '22px'
        }}
      >
        {/* Section 1: Course Details */}
        <div style={{ marginBottom: '20px', paddingBottom: '18px', borderBottom: '1px solid #e2ece5' }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1a3f32', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-graduation-cap" style={{ fontSize: '15px' }}></i>
            Program Details
          </div>
          <div className="receipt-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Selected Course</div>
              <div style={{ fontSize: '15.5px', fontWeight: 600, color: '#161439', marginTop: '4px' }}>
                {registration.course || '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Batch Schedule</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#161439', marginTop: '4px' }}>
                {registration.batchSchedule || registration.batch || '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Learning Mode</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#161439', marginTop: '4px' }}>
                {registration.batchMode || '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Student Information */}
        <div style={{ marginBottom: '20px', paddingBottom: '18px', borderBottom: '1px solid #e2ece5' }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1a3f32', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-user" style={{ fontSize: '14px' }}></i>
            Student Information
          </div>
          <div className="receipt-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Candidate Name</div>
              <div style={{ fontSize: '15.5px', fontWeight: 600, color: '#161439', marginTop: '4px' }}>
                {registration.name || '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Email Address</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#161439', marginTop: '4px', wordBreak: 'break-word' }}>
                {registration.email || '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Phone Number</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#161439', marginTop: '4px' }}>
                {registration.phone || '—'}
              </div>
            </div>
            {registration.city && (
              <div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>City / Campus</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#161439', marginTop: '4px' }}>
                  {registration.city}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Payment Summary */}
        <div>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1a3f32', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-receipt" style={{ fontSize: '14px' }}></i>
            Payment Summary
          </div>
          <div className="receipt-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Amount Paid</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#1a3f32', marginTop: '2px' }}>
                ₹{Number(registration.paymentAmount || 0).toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Payment Status</div>
              <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#2e7d32', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '14px' }}></i> Successful
              </div>
            </div>
            {registration.paymentId && (
              <div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Transaction ID</div>
                <div style={{ fontSize: '13.5px', color: '#161439', fontFamily: 'monospace', fontWeight: 600, marginTop: '4px', wordBreak: 'break-all' }}>
                  {registration.paymentId}
                </div>
              </div>
            )}
            {registration.orderId && (
              <div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Gateway Order ID</div>
                <div style={{ fontSize: '13.5px', color: '#161439', fontFamily: 'monospace', fontWeight: 600, marginTop: '4px', wordBreak: 'break-all' }}>
                  {registration.orderId}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official Footnote */}
      <div style={{ fontSize: '13px', color: '#444', lineHeight: '1.6', marginBottom: '22px', padding: '12px 16px', background: '#f4f8f6', borderRadius: '10px', border: '1px solid #dbe7df' }}>
        <i className="fas fa-shield-alt me-2" style={{ color: '#1a3f32' }}></i>
        This official admission slip is digitally verified by Adshaala Admissions Board. A copy has been dispatched to your email address.
      </div>

      {/* Action Buttons Bar: EXACT SAME BUTTON STYLING AS IN NAVBAR (.btn and .btn.btn-border) */}
      <div className="receipt-actions no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="btn btn-border"
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <i className="fas fa-print"></i>
          <span>Print Receipt</span>
        </button>

        <button
          type="button"
          onClick={handleRegisterAnotherClick}
          className="btn"
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <i className="fas fa-user-plus"></i>
          <span>Register Another Student</span>
        </button>

        <Link
          href="/"
          className="btn btn-border"
          style={{
            padding: '12px 22px',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginLeft: 'auto',
          }}
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
      {/* ── PRINT PAGE 1: Official Admission Slip ── */}
      <div className="print-page-1" style={{ padding: '0 0 10px 0' }}>
        {/* Print Header with Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #1a3f32', paddingBottom: '12px', marginBottom: '14px' }}>
          <div>
            <img src="/Adshalaa_Logo.png" alt="Adshaala" style={{ height: '42px', objectFit: 'contain' }} />
            <div style={{ fontSize: '10.5px', color: '#666', marginTop: '3px' }}>
              ISO 9001:2015 Certified · Government & Industry Accredited
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a3f32' }}>ADSHAALA (BY TZAR DIGITAL)</div>
            <div style={{ fontSize: '11.5px', color: '#555' }}>Official Student Admission & Payment Slip</div>
            <div style={{ fontSize: '10.5px', color: '#777', marginTop: '2px' }}>Ref: {registration.paymentId}</div>
          </div>
        </div>

        {/* Verification Banner */}
        <div style={{ background: '#eef6f2', border: '1px solid #1a3f32', borderRadius: '5px', padding: '8px 12px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontSize: '12.5px', color: '#1a3f32' }}>✓ ADMISSION CONFIRMED & VERIFIED</strong>
          <span style={{ fontSize: '11.5px', color: '#333' }}>Date: {registration.registeredAt || '15 Oct 2026'}</span>
        </div>

        {/* Print Section 1: Candidate Details */}
        <div style={{ marginBottom: '14px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: '#f5f5f5', padding: '6px 10px', fontWeight: 700, fontSize: '11.5px', color: '#1a3f32', borderBottom: '1px solid #ddd' }}>
            1. CANDIDATE PROFILE
          </div>
          <table style={{ width: '100%', fontSize: '11.5px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 10px', width: '25%', color: '#666', borderBottom: '1px solid #eee' }}>Candidate Name:</td>
                <td style={{ padding: '6px 10px', width: '25%', fontWeight: 600, borderBottom: '1px solid #eee' }}>{registration.name || '—'}</td>
                <td style={{ padding: '6px 10px', width: '25%', color: '#666', borderBottom: '1px solid #eee' }}>Phone Number:</td>
                <td style={{ padding: '6px 10px', width: '25%', fontWeight: 600, borderBottom: '1px solid #eee' }}>{registration.phone || '—'}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', color: '#666' }}>Email Address:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>{registration.email || '—'}</td>
                <td style={{ padding: '6px 10px', color: '#666' }}>City / Campus:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>{registration.city || 'Mumbai'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Print Section 2: Program Details */}
        <div style={{ marginBottom: '14px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: '#f5f5f5', padding: '6px 10px', fontWeight: 700, fontSize: '11.5px', color: '#1a3f32', borderBottom: '1px solid #ddd' }}>
            2. PROGRAM & ENROLLMENT DETAILS
          </div>
          <table style={{ width: '100%', fontSize: '11.5px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 10px', width: '25%', color: '#666', borderBottom: '1px solid #eee' }}>Selected Course:</td>
                <td style={{ padding: '6px 10px', width: '75%', fontWeight: 600, borderBottom: '1px solid #eee' }} colSpan={3}>
                  {registration.course || '—'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', color: '#666' }}>Batch Schedule:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>{registration.batchSchedule || registration.batch || '—'}</td>
                <td style={{ padding: '6px 10px', color: '#666' }}>Learning Mode:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>{registration.batchMode || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Print Section 3: Fee Ledger */}
        <div style={{ marginBottom: '18px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: '#f5f5f5', padding: '6px 10px', fontWeight: 700, fontSize: '11.5px', color: '#1a3f32', borderBottom: '1px solid #ddd' }}>
            3. PAYMENT & FINANCIAL LEDGER
          </div>
          <table style={{ width: '100%', fontSize: '11.5px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 10px', width: '25%', color: '#666', borderBottom: '1px solid #eee' }}>Amount Paid:</td>
                <td style={{ padding: '6px 10px', width: '25%', fontWeight: 700, color: '#1a3f32', fontSize: '13.5px', borderBottom: '1px solid #eee' }}>
                  ₹{Number(registration.paymentAmount || 0).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '6px 10px', width: '25%', color: '#666', borderBottom: '1px solid #eee' }}>Payment Status:</td>
                <td style={{ padding: '6px 10px', width: '25%', fontWeight: 600, color: '#2e7d32', borderBottom: '1px solid #eee' }}>
                  ✓ Successful
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', color: '#666' }}>Transaction ID:</td>
                <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 600 }}>{registration.paymentId}</td>
                <td style={{ padding: '6px 10px', color: '#666' }}>Gateway Order ID:</td>
                <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 600 }}>{registration.orderId || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verification Signatures */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '16px' }}>
          <div>
            <div style={{ borderTop: '1px solid #333', width: '200px', paddingTop: '4px', fontSize: '11.5px', fontWeight: 600 }}>
              Admissions Verification Seal
            </div>
            <div style={{ fontSize: '10.5px', color: '#666' }}>Digitally Certified Record</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ borderTop: '1px solid #333', width: '200px', paddingTop: '4px', fontSize: '11.5px', fontWeight: 600 }}>
              Authorized Signatory
            </div>
            <div style={{ fontSize: '10.5px', color: '#666' }}>Adshaala Academic Directorate</div>
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '10.5px', color: '#888', borderTop: '1px solid #eee', paddingTop: '6px' }}>
          Page 1 of 2 — Official Student Admission Receipt · www.adshalaa.com · corporate@tzar.co
        </div>
      </div>

      {/* ── PRINT PAGE 2: Guidelines, Support & Accreditations ── */}
      <div className="print-page-2" style={{ padding: '10px 0 0 0' }}>
        {/* Page 2 Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #1a3f32', paddingBottom: '12px', marginBottom: '14px' }}>
          <div>
            <img src="/Adshalaa_Logo.png" alt="Adshaala" style={{ height: '38px', objectFit: 'contain' }} />
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
                <td style={{ padding: '6px 10px', fontWeight: 600, borderBottom: '1px solid #eee' }}>corporate@tzar.co</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', color: '#666', borderBottom: '1px solid #eee' }}>Institute Campus:</td>
                <td style={{ padding: '6px 10px', fontWeight: 600, borderBottom: '1px solid #eee' }}>Mumbai Campus, Maharashtra, India</td>
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
          Page 2 of 2 — Adshaala Institute | ISO 9001:2015 Certified
        </div>
      </div>
    </div>
  );

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
              Recent registration detected. Review your receipt below or register another student.
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
                  href="mailto:corporate@tzar.co"
                  style={{ fontSize: '15px', fontWeight: 600, color: '#1a3f32', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fas fa-envelope" style={{ fontSize: '13px', color: '#ffc224' }}></i>
                  corporate@tzar.co
                </a>
              </div>

              {/* Location */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
                  Institute Campus
                </div>
                <div style={{ fontSize: '14px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-map-marker-alt" style={{ fontSize: '14px', color: '#ffc224' }}></i>
                  Mumbai Campus, Maharashtra
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
