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
      title: "Social Media Fundamentals",
      show: "show",
      faq_details: [
         {
            class_name: "open-item",
            lock: true,
            title: "Overview of Social Media Platforms",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Role of Social Media in Digital Marketing",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Building a Social Media Strategy",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Understanding Target Audience & Personas",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Social Media Trends & Algorithm Basics",
            duration: "10:48"
         },

      ]
   },
   {
      id: 2,
      title: "Instagram Marketing & Optimisation",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Profile Setup & Bio Optimisation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Content Strategy for Instagram",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Reels, Stories & Carousel Posts",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Hashtag Strategy & Growth Techniques",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Instagram Insights & Analytics",
            duration: "10:48"
         },
      ]
   },
   {
      id: 3,
      title: "Facebook Marketing",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Page Setup & Optimisation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Content Planning for Facebook",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Facebook Groups & Community Building",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Facebook Ads Manager Basics",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Audience Targeting & Retargeting",
            duration: "10:48"
         },
      ]
   },
   {
      id: 4,
      title: "LinkedIn Marketing",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Profile & Company Page Optimisation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Content Strategy for LinkedIn",
            duration: "07:48"
         },
         {
            lock: true,
            title: "B2B Marketing on LinkedIn",
            duration: "10:48"
         },
         {
            lock: true,
            title: "LinkedIn Ads & Lead Generation",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Networking & Personal Branding",
            duration: "10:48"
         },
       
      ]
   },
   {
      id: 5,
      title: "YouTube Marketing",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Channel Setup & Optimisation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Video Content Strategy",
            duration: "07:48"
         },
         {
            lock: true,
            title: "SEO for YouTube",
            duration: "10:48"
         },
         {
            lock: true,
            title: "YouTube Ads Basics",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Analytics & Growth Tactics",
            duration: "10:48"
         },
      ]
   },
   {
      id: 6,
      title: "Twitter / X Marketing",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Profile Optimisation",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Content & Posting Strategy",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Twitter Trends & Hashtags",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Twitter Ads Basics",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Engagement & Community Building",
            duration: "10:48"
         },
      ]
   },
   {
      id: 7,
      title: "Content Planning & Calendar",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Building a Monthly Content Calendar",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Content Pillars & Themes",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Batch Content Creation",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Scheduling & Automation Tools",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Repurposing Content Across Platforms",
            duration: "10:48"
         },
      ]
   },
   {
      id: 8,
      title: "Canva for Social Media",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Social Media Post & Story Design",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Ad Creatives & Banners",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Reel Covers & Thumbnails",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Brand Kits & Templates",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Video & Animation Basics",
            duration: "10:48"
         },
      ]
   },
   {
      id: 9,
      title: "Reels & Short-Form Video",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Reels Strategy & Scripting",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Shooting & Editing Techniques",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Trending Audio & Hooks",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Reels for Brand Growth",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Cross-Posting (Instagram, YouTube Shorts, TikTok)",
            duration: "10:48"
         },
      ]
   },
   {
      id: 10,
      title: "Social Media Advertising (Paid)",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Meta Ads Manager (Facebook & Instagram Ads)",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Campaign Objectives & Ad Formats",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Audience Targeting & Lookalike Audiences",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Ad Budgeting & Bidding",
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
      id: 11,
      title: "Influencer Marketing",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Influencer Identification & Outreach",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Types of Influencers (Nano, Micro, Macro)",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Campaign Planning & Briefing",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Collaboration Contracts & Pricing",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Performance Measurement",
            duration: "10:48"
         },
      ]
   },
   {
      id: 12,
      title: "Social Media Analytics & Reporting",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Platform-wise Insights & Metrics",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Key Performance Indicators (KPIs)",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Google Analytics for Social Traffic",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Monthly Performance Reports",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Data-Driven Strategy Adjustments",
            duration: "10:48"
         },
      ]
   },
   {
      id: 13,
      title: "AI Tools for Social Media",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "AI Caption & Content Writing Tools",
            duration: "03:03"
         },
         {
            lock: true,
            title: "AI Image & Creative Generation",
            duration: "07:48"
         },
         {
            lock: true,
            title: "AI Scheduling & Automation Tools",
            duration: "10:48"
         },
         {
            lock: true,
            title: "AI for Hashtag Research & Trend Analysis",
            duration: "10:48"
         },
         {
            lock: true,
            title: "ChatGPT for Social Media Strategy",
            duration: "10:48"
         },
      ]
   },
   {
      id: 14,
      title: "WhatsApp Marketing",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "WhatsApp Business Setup",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Broadcast Campaigns & Lists",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Automation & Chatbots",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Catalog & Product Promotion",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Customer Engagement & Retention",
            duration: "10:48"
         },
      ]
   },
   {
      id: 15,
      title: "Online Reputation Management (ORM)",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Brand Monitoring & Listening Tools",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Review & Rating Management",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Handling Negative Press & Comments",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Sentiment Analysis",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Building a Positive Brand Image",
            duration: "10:48"
         },
      ]
   },
   {
      id: 16,
      title: "Brand Building on Social Media",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Brand Voice & Tone Development",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Visual Identity Consistency",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Storytelling for Brands",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Building Trust & Authority Online",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Personal Branding for Creators & Professionals",
            duration: "10:48"
         },
      ]
   },
   {
      id: 17,
      title: "Freelancing & Client Handling",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Working with Client Briefs",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Social Media Proposals & Pricing",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Client Reporting & Communication",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Freelance Platforms (Fiverr, Upwork, LinkedIn)",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Building Your Own Social Media Portfolio",
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
