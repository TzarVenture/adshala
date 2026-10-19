'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import MultiStepForm from './MultiStepForm';
import RegistrationSuccess from './RegistrationSuccess';

function RegistrationFormArea() {
  const searchParams = useSearchParams();
  const isForceNew = searchParams.get('new') === 'true';

  const [lastPaymentId, setLastPaymentId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isForceNew) {
      localStorage.removeItem('adshaala_last_payment_id');
      setLastPaymentId(null);
    } else {
      const storedId = localStorage.getItem('adshaala_last_payment_id');
      if (storedId) {
        setLastPaymentId(storedId);
      }
    }
  }, [isForceNew]);

  const handleRegisterAnother = () => {
    localStorage.removeItem('adshaala_last_payment_id');
    setLastPaymentId(null);
  };

  return (
    <section className="registration-area registration-area-compact">
      <div className="container">
        {/* Mobile-only compact top brand strip */}
        <div className="d-lg-none text-center mb-3">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #d2e4db',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#1a3f32',
              fontSize: '12px',
              fontWeight: 600,
              boxShadow: '0 1px 4px rgba(26,63,50,0.04)'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a3f32' }}></span>
            <span>Adshalaa EduTech · Official Student Registration</span>
            <i className="fas fa-shield-alt" style={{ color: '#1a3f32', fontSize: '11px' }}></i>
          </div>
        </div>

        <div className="row align-items-start">

          {/* Left Column: Brand Identity (Shown on Desktop) */}
          <div className="col-lg-5 mb-4 mb-lg-0 pt-lg-2 position-sticky d-none d-lg-block" style={{ top: '90px' }}>
            <div className="registration-brand-info">
              <span className="registration-brand-badge">Adshalaa EduTech</span>
              <h1 className="registration-brand-title">
                Launch Your Professional Career
              </h1>
              <p className="registration-brand-desc">
                Join thousands of students who have transformed their careers with
                our industry-led curriculum, live projects, and 100% placement assistance.
              </p>

              <ul className="registration-brand-features list-wrap mb-4">
                <li><div className="icon">✓</div><span>Practical Agency-Style Learning</span></li>
                <li><div className="icon">✓</div><span>Work on Real Live Projects</span></li>
                <li><div className="icon">✓</div><span>Premium Certifications</span></li>
                <li><div className="icon">✓</div><span>100% Placement Guarantee</span></li>
              </ul>

              {/* Certificate logos */}
              <div className="reg-cert-section">
                <p className="reg-cert-label">Accreditations & Licences</p>
                <div className="reg-cert-grid">
                  {[
                    '/certificate1.png',
                    '/certificate2.png',
                    '/certificate3.png',
                    '/certificate4.png',
                    '/certificate5.png',
                    '/certificate6.png',
                  ].map((src, i) => (
                    <div key={i} className="reg-cert-card">
                      <img src={src} alt={`Certification ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badge only — no partners */}
              <div className="reg-trust-section">
                <div className="reg-trust-badge">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <strong>100% Secure & Encrypted</strong>
                    <span>Your personal data is safe with us</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Form OR Verified Receipt */}
          <div className="col-lg-7 col-12">
            {isMounted && lastPaymentId ? (
              <RegistrationSuccess
                embeddedPaymentId={lastPaymentId}
                onRegisterAnother={handleRegisterAnother}
                isEmbedded={true}
              />
            ) : (
              <MultiStepForm />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default function StudentRegistration() {
  return (
    <>
      <HeaderOne />
      <main className="main-area fix" style={{ backgroundColor: '#f4f8f6' }}>
        <div className="container">
          <nav className="breadcrumb" style={{ margin: 0, padding: '20px 0', background: 'transparent' }}>
            <span property="itemListElement">
              <a href="/">Home</a>
            </span>
            <span className="breadcrumb-separator" style={{ margin: '0 10px' }}>
              <i className="fas fa-angle-right"></i>
            </span>
            <span property="itemListElement">Registration</span>
          </nav>
        </div>

        <Suspense fallback={
          <div className="container pb-120 text-center" style={{ padding: '60px 0' }}>
            <div style={{ color: '#666' }}>Loading registration...</div>
          </div>
        }>
          <RegistrationFormArea />
        </Suspense>
      </main>
      <FooterOne />
    </>
  );
}
