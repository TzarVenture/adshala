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
    title: "Introduction to SEO",
    show: "show",
    faq_details: [
      {
        class_name: "open-item",
        lock: true,
        title: "What is SEO & How Search Engines Work",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Google Algorithm Overview",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Types of SEO (On-Page, Off-Page, Technical, Local)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "SEO vs Paid Advertising",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Career Opportunities in SEO",
        duration: "10:48",
      },
    ],
  },
  {
    id: 2,
    title: "Keyword Research",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Understanding Search Intent",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Short-tail vs Long-tail Keywords",
        duration: "07:48",
      },
      {
        lock: true,
        title:
          "Keyword Research Tools (Google Keyword Planner, Ubersuggest, Ahrefs, SEMrush)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Competitor Keyword Analysis",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Keyword Mapping & Prioritization",
        duration: "10:48",
      },
    ],
  },
  {
    id: 3,
    title: "On-Page SEO",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Title Tags, Meta Descriptions & Header Tags",
        duration: "03:03",
      },
      {
        lock: true,
        title: "URL Structure & Internal Linking",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Image Optimization & Alt Text",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Keyword Placement & Density",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Content Optimization Best Practices",
        duration: "10:48",
      },
    ],
  },
  {
    id: 4,
    title: "Technical SEO",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Website Crawlability & Indexability",
        duration: "03:03",
      },
      {
        lock: true,
        title: "XML Sitemaps & Robots.txt",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Site Speed & Core Web Vitals",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Mobile-Friendliness & Responsive Design",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Structured Data & Schema Markup",
        duration: "10:48",
      },
    ],
  },
  {
    id: 5,
    title: "Off-Page SEO & Link Building",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "What are Backlinks & Why They Matter",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Types of Backlinks (DoFollow, NoFollow)",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Link Building Strategies (Guest Posting, Outreach, PR)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Anchor Text Optimization",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Toxic Link Identification & Disavow",
        duration: "10:48",
      },
    ],
  },

  {
    id: 6,
    title: "Content Marketing for SEO",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Writing SEO-Optimized Blog Posts & Articles",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Content Clusters & Pillar Pages",
        duration: "07:48",
      },
      {
        lock: true,
        title: "E-E-A-T (Experience, Expertise, Authority, Trust)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Content Gap Analysis",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Updating & Refreshing Old Content",
        duration: "10:48",
      },
    ],
  },
  {
    id: 7,
    title: "Local SEO",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Google Business Profile Setup & Optimization",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Local Keyword Targeting",
        duration: "07:48",
      },
      {
        lock: true,
        title:
          "NAP Consistency (Name, Address, Phone)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Local Citations & Directory Listings",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Managing Local Reviews & Ratings",
        duration: "10:48",
      },
    ],
  },
  {
    id: 8,
    title: "Google Search Console",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Setting Up & Verifying a Website",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Indexing & Coverage Reports",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Search Performance & Click Data",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Manual Actions & Security Issues",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Submitting Sitemaps & URL Inspection",
        duration: "10:48",
      },
    ],
  },
  {
    id: 9,
    title: "Google Analytics (GA4)",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Setting Up GA4 for SEO Tracking",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Organic Traffic Analysis",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Bounce Rate, Session & Engagement Metrics",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Conversion Tracking from Organic Search",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Custom Reports & Dashboards",
        duration: "10:48",
      },
    ],
  },
  {
    id: 10,
    title: "SEO Tools & Software",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Ahrefs – Backlink & Keyword Analysis",
        duration: "03:03",
      },
      {
        lock: true,
        title: "SEMrush – Competitor & Site Audit",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Screaming Frog – Technical SEO Crawls",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Moz – Domain Authority & Link Research",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Ubersuggest & Google Search Console",
        duration: "10:48",
      },
    ],
  },
  {
    id: 11,
    title: "SEO Audits",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Full Website SEO Audit Process",
        duration: "03:03",
      },
      {
        lock: true,
        title: "On-Page & Technical Audit Checklist",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Competitor Audit & Gap Analysis",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Audit Reporting & Recommendations",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Fixing & Prioritizing Audit Issues",
        duration: "10:48",
      },
    ],
  },
  {
    id: 12,
    title: "E-commerce SEO",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Optimizing Product Pages & Category Pages",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Schema Markup for Products",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Handling Duplicate Content in E-commerce",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Marketplace SEO (Amazon, Flipkart)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "E-commerce Keyword Strategy",
        duration: "10:48",
      },
    ],
  },
{
  id: 13,
  title: "YouTube SEO",
  collapsed: "collapsed",
  faq_details: [
    {
      lock: true,
      title: "Optimizing Video Titles, Descriptions & Tags",
      duration: "03:03",
    },
    {
      lock: true,
      title: "YouTube Keyword Research",
      duration: "07:48",
    },
    {
      lock: true,
      title: "Thumbnails & Engagement Signals",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Ranking on YouTube & Google Search",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Channel Growth Through SEO",
      duration: "10:48",
    },
  ],
},
  {
  id: 14,
  title: "AI Tools for SEO",
  collapsed: "collapsed",
  faq_details: [
    {
      lock: true,
      title: "AI for Keyword Research & Content Briefs",
      duration: "03:03",
    },
    {
      lock: true,
      title: "AI Content Writing & Optimization Tools",
      duration: "07:48",
    },
    {
      lock: true,
      title: "AI-Powered Site Audit Tools",
      duration: "10:48",
    },
    {
      lock: true,
      title: "ChatGPT for SEO Strategy & Ideation",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Automating SEO Reports with AI",
      duration: "10:48",
    },
  ],
},
{
  id: 15,
  title: "Link Building Outreach",
  collapsed: "collapsed",
  faq_details: [
    {
      lock: true,
      title: "Finding Link Prospects",
      duration: "03:03",
    },
    {
      lock: true,
      title: "Writing Outreach Emails That Get Replies",
      duration: "07:48",
    },
    {
      lock: true,
      title: "Guest Blogging & Content Collaboration",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Broken Link Building",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Building Digital PR for Links",
      duration: "10:48",
    },
  ],
},
 {
  id: 16,
  title: "SEO Reporting & Analytics",
  collapsed: "collapsed",
  faq_details: [
    {
      lock: true,
      title: "Setting Up Monthly SEO Reports",
      duration: "03:03",
    },
    {
      lock: true,
      title: "Tracking Keyword Rankings",
      duration: "07:48",
    },
    {
      lock: true,
      title: "Measuring Organic Traffic Growth",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Reporting ROI of SEO Efforts",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Presenting SEO Data to Clients",
      duration: "10:48",
    },
  ],
},
{
  id: 17,
  title: "Freelancing & Client Handling for SEO",
  collapsed: "collapsed",
  faq_details: [
    {
      lock: true,
      title: "Working with SEO Client Briefs",
      duration: "03:03",
    },
    {
      lock: true,
      title: "SEO Proposal & Pricing",
      duration: "07:48",
    },
    {
      lock: true,
      title: "Managing Client Expectations & Communication",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Freelance Platforms for SEO (Fiverr, Upwork, LinkedIn)",
      duration: "10:48",
    },
    {
      lock: true,
      title: "Building Your SEO Portfolio",
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
          Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.
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
