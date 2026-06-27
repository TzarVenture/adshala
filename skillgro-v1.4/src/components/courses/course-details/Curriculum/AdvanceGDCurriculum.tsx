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
    title: "Design Fundamentals & Theory",
    show: "show",
    faq_details: [
      {
        class_name: "open-item",
        lock: true,
        title: "Elements & Principles of Design",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Color Theory",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Typography",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Composition & Layout",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Grids & Alignment",
        duration: "10:48",
      },
    ],
  },
  {
    id: 2,
    title: "Adobe Photoshop",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Interface & Tools Overview",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Photo Editing & Retouching",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Layers, Masks & Blending Modes",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Color Correction",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Compositing & Image Manipulation",
        duration: "10:48",
      },
    ],
  },
  {
    id: 3,
    title: "Adobe Illustrator",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Vector Design Basics",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Pen Tool & Shape Building",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Logo Design Techniques",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Typography & Text Effects",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Icon & Illustration Design",
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
        title: "Templates & Brand Kits",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Presentation Design",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Video & Reel Editing",
        duration: "10:48",
      },
    ],
  },
  {
    id: 5,
    title: "Branding & Logo Design",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Brand Identity Fundamentals",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Logo Design Process",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Brand Style Guides",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Brand Collaterals (Business Cards, Letterheads, Stationery)",
        duration: "10:48",
      },
    ],
  },
  {
    id: 6,
    title: "Photoshop",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Photo Editing & Retouching",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Layers, Masks & Blending Modes",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Color Correction & Grading",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Compositing & Manipulation",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Banner & Poster Design",
        duration: "10:48",
      },
    ],
  },
  {
    id: 7,
    title: "Illustrator",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Vector Graphics & Shapes",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Logo & Icon Design",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Typography & Text Effects",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Pattern & Illustration Design",
        duration: "10:48",
      },
    ],
  },
  {
    id: 8,
    title: "In Design",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Brochure & Flyer Layouts",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Magazine & Catalog Design",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Multi-Page Document Design",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Print-Ready File Setup",
        duration: "10:48",
      },
    ],
  },
  {
    id: 9,
    title: "Premiere Pro",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Video Editing Basics",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Transitions & Effects",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Audio Editing",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Export Settings for Social Media",
        duration: "10:48",
      },
    ],
  },
  {
    id: 10,
    title: "After Effects",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Motion Graphics Basics",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Animated Logos & Titles",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Social Media Animations",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Visual Effects (VFX) Basics",
        duration: "10:48",
      },
    ],
  },
  {
    id: 11,
    title: "Blender",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "3D Modeling Basics",
        duration: "03:03",
      },
      {
        lock: true,
        title: "3D Text & Logo Design",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Rendering & Lighting",
        duration: "10:48",
      },
      {
        lock: true,
        title: "3D Mockups for Branding",
        duration: "10:48",
      },
    ],
  },
  {
    id: 12,
    title: "Motion Graphics & Video Editing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Adobe Premiere Pro Basics",
        duration: "03:03",
      },
      {
        lock: true,
        title: "After Effects Basics",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Animated Social Media Content",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Intro/Outro & Title Animations",
        duration: "10:48",
      },
    ],
  },
  {
    id: 13,
    title: "FIGMA",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Wireframing & Prototyping",
        duration: "03:03",
      },
      {
        lock: true,
        title: "UI Design for Web & Apps",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Design Systems & Components",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Interactive Prototypes",
        duration: "10:48",
      },
    ],
  },
  {
    id: 14,
    title: "AI Design Tools",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "AI Image Generation (Midjourney, DALL·E)",
        duration: "03:03",
      },
      {
        lock: true,
        title: "AI Background Removal & Editing",
        duration: "07:48",
      },
      {
        lock: true,
        title: "AI Logo & Mockup Generators",
        duration: "10:48",
      },
      {
        lock: true,
        title: "AI for Design Automation",
        duration: "10:48",
      },
    ],
  },
  {
    id: 15,
    title: "Mockups & Presentation Design",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Product Mockups",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Portfolio Presentation Design",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Client Presentation Decks",
        duration: "10:48",
      },
    ],
  },
  {
    id: 16,
    title: "Portfolio Development",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Building a Professional Portfolio",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Personal Branding for Designers",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Case Study Documentation",
        duration: "10:48",
      },
    ],
  },
  {
    id: 17,
    title: "Freelancing & Client Handling",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Working with Client Briefs",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Pricing & Proposals",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Freelance Platforms (Fiverr, Upwork)",
        duration: "07:48",
      },
    ],
  },
  {
    id: 18,
    title: "Design Tools & Workflow",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "File Formats & Export Settings",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Design Handover to Developers",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Collaboration Tools (Google Drive, Notion)",
        duration: "07:48",
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
          Develop creative design skills using Photoshop, Illustrator, Canva,
          branding, typography, color theory, social media creatives, print
          materials and portfolio projects for professional success.
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
