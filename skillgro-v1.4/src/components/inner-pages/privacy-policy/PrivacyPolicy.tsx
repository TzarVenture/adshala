"use client";

const sections = [
  {
    id: "01",
    title: "Introduction",
    content: (
      <p>
        Welcome to <strong>Adshalaa</strong> ("we," "our," or "us"). We are
        committed to protecting your personal information and your right to
        privacy. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our website{" "}
        <a href="https://www.adshalaa.com">www.adshalaa.com</a> or enroll in any
        of our certification programs. Please read this policy carefully. If you
        disagree with its terms, please discontinue use of our website and
        services.
      </p>
    ),
  },
  {
    id: "02",
    title: "Information We Collect",
    content: (
      <div>
        <p>
          We collect information that you voluntarily provide to us when you
          register or enroll in a course, fill out an inquiry or contact form,
          subscribe to our newsletter or updates, participate in our placement or
          internship programs, or contact us via phone, email, or WhatsApp.
        </p>
        <div style={{ marginTop: "15px" }}>
          <p style={{ marginBottom: "10px", fontWeight: "600" }}>
            Personal information we collect:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Date of birth</li>
            <li>Educational qualifications</li>
            <li>Address and location details</li>
            <li>Payment information (processed securely through third-party gateways)</li>
            <li>Resume and career details (for placement assistance)</li>
          </ul>
        </div>
        <div>
          <p style={{ marginBottom: "10px", fontWeight: "600" }}>
            Information collected automatically:
          </p>
          <ul style={{ marginLeft: "20px" }}>
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on our website</li>
            <li>Device information and operating system</li>
            <li>Referring URLs and cookies data</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "03",
    title: "How We Use Your Information",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>
          We use the information we collect for the following purposes:
        </p>
        <ul style={{ marginLeft: "20px" }}>
          <li>To process course enrollments and manage your account</li>
          <li>To communicate about your course, schedule, and progress</li>
          <li>To provide placement assistance and connect you with hiring partners</li>
          <li>To send updates about new courses, offers, and events</li>
          <li>To respond to your queries and provide customer support</li>
          <li>To improve our website, courses, and services</li>
          <li>To comply with legal obligations and protect our rights</li>
          <li>To process payments and issue certifications</li>
        </ul>
      </div>
    ),
  },
  {
    id: "04",
    title: "Sharing Your Information",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your information with:
        </p>
        <ul style={{ marginLeft: "20px" }}>
          <li>
            <strong>Hiring Partners:</strong> With your consent, we share your
            resume and profile with our recruitment and placement partners to
            help you secure employment.
          </li>
          <li>
            <strong>Service Providers:</strong> Trusted third-party vendors who
            assist us in operating our website, processing payments, and
            delivering communications.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by law, court
            order, or governmental authority.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger,
            acquisition, or sale of assets, your information may be transferred
            to the new entity.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "05",
    title: "Cookies & Tracking Technologies",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience. Cookies help us:
        </p>
        <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
          <li>Remember your preferences and settings</li>
          <li>Analyze website traffic and usage patterns</li>
          <li>Deliver relevant content and advertisements</li>
        </ul>
        <p>
          You can control cookie settings through your browser. Disabling
          cookies may affect the functionality of certain parts of our website.
        </p>
      </div>
    ),
  },
  {
    id: "06",
    title: "Data Security",
    content: (
      <p>
        We implement industry-standard security measures including encryption,
        secure servers, and access controls to protect your personal information.
        However, no method of transmission over the internet is 100% secure, and
        we cannot guarantee absolute security. We encourage you to use a strong
        password and not share your account credentials with anyone.
      </p>
    ),
  },
  {
    id: "07",
    title: "Data Retention",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>
          We retain your personal information for as long as necessary to:
        </p>
        <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
          <li>Maintain your enrollment and certification records</li>
          <li>Provide ongoing placement and alumni support</li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>
        <p>
          You may request deletion of your data at any time by contacting us
          (subject to legal retention requirements).
        </p>
      </div>
    ),
  },
  {
    id: "08",
    title: "Your Rights",
    content: (
      <div>
        <p style={{ marginBottom: "15px" }}>You have the right to:</p>
        <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete data</li>
          <li>Request deletion of your personal data</li>
          <li>Withdraw consent for marketing communications at any time</li>
          <li>Lodge a complaint with the relevant data protection authority</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:abc@adshalaa.com">abc@adshalaa.com</a>.
        </p>
      </div>
    ),
  },
  {
    id: "09",
    title: "Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices of those sites and encourage you to
        read their privacy policies before submitting any personal information.
      </p>
    ),
  },
  {
    id: "10",
    title: "Children's Privacy",
    content: (
      <p>
        Our services are not directed at individuals under the age of 16. We do
        not knowingly collect personal information from children. If we become
        aware that a child has provided us with personal data, we will delete it
        promptly.
      </p>
    ),
  },
  {
    id: "11",
    title: "Changes to This Policy",
    content: (
      <p>
        We reserve the right to update this Privacy Policy at any time. Changes
        will be posted on this page with an updated effective date. Continued use
        of our services after any changes constitutes your acceptance of the
        updated policy.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="privacy-policy-area section-py-120">
      <div className="container">
        {/* <div className="row">
          <div className="col-lg-12">
            <div className="section__title text-center mb-50">
              <h2 className="title mb-20">Privacy Policy</h2>
              <p className="desc mb-10">
                <strong>Effective Date: June 2026</strong>
              </p>
              <p className="desc">
                Your privacy matters to us. This policy explains what data we
                collect, why we collect it, and how it is used and protected at
                Adshalaa.
              </p>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-lg-12">
            <div className="privacy-policy-content">
              {sections.map((section) => (
                <div key={section.id} className="policy-section mb-40">
                  <div className="section-header mb-20">
                    <span className="section-number">{section.id}</span>
                    <h3 className="title">{section.title}</h3>
                  </div>
                  <div className="section-content">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="row mt-40">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="contact-info-box" style={{ backgroundColor: "#f8f9fa", padding: "40px", borderRadius: "8px", border: "1px solid #e8e8e8" }}>
              <h3 className="title mb-20">Have Questions?</h3>
              <div className="row">
                <div className="col-md-6 mb-30">
                  <div className="contact-item">
                    <h4 style={{ marginBottom: "10px", fontWeight: "600" }}>Email</h4>
                    <a href="mailto:hello@adshalaa.com">hello@adshalaa.com</a>
                  </div>
                </div>
                <div className="col-md-6 mb-30">
                  <div className="contact-item">
                    <h4 style={{ marginBottom: "10px", fontWeight: "600" }}>Phone</h4>
                    <a href="tel:+918652199991">+91 8652199991</a>{", "}
                    {/* <br /> */}
                    <a href="tel:+917760775875">+91 7760775875</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .privacy-policy-area {
          background-color: #fff;
        }

        .privacy-policy-content {
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