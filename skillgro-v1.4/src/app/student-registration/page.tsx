import type { Metadata } from 'next';
import Wrapper from '@/layouts/Wrapper';
import StudentRegistration from '@/components/student-registration';

export const metadata: Metadata = {
  title: 'Student Registration | Adshaala Digital Marketing Institute',
  description: 'Register for Adshaala\'s professional digital marketing courses. Fill out the application form to begin your career journey with 100% placement assistance.',
};

export default function RegistrationPage() {
  return (
    <Wrapper>
      <StudentRegistration />
    </Wrapper>
  );
}
