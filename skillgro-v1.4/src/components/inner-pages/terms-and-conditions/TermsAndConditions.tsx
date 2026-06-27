"use client";

const sections = [
  {
    id: "01",
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing our website <a href="https://www.adshalaa.com">www.adshalaa.com</a> or
        enrolling in any course or program offered by Adshalaa, you agree to be bound by these
        Terms and Conditions. If you do not agree with any part of these terms, please do not
        use our services. These terms apply to all students, visitors, and users of Adshalaa's
        website and services.
      </p>
    ),
  },
  {
    id: "02",
    title: "About Adshalaa",
    content: (
      <p>
        Adshalaa is a skill-development and vocational training institute offering certification
        programs in Digital Marketing, Graphic Design, Web Development and related disciplines.
        Our programs combine classroom training with paid internship experience and placement support.
      </p>
    ),
  },
  {
    id: "03",
    title: "Eligibility",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>To enroll in any Adshalaa program, you must:</p>
        <ul style={{ marginLeft: "20px" }}>
          <li>Be at least 16 years of age</li>
          <li>
            Have a minimum educational qualification of 10+2 (any stream), unless specified
            otherwise for a particular course
          </li>
          <li>Provide accurate and complete information during the enrollment process</li>
        </ul>
      </div>
    ),
  },
  {
    id: "04",
    title: "Enrollment & Admission",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>
          Enrollment is confirmed only upon receipt of the required fees and completion of the
          admission process.
        </li>
        <li>
          Adshalaa reserves the right to refuse admission to any applicant at its sole discretion.
        </li>
        <li>
          Course batches are subject to seat availability. Adshalaa will inform you of your batch
          dates upon confirmation of enrollment.
        </li>
        <li>
          All enrollment details, including course start dates, batch timings and mode of learning,
          will be communicated at the time of admission.
        </li>
      </ul>
    ),
  },
  {
    id: "05",
    title: "Fees & Payment",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>
          All course fees must be paid as per the payment schedule agreed upon at the time of
          enrollment.
        </li>
        <li>
          Fees can be paid in installments where applicable. Failure to pay installments on time
          may result in suspension from the program.
        </li>
        <li>
          All fees are quoted in Indian Rupees (INR) and are inclusive of applicable taxes unless
          stated otherwise.
        </li>
        <li>
          Adshalaa reserves the right to revise fee structures for new batches without prior notice.
        </li>
      </ul>
    ),
  },
  {
    id: "06",
    title: "Refund Policy",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>
          Fees once paid are non-refundable, except if the course is cancelled by Adshalaa before
          commencement.
        </li>
        <li>
          In exceptional circumstances, refund requests will be reviewed on a case-by-case basis at
          the discretion of Adshalaa management.
        </li>
      </ul>
    ),
  },
  {
    id: "07",
    title: "Course Content & Curriculum",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>
          Adshalaa reserves the right to modify, update or restructure course content, curriculum,
          tools and software covered in any program at any time to keep it industry-relevant.
        </li>
        <li>
          Guest sessions, workshops and bonus content are subject to availability and are not
          guaranteed as part of the curriculum.
        </li>
        <li>
          Course materials provided are for personal learning use only and may not be reproduced,
          shared or distributed without written permission from Adshalaa.
        </li>
      </ul>
    ),
  },
  {
    id: "08",
    title: "Attendance & Participation",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>
          Students are expected to maintain a minimum attendance of 75% to be eligible for
          certification and placement assistance.
        </li>
        <li>
          Students who miss classes are responsible for covering missed content through available
          backup resources.
        </li>
        <li>
          Consistent absenteeism without prior notice may result in suspension or cancellation of
          enrollment without a refund.
        </li>
      </ul>
    ),
  },
  {
    id: "09",
    title: "Internship",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>The 1-month paid internship is a mandatory component of all certification programs.</li>
        <li>
          Internship opportunities are facilitated by Adshalaa but are subject to availability and
          student performance during training.
        </li>
        <li>
          Adshalaa does not guarantee a specific internship role, stipend amount or company. Details
          will vary based on placement partners and batch performance.
        </li>
        <li>
          Students who do not meet attendance, performance or conduct requirements may be ineligible
          for the internship.
        </li>
      </ul>
    ),
  },
  {
    id: "10",
    title: "Placement Assistance",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>Adshalaa offers 100% placement assistance to all eligible certified students.</li>
        <li>
          Placement assistance includes resume building, interview preparation and referrals to
          hiring partners.
        </li>
        <li>
          Placement assistance does not constitute a guarantee of employment. Job offers are at the
          sole discretion of the hiring companies.
        </li>
        <li>
          Students must actively participate in the placement process, attend scheduled interviews
          and maintain professional conduct to remain eligible for placement support.
        </li>
        <li>Adshalaa's placement support is available for up to 6 months post-certification.</li>
      </ul>
    ),
  },
  {
    id: "11",
    title: "Certification",
    content: (
      <ul style={{ marginLeft: "20px" }}>
        <li>
          A certificate of completion will be issued to students who successfully complete all
          course modules, maintain required attendance and clear any assessments or projects.
        </li>
        <li>
          Certificates remain the property of Adshalaa and may be revoked in cases of misconduct,
          plagiarism or violation of these terms.
        </li>
        <li>
          Adshalaa does not represent that its certifications are equivalent to government-recognized
          academic degrees or diplomas.
        </li>
      </ul>
    ),
  },
  {
    id: "12",
    title: "Code of Conduct",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>
          All students and users of Adshalaa's services are expected to:
        </p>
        <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
          <li>Treat instructors, staff and fellow students with respect</li>
          <li>Refrain from any form of harassment, discrimination or disruptive behavior</li>
          <li>Submit original work and not engage in plagiarism or cheating</li>
          <li>
            Not record, reproduce or distribute any course content without written permission
          </li>
          <li>Use Adshalaa's facilities, tools and resources responsibly</li>
        </ul>
        <p>
          Violation of the code of conduct may result in immediate suspension or termination from
          the program without a refund.
        </p>
      </div>
    ),
  },
  {
    id: "13",
    title: "Intellectual Property",
    content: (
      <p>
        All content on our website and within our courses — including text, videos, graphics,
        curriculum, logos and materials — is the intellectual property of Adshalaa and is protected
        under applicable copyright and trademark laws. Unauthorized use, reproduction or
        distribution is strictly prohibited.
      </p>
    ),
  },
  {
    id: "14",
    title: "Limitation of Liability",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>Adshalaa shall not be liable for:</p>
        <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
          <li>
            Any indirect, incidental or consequential damages arising from the use of our services
          </li>
          <li>
            Loss of employment opportunities or earnings resulting from course completion or
            non-completion
          </li>
          <li>
            Delays or interruptions in course delivery due to circumstances beyond our control
            (force majeure, technical failures, etc.)
          </li>
          <li>
            The accuracy or completeness of information provided by third-party hiring partners
          </li>
        </ul>
        <p>
          Our total liability, in any case, shall not exceed the total fees paid by the student for
          the relevant course.
        </p>
      </div>
    ),
  },
  {
    id: "15",
    title: "Privacy",
    content: (
      <p>
        Your use of Adshalaa's services is also governed by our Privacy Policy, which is
        incorporated into these Terms by reference. Please review our{" "}
        <a href="/privacy-policy">Privacy Policy</a> to understand our data practices.
      </p>
    ),
  },
  {
    id: "16",
    title: "Amendments",
    content: (
      <p>
        Adshalaa reserves the right to amend these Terms and Conditions at any time. Updated terms
        will be posted on our website. Continued use of our services following any changes
        constitutes your acceptance of the revised terms.
      </p>
    ),
  },
  {
    id: "17",
    title: "Governing Law & Dispute Resolution",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>
          These Terms shall be governed by and construed in accordance with the laws of India. Any
          disputes arising out of or in connection with these Terms shall be subject to the exclusive
          jurisdiction of the courts in Mumbai, Maharashtra.
        </p>
        <p>
          In the event of a dispute, both parties agree to first attempt resolution through
          good-faith negotiation before pursuing legal action.
        </p>
      </div>
    ),
  },
  {
    id: "18",
    title: "Contact Us",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>
          For any questions or concerns regarding these Terms and Conditions, please contact:
        </p>
        <ul style={{ marginLeft: "20px" }}>
          <li>
            <strong>Address:</strong> Saki Vihar, Andheri East, Mumbai – 400072
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:abc@adshalaa.com">hello@adshalaa.com</a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+918652199991">+91 8652199991</a> /{" "}
            <a href="tel:+917760775875">+91 7760775875</a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a href="https://www.adshalaa.com">www.adshalaa.com</a>
          </li>
        </ul>
      </div>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <section className="terms-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="terms-content">
              {sections.map((section) => (
                <div key={section.id} className="policy-section mb-40">
                  <div className="section-header mb-20">
                    <span className="section-number">{section.id}</span>
                    <h3 className="title">{section.title}</h3>
                  </div>
                  <div className="section-content">{section.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .terms-area {
          background-color: #fff;
        }

        .terms-content {
          padding: 20px 0;
        }

        .policy-section {
          padding: 30px;
          background-color: #f9f9f9;
          border-radius: 8px;
          border-left: 4px solid #1a3f32;
          transition: all 0.3s ease;
        }

        .policy-section:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .section-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 20px;
        }

        .section-number {
          display: inline-block;
          min-width: 45px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          background-color: #1a3f32;
          color: white;
          border-radius: 50%;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .policy-section .title {
          font-size: 22px;
          font-weight: 600;
          color: #212245;
          margin: 0;
        }

        .section-content {
          padding-left: 65px;
          color: #666;
          line-height: 1.8;
        }

        .section-content p {
          margin-bottom: 15px;
        }

        .section-content ul {
          list-style: none;
          padding: 0;
        }

        .section-content ul li {
          padding-left: 25px;
          margin-bottom: 12px;
          position: relative;
        }

        .section-content ul li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #1e6b9c;
          font-weight: bold;
        }

        .contact-item a {
          color: #1e6b9c;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-item a:hover {
          color: #0d3a52;
          text-decoration: underline;
        }

        .section-content a {
          color: #1e6b9c;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .section-content a:hover {
          color: #0d3a52;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
          }

          .section-content {
            padding-left: 0;
          }

          .policy-section {
            padding: 20px;
          }

          .policy-section .title {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}