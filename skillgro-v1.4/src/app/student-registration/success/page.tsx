import { Suspense } from 'react';
import type { Metadata } from 'next';
import Wrapper from '@/layouts/Wrapper';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import RegistrationSuccess from '@/components/student-registration/RegistrationSuccess';

export const metadata: Metadata = {
  title: 'Registration Confirmation | Adshaala Digital Marketing Institute',
  description: 'Your registration confirmation and payment receipt for Adshaala professional programs.',
};

export default function RegistrationSuccessPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main className="main-area fix" style={{ backgroundColor: '#f4f8f6', minHeight: '80vh' }}>
        <div className="container">
          <nav className="breadcrumb" style={{ margin: 0, padding: '20px 0', background: 'transparent' }}>
            <span property="itemListElement">
              <a href="/">Home</a>
            </span>
            <span className="breadcrumb-separator" style={{ margin: '0 10px' }}>
              <i className="fas fa-angle-right"></i>
            </span>
            <span property="itemListElement">
              <a href="/student-registration">Registration</a>
            </span>
            <span className="breadcrumb-separator" style={{ margin: '0 10px' }}>
              <i className="fas fa-angle-right"></i>
            </span>
            <span property="itemListElement">Confirmation</span>
          </nav>
        </div>

        <Suspense fallback={
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
            Loading your registration details...
          </div>
        }>
          <RegistrationSuccess />
        </Suspense>
      </main>
      <FooterOne />
    </Wrapper>
  );
}
