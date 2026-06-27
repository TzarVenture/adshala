import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoPopup from "@/modals/VideoPopup";

import icon_1 from "@/assets/img/icons/lock.svg";
import { truncate } from "fs/promises";

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
    title: "Google Ads",
    show: "show",
    faq_details: [
      {
        class_name: "open-item",
        lock: true,
        title: "Search Ads",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Display Ads",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Shopping Ads",
        duration: "10:48",
      },
      {
        lock: true,
        title: "YouTube Ads",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Keyword Planning & Bidding Strategies",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Campaign Budgeting & Optimization",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Conversion Tracking",
        duration: "10:48",
      },
    ],
  },
  {
    id: 2,
    title: "Social Media Marketing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Facebook Marketing",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Instagram Marketing",
        duration: "07:48",
      },
      {
        lock: true,
        title: "LinkedIn Marketing",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Content Planning & Scheduling",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Paid Social Campaigns",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Audience Targeting",
        duration: "10:48",
      },
    ],
  },
  {
    id: 3,
    title: "20+ AI Automation Tools",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "AI Content Writing Tools",
        duration: "03:03",
      },
      {
        lock: true,
        title: "AI Image & Design Tools",
        duration: "07:48",
      },
      {
        lock: true,
        title: "AI Video Creation Tools",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Chatbots & Workflow Automation",
        duration: "10:48",
      },
      {
        lock: true,
        title: "AI for SEO & Analytics",
        duration: "10:48",
      },
      {
        lock: true,
        title: "AI Video Creation Tools",
        duration: "10:48",
      },
    ],
  },
  {
    id: 4,
    title: "Canva",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Social Media Post Design",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Ad Creatives & Banners",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Brand Kits & Templates",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Reel & Video Editing",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Presentation Design",
        duration: "10:48",
      },
    ],
  },
  {
    id: 5,
    title: "Search Engine Optimisation (SEO)",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "On-Page Optimization",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Off-Page Optimization & Link Building",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Technical SEO",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Keyword Research",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Local SEO",
        duration: "10:48",
      },
      {
        lock: true,
        title: "SEO Audits & Reporting",
        duration: "10:48",
      },
    ],
  },
  {
    id: 6,
    title: "Google Analytics",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Setting Up GA4",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Traffic & Audience Analysis",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Goal & Conversion Tracking",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Behavior Flow Analysis",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Reports & Dashboards",
        duration: "10:48",
      },
    ],
  },
  {
    id: 7,
    title: "Content Marketing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Content Strategy & Planning",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Blog & Article Writing",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Content Calendars",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Storytelling for Brands",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Content Distribution",
        duration: "10:48",
      },
    ],
  },
  {
    id: 8,
    title: "WhatsApp Marketing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "WhatsApp Business Setup",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Broadcast Campaigns",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Automation & Chatbots",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Catalog Creation",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Customer Engagement",
        duration: "10:48",
      },
    ],
  },
  {
    id: 9,
    title: "Email Marketing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Email Campaign Design",
        duration: "03:03",
      },
      {
        lock: true,
        title: "List Building & Segmentation",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Automation & Drip Sequences",
        duration: "10:48",
      },
      {
        lock: true,
        title: "A/B Testing",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Performance Tracking",
        duration: "10:48",
      },
    ],
  },
  {
    id: 10,
    title: "Online Reputation Management (ORM)",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Brand Monitoring",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Review Management",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Crisis Management",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Sentiment Analysis",
        duration: "10:48",
      },
      {
        lock: true,
        title: "ORM Tools",
        duration: "10:48",
      },
    ],
  },
  {
    id: 11,
    title: "Influencer Marketing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Influencer Identification",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Outreach & Negotiation",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Campaign Planning",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Performance Measurement",
        duration: "10:48",
      },
    ],
  },
  {
    id: 12,
    title: "Affiliate Marketing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Affiliate Program Setup",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Partner Management",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Commission Structures",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Performance Tracking",
        duration: "10:48",
      },
    ],
  },
  {
    id: 13,
    title: "Marketplace Management",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Seller Account Setup (Amazon/Flipkart/Myntra)",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Listing Optimization",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Marketplace Ads",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Inventory & Order Management",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Ratings & Reviews Management",
        duration: "10:48",
      },
    ],
  },
  {
    id: 14,
    title: "Brand Management",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Brand Positioning",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Brand Identity Development",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Brand Voice & Messaging",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Brand Consistency Across Channels",
        duration: "10:48",
      },
    ],
  },
  {
    id: 15,
    title: "Programmatic Advertising",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Automated Ad Buying",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Audience Targeting",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Real-Time Bidding (RTB)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "DSPs & Ad Exchanges",
        duration: "10:48",
      },
    ],
  },
  {
    id: 16,
    title: "Landing Page Techniques",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Landing Page Design Principles",
        duration: "03:03",
      },
      {
        lock: true,
        title: "A/B Testing",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Conversion Rate Optimization (CRO)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Lead Capture Forms",
        duration: "10:48",
      },
    ],
  },
  {
    id: 17,
    title: "Social Media Optimisation (SMO)",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Profile Optimization",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Organic Growth Strategies",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Engagement Techniques",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Hashtag Strategy",
        duration: "10:48",
      },
    ],
  },
];

const Curriculum = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="courses__curriculum-wrap">
        <h3 className="title">Course Curriculum</h3>
        <p>
          Master SEO, social media, performance marketing, AI tools, automation,
          content creation, analytics and campaign strategies through practical
          projects designed to build industry-ready digital marketing expertise.
        </p>
        <div className="accordion" id="accordionExample">
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
      <VideoPopup
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="b2Az7_lLh3g"
      />
    </>
  );
};

export default Curriculum;
