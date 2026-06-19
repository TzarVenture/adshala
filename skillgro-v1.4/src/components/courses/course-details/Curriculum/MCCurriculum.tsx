import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoPopup from "@/modals/VideoPopup";

import icon_1 from "@/assets/img/icons/lock.svg"
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
   }[]
}[]

const faq_data: DataType[] = [
   {
      id: 1,
      title: "Introduction to Marketplace Selling",
      show: "show",
      faq_details: [
         {
            class_name: "open-item",
            lock: true,
            title: "Overview of E-commerce & Marketplace Ecosystem",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Top Marketplaces in India (Amazon, Flipkart, Meesho, Myntra, Ajio)",
            duration: "07:48"
         },
         {
            lock: true,
            title: "How Marketplace Algorithms Work",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Seller vs Brand vs Reseller Models",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Career Opportunities in Marketplace Management",
            duration: "10:48"
         },

      ]
   },
   {
      id: 2,
      title: "Amazon Seller Central",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Creating & Setting Up a Seller Account",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Account Dashboard & Navigation",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Seller Policies & Guidelines",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Account Health Management",
            duration: "10:48"
         },
         {
            lock: true,
            title: "FBA vs FBM (Fulfilled by Amazon vs Seller)",
            duration: "10:48"
         },
      ]
   },
   {
      id: 3,
      title: "Flipkart Seller Hub",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Creating & Setting Up a Flipkart Seller Account",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Dashboard Overview & Navigation",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Flipkart Policies & Compliance",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Flipkart Fulfillment Options",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Account Health & Performance Metrics",
            duration: "10:48"
         },
      ]
   },
   {
      id: 4,
      title: "Meesho Seller Panel",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Supplier Account Setup",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Catalog Uploading & Management",
            duration: "07:48"
         },
         {
            lock: true,
            title: "B2B Marketing on LinkedIn",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Pricing & Margin Strategy on Meesho",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Order Management & Returns",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Meesho Ads Basics",
            duration: "10:48"
         },
       
      ]
   },
   {
      id: 5,
      title: "Myntra & Other Platforms",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Myntra Brand Partner Onboarding",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Catalog Standards for Myntra",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Introduction to Ajio, Nykaa & JioMart",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Platform-Specific Requirements & Guidelines",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Multi-Platform Selling Strategy",
            duration: "10:48"
         },
      ]
   },
   {
      id: 6,
      title: "Product Listing & Catalog Management",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Writing SEO-Optimized Product Titles",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Product Descriptions & Bullet Points",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Category & Attribute Mapping",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Keyword Research for Listings",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Bulk Listing & Catalog Upload",
            duration: "10:48"
         },
      ]
   },
   {
      id: 7,
      title: "Product Photography & Videography",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Marketplace Image Guidelines & Standards",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Basic Product Photography Setup",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Image Editing for Marketplace (Background Removal, Enhancement)",
            duration: "10:48"
         },
         {
            lock: true,
            title: "A+ Content & Enhanced Brand Content",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Product Videos for Listings",
            duration: "10:48"
         },
      ]
   },
   {
      id: 8,
      title: "Pricing Strategy",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Competitive Pricing Analysis",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Dynamic Pricing Techniques",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Understanding Marketplace Fees & Commissions",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Profit Margin Calculation",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Deal, Discount & Coupon Strategy",
            duration: "10:48"
         },
      ]
   },
   {
      id: 9,
      title: "Marketplace Advertising (Sponsored Ads)",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Amazon Sponsored Products, Brands & Display Ads",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Flipkart Ads Manager",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Campaign Setup, Budgeting & Bidding",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Keyword Targeting & Negative Keywords",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Ad Performance Tracking & Optimization",
            duration: "10:48"
         },
      ]
   },
   {
      id: 10,
      title: "Inventory & Order Management",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Inventory Planning & Forecasting",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Stock Replenishment Strategy",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Order Processing & Fulfillment",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Handling Cancellations & Returns",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Inventory Management Tools",
            duration: "10:48"
         },
      ]
   },
   {
      id: 11,
      title: "Customer Service & Returns Management",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Handling Customer Queries & Complaints",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Managing Returns, Refunds & Replacements",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Reducing Return Rates",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Customer Communication Best Practices",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Escalation & Dispute Resolution",
            duration: "10:48"
         },
      ]
   },
   {
      id: 12,
      title: "Ratings & Reviews Management",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Importance of Ratings & Reviews",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Strategies to Get More Positive Reviews",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Responding to Negative Reviews",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Review Policy Compliance",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Building Product Trust & Credibility",
            duration: "10:48"
         },
      ]
   },
   {
      id: 13,
      title: "Analytics & Performance Reporting",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Marketplace Dashboard Metrics & KPIs",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Sales Reports & Trend Analysis",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Traffic & Conversion Rate Optimization",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Advertising Performance Reports",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Data-Driven Decision Making",
            duration: "10:48"
         },
      ]
   },
   {
      id: 14,
      title: "Brand Store Setup",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Setting Up Amazon & Flipkart Brand Stores",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Store Design & Navigation",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Showcasing Product Collections",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Driving Traffic to Brand Store",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Brand Store Analytics",
            duration: "10:48"
         },
      ]
   },
   {
      id: 15,
      title: "AI Tools for Marketplace",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "AI for Product Title & Description Writing",
            duration: "03:03"
         },
         {
            lock: true,
            title: "AI-Powered Keyword Research Tools",
            duration: "07:48"
         },
         {
            lock: true,
            title: "AI Pricing & Competitor Tracking Tools",
            duration: "10:48"
         },
         {
            lock: true,
            title: "AI for Image Enhancement & Background Removal",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Automation Tools for Order & Inventory Management",
            duration: "10:48"
         },
      ]
   },
   {
      id: 16,
      title: "Logistics & Shipping Management",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Understanding Marketplace Logistics Partners",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Shipping Rate Optimization",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Packaging Standards & Guidelines",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Tracking & Delivery Management",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Reducing Shipping Errors & Delays",
            duration: "10:48"
         },
      ]
   },
   {
      id: 17,
      title: "Scaling & Multi-Platform Selling",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Expanding from One to Multiple Platforms",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Managing Unified Inventory Across Platforms",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Scaling Ad Spend Profitably",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Building a Private Label or Brand",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Long-Term E-commerce Growth Strategy",
            duration: "07:48"
         },
      ]
   },
];

const Curriculum = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="courses__curriculum-wrap">
            <h3 className="title">Course Curriculum</h3>
            <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
            <div className="accordion" id="accordionExample">
               {faq_data.map((item) => (
                  <div key={item.id} className="accordion-item">
                     <h2 className="accordion-header" id={`headingOne${item.id}`}>
                        <button className={`accordion-button ${item.collapsed}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${item.id}`} aria-expanded="true" aria-controls={`collapseOne${item.id}`}>
                           {item.title}
                        </button>
                     </h2>
                     <div id={`collapseOne${item.id}`} className={`accordion-collapse collapse ${item.show}`} aria-labelledby={`headingOne${item.id}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                           <ul className="list-wrap">
                              {item.faq_details.map((list, i) => (
                                 <React.Fragment key={i}>
                                    {list.lock ? (
                                       <li className="course-item">
                                          <Link href="#" className="course-item-link">
                                             <span className="item-name">{list.title}</span>
                                          </Link>
                                       </li>) : (
                                       <li className="course-item open-item">
                                          <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="course-item-link popup-video">
                                             <span className="item-name">Course Installation</span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">03:03</span>
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
   )
}

export default Curriculum
