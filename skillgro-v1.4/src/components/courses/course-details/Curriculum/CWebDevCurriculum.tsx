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
    title: "Introduction to WordPress",
    show: "show",
    faq_details: [
      {
        class_name: "open-item",
        lock: true,
        title: "What is WordPress & How It Works",
        duration: "03:03",
      },
      {
        lock: true,
        title: "WordPress.com vs WordPress.org",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Installing & Setting Up WordPress",
        duration: "10:48",
      },
      { lock: true, title: "Dashboard Overview & Settings", duration: "10:48" },
      {
        lock: true,
        title: "Understanding Themes, Plugins & Pages",
        duration: "10:48",
      },
    ],
  },
  {
    id: 2,
    title: "WordPress Theme & Design",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "Choosing & Installing Themes", duration: "03:03" },
      {
        lock: true,
        title: "Customizing Theme Settings & Colors",
        duration: "07:48",
      },
      { lock: true, title: "Typography, Fonts & Branding", duration: "10:48" },
      {
        lock: true,
        title: "Header, Footer & Navigation Design",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Mobile Responsiveness & Preview",
        duration: "10:48",
      },
    ],
  },
  {
    id: 3,
    title: "WordPress Page Builder – Elementor",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "Introduction to Elementor", duration: "03:03" },
      { lock: true, title: "Drag & Drop Page Building", duration: "07:48" },
      {
        lock: true,
        title: "Designing Home, About & Contact Pages",
        duration: "10:48",
      },
      { lock: true, title: "Creating Landing Pages", duration: "10:48" },
      {
        lock: true,
        title: "Global Styles & Design Consistency",
        duration: "10:48",
      },
    ],
  },
  {
    id: 4,
    title: "WordPress Pages, Posts & Media",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "Creating & Managing Pages", duration: "03:03" },
      {
        lock: true,
        title: "Writing & Publishing Blog Posts",
        duration: "07:48",
      },
      { lock: true, title: "Categories, Tags & Archives", duration: "10:48" },
      {
        lock: true,
        title: "Media Library – Images & Videos",
        duration: "10:48",
      },
      { lock: true, title: "Creating & Managing Menus", duration: "10:48" },
    ],
  },
  {
    id: 5,
    title: "WordPress Plugins & Integrations",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "Installing & Managing Plugins", duration: "03:03" },
      {
        lock: true,
        title: "Contact Form Plugins (WPForms, Contact Form 7)",
        duration: "07:48",
      },
      { lock: true, title: "Social Media Integration", duration: "10:48" },
      {
        lock: true,
        title: "Live Chat & WhatsApp Button Plugins",
        duration: "10:48",
      },
      { lock: true, title: "Backup & Security Plugins", duration: "10:48" },
    ],
  },
  {
    id: 6,
    title: "WooCommerce – E-commerce on WordPress",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Installing & Setting Up WooCommerce",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Adding Products, Variations & Categories",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Payment Gateway Integration (Razorpay, PayPal, Stripe)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Shipping Zones & Delivery Settings",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Managing Orders & Customer Accounts",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Coupons, Discounts & Promotional Tools",
        duration: "10:48",
      },
    ],
  },
  {
    id: 7,
    title: "WordPress SEO",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "Setting Up Yoast SEO Plugin", duration: "03:03" },
      {
        lock: true,
        title: "Optimizing Pages & Posts for Search",
        duration: "07:48",
      },
      {
        lock: true,
        title: "XML Sitemap & Robots.txt Setup",
        duration: "10:48",
      },
      { lock: true, title: "Image Optimization & Alt Text", duration: "10:48" },
      { lock: true, title: "SEO-Friendly URL Structure", duration: "10:48" },
    ],
  },
  {
    id: 8,
    title: "WordPress Speed & Performance",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Caching Plugins (WP Rocket, W3 Total Cache)",
        duration: "03:03",
      },
      { lock: true, title: "Image Compression Tools", duration: "07:48" },
      { lock: true, title: "Lazy Loading & CDN Setup", duration: "10:48" },
      { lock: true, title: "Core Web Vitals Optimization", duration: "10:48" },
      {
        lock: true,
        title: "Speed Testing with GTmetrix & PageSpeed Insights",
        duration: "10:48",
      },
    ],
  },
  {
    id: 9,
    title: "WordPress Security & Maintenance",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "SSL Certificate & HTTPS Setup", duration: "03:03" },
      {
        lock: true,
        title: "Security Plugins (Wordfence, iThemes Security)",
        duration: "07:48",
      },
      { lock: true, title: "Website Backup & Restoration", duration: "10:48" },
      {
        lock: true,
        title: "Updating WordPress, Themes & Plugins",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Spam Protection & User Role Management",
        duration: "10:48",
      },
    ],
  },
  {
    id: 10,
    title: "Web Hosting & Domain Management",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Types of Hosting (Shared, VPS, Cloud)",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Buying & Connecting a Domain Name",
        duration: "07:48",
      },
      { lock: true, title: "Hosting Setup & cPanel Basics", duration: "10:48" },
      {
        lock: true,
        title: "Uploading WordPress via Hosting Panel",
        duration: "10:48",
      },
      { lock: true, title: "Email Setup with Domain", duration: "10:48" },
    ],
  },

  {
    id: 11,
    title: "Introduction to Shopify",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "What is Shopify & Who It's For",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Shopify Plans & Pricing Overview",
        duration: "07:48",
      },
      { lock: true, title: "Setting Up a Shopify Account", duration: "10:48" },
      {
        lock: true,
        title: "Dashboard Overview & Navigation",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Shopify vs WooCommerce Comparison",
        duration: "10:48",
      },
    ],
  },

  {
    id: 12,
    title: "Shopify Store Design & Customization",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Choosing & Installing Shopify Themes",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Customizing Theme Layout, Colors & Fonts",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Homepage, Header & Footer Design",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Adding Banners, Sections & Blocks",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Mobile Preview & Responsiveness",
        duration: "10:48",
      },
    ],
  },

  {
    id: 13,
    title: "Shopify Products & Collections",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Adding Single & Variable Products",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Product Images, Descriptions & Pricing",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Organizing Products into Collections",
        duration: "10:48",
      },
      { lock: true, title: "Tags, Filters & Search Setup", duration: "10:48" },
      {
        lock: true,
        title: "Inventory Tracking & Stock Management",
        duration: "10:48",
      },
    ],
  },

  {
    id: 14,
    title: "Shopify Payment & Checkout",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "Setting Up Shopify Payments", duration: "03:03" },
      {
        lock: true,
        title: "Integrating Third-Party Gateways (Razorpay, PayPal)",
        duration: "07:48",
      },
      { lock: true, title: "Checkout Page Customization", duration: "10:48" },
      { lock: true, title: "Discount Codes & Gift Cards", duration: "10:48" },
      { lock: true, title: "Abandoned Cart Recovery", duration: "10:48" },
    ],
  },

  {
    id: 15,
    title: "Shopify Shipping & Order Management",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Setting Up Shipping Zones & Rates",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Free Shipping & Conditional Rules",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Processing & Fulfilling Orders",
        duration: "10:48",
      },
      { lock: true, title: "Managing Returns & Refunds", duration: "10:48" },
      {
        lock: true,
        title: "Order Notifications & Customer Emails",
        duration: "10:48",
      },
    ],
  },

  {
    id: 16,
    title: "Shopify Apps & Integrations",
    collapsed: "collapsed",
    faq_details: [
      { lock: true, title: "Must-Have Shopify Apps", duration: "03:03" },
      {
        lock: true,
        title: "WhatsApp & Live Chat Integration",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Email Marketing App Integration (Klaviyo, Mailchimp)",
        duration: "10:48",
      },
      { lock: true, title: "Product Reviews & Rating Apps", duration: "10:48" },
      {
        lock: true,
        title: "Upsell, Cross-Sell & Pop-Up Apps",
        duration: "10:48",
      },
    ],
  },

  {
    id: 17,
    title: "Shopify SEO & Marketing",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Shopify SEO Settings & Best Practices",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Optimizing Product Pages for Google",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Setting Up Google Analytics & Meta Pixel",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Social Media Integration & Shop",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Running Discount Campaigns & Sales",
        duration: "10:48",
      },
    ],
  },

  {
    id: 18,
    title: "Shopify Analytics & Reporting",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Shopify Dashboard Metrics & KPIs",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Sales Reports & Revenue Tracking",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Traffic Sources & Customer Behavior",
        duration: "10:48",
      },
      { lock: true, title: "Conversion Rate Analysis", duration: "10:48" },
      {
        lock: true,
        title: "Data-Driven Store Optimization",
        duration: "10:48",
      },
    ],
  },

  {
    id: 19,
    title: "AI Tools for Web Development",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "AI Website Content & Copy Generators",
        duration: "03:03",
      },
      {
        lock: true,
        title: "AI Image Creation for Websites",
        duration: "07:48",
      },
      {
        lock: true,
        title: "AI Chatbots & Customer Support Tools",
        duration: "10:48",
      },
      {
        lock: true,
        title: "AI for Product Descriptions (Shopify Magic)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "ChatGPT for Website Strategy & Planning",
        duration: "10:48",
      },
    ],
  },

  {
    id: 20,
    title: "Freelancing & Client Handling",
    collapsed: "collapsed",
    faq_details: [
      {
        lock: true,
        title: "Working with Client Website Briefs",
        duration: "03:03",
      },
      {
        lock: true,
        title: "Web Development Proposals & Pricing",
        duration: "07:48",
      },
      {
        lock: true,
        title: "Managing Timelines & Deliverables",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Client Communication & Revisions",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Freelance Platforms (Fiverr, Upwork)",
        duration: "10:48",
      },
      {
        lock: true,
        title: "Building Your Web Development Portfolio",
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
          Build responsive websites using WordPress, Shopify and modern
          development practices while learning UI fundamentals, hosting,
          deployment and real-world project implementation.
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
