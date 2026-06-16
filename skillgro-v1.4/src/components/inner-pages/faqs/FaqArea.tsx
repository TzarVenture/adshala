"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoPopup from "@/modals/VideoPopup";

import icon_1 from "@/assets/img/icons/lock.svg";
import { truncate } from "fs/promises";
import "./faqs.css";

interface DataType {
  id: number;
  title: string;
  show?: string;
  collapsed?: string;
  faq_details: {
    class_name?: string;
    lock: boolean;
    title: string;
    duration: string;
  }[];
}
[];

const faq_data: DataType[] = [
  {
    id: 1,
    title: "What mode of learning does Adshala offer?",
    show: "show",
    faq_details: [
      {
        class_name: "open-item",
        lock: true,
        title:
          "Our programs are offered in offline mode with in-person, mentor-led sessions.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 2,
    title: "What courses does Adshala offer?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "We currently offer certification programs in Digital Marketing, Graphic Designing and Web Development, along with specialized courses in SEO, Social Media Management, Marketplace and Instagram Mastery.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 3,
    title: "How long are the courses?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Each certification program is 3 months of training followed by 1 month of paid internship hence 4 months total.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 4,
    title: "Are the courses beginner-friendly?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Yes. No prior experience is required. Our programs are designed to take you from the basics to an industry-ready level.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 5,
    title: "Will I get hands-on experience?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Absolutely. Every course includes live projects, real campaigns or design briefs and a paid internship so you apply what you learn in a real work environment.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 6,
    title: "What tools and software will I learn?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Depending on your course, you'll work with tools like Google Ads, Canva, Adobe Photoshop, Illustrator, Figma, Premiere Pro, After Effects, AI tools and more.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 7,
    title: "Will I receive a certificate after completing the course?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Yes. Upon successfully completing your course, you will receive an industry-recognized certification from Adshala.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 8,
    title: "Is the Adshala certificate recognized by employers?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Yes. Our certifications are designed to be portfolio-backed and skills-verified, making them credible to employers in the industry.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 9,
    title: "What is the paid internship included in the course?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "After completing 3 months of training, every student gets a 1-month paid internship where you work on real projects with actual clients or in a live agency/company environment.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 10,
    title: "Is the internship mandatory?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Yes. The internship is an integral part of the program and is required for certification completion and placement support.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 11,
    title: "Does Adshala offer placement assistance?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Yes. We provide 100% placement assistance to all certified students, including resume building, interview preparation, and direct connections with our hiring partners.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 12,
    title: "How soon will I get placed after completing the course?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "We begin placement preparation during the internship phase itself. Most students receive interview calls within 30–60 days of completing the program.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 13,
    title: "What kind of jobs can I get after completing a course?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Depending on your program, you can apply for roles such as Digital Marketing Executive, SEO Analyst, Social Media Manager, Graphic Designer, UI/UX Designer, Web Developer and more.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 14,
    title: "How do I enroll in a course?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "You can enroll by visiting our institute, calling us or filling out the inquiry form on our website. Our counselors will guide you through the admission process.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 15,
    title: "Are there any installment options available for fees?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Yes. We offer flexible fee payment options. Please contact us for details.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 16,
    title: "Is there an entrance test or eligibility criteria?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "No entrance test is required. The minimum eligibility is 10+2 (any stream). Graduates and working professionals are also welcome.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 17,
    title: "Will I get mentor support during the course?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "Yes. You'll have access to dedicated mentor support throughout your training for doubt-clearing, project feedback and career guidance.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 18,
    title: "What if I miss a class?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "We provide backup sessions and recorded content to ensure you don't fall behind.",
        duration: "03:03",
      },
    ],
  },
  {
    id: 19,
    title: "How can I contact Adshala?",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title:
          "You can reach us at +91 8652199991, hello@adshalaa.com, or visit us at B, Ground Floor, Andheri E, Saki Vihar Rd, behind Finch Restaurant, Ganesh Nagar, Marol, Andheri East, Mumbai, Maharashtra 400072. You can also fill out the contact form on our website.",
        duration: "03:03",
      },
    ],
  },
];

const FaqArea = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="faq-container">
      <div className="faq-inner-div">
        <div className="courses__curriculum-wrap faq-inner-container">
          <h3 className="title faq-title">Frequently asked questions</h3>
          {/* <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p> */}
          <div
            className="accordion faq-accordian-container"
            id="accordionExample"
          >
            {faq_data.map((item) => (
              <div key={item.id} className="accordion-item">
                <h2 className="accordion-header" id={`headingOne${item.id}`}>
                  <button
                    className={`accordion-button ${item.collapsed}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne${item.id}`}
                    aria-expanded="true"
                    aria-controls={`collapseOne${item.id}`}
                  >
                    {item.title}
                  </button>
                </h2>
                <div
                  id={`collapseOne${item.id}`}
                  className={`accordion-collapse collapse ${item.show}`}
                  aria-labelledby={`headingOne${item.id}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul className="list-wrap">
                      {item.faq_details.map((list, i) => (
                        <React.Fragment key={i}>
                          {list.lock ? (
                            <li className="course-item">
                              <Link href="#" className="course-item-link">
                                <span className="item-name">{list.title}</span>
                              </Link>
                            </li>
                          ) : (
                            <li className="course-item open-item">
                              <a
                                onClick={() => setIsVideoOpen(true)}
                                style={{ cursor: "pointer" }}
                                className="course-item-link popup-video"
                              >
                                <span className="item-name">
                                  Course Installation
                                </span>
                                <div className="course-item-meta">
                                  <span className="item-meta duration">
                                    03:03
                                  </span>
                                </div>
                              </a>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-div">
          <div className="right-inner-div">
            <h2>Do you have more quesitons?</h2>
            <p> Our team is here to help. Get in touch with us on WhatsApp</p>
            <button
              onClick={() =>
                window.open("https://wa.me/971501234567", "_blank")
              }
            >
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqArea;
