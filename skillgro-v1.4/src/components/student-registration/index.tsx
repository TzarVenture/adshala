'use client';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import MultiStepForm from './MultiStepForm';

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

        <section className="registration-area pb-120">
          <div className="container">
            <div className="row align-items-start">
              
              {/* Left Column: Brand Identity */}
              <div className="col-lg-5 mb-5 mb-lg-0 pt-lg-5 position-sticky" style={{ top: '100px' }}>
                <div className="registration-brand-info">
                  <span className="registration-brand-badge">Adshaala Institute</span>
                  <h1 className="registration-brand-title">
                    Start Your Digital Marketing Journey
                  </h1>
                  <p className="registration-brand-desc">
                    Join 5,000+ students who have transformed their careers with our 
                    industry-led curriculum and 100% placement assistance.
                  </p>

                  <ul className="registration-brand-features list-wrap">
                    <li>
                      <div className="icon">✓</div>
                      <span>Practical Agency-Style Learning</span>
                    </li>
                    <li>
                      <div className="icon">✓</div>
                      <span>Work on Real Live Projects</span>
                    </li>
                    <li>
                      <div className="icon">✓</div>
                      <span>10+ Premium Certifications</span>
                    </li>
                    <li>
                      <div className="icon">✓</div>
                      <span>100% Placement Guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Multi-Step Form */}
              <div className="col-lg-7">
                <MultiStepForm />
              </div>

            </div>
          </div>
        </section>
      </main>
      <FooterOne />
    </>
  );
}
