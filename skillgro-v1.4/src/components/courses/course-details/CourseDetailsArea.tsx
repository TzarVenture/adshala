"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum";
import Reviews from "./Reviews";
import Instructors from "./Instructors";

import AdvanceDMOverview from "./Overview/AdvanceDMOverview";
import AdvanceGDOverview from "./Overview/AdvanceGDOverview"
import MasterSMMOverview from "./Overview/MasterSMMOverview"
import MCOverview from "./Overview/MCOverview"
import SCOverview from "./Overview/SCOverview"
import CWebDevOverview from "./Overview/CWebDevOverview"

import AdvanceDMCurriculum from "./Curriculum/AdvanceDMCurriculum";
import AdvanceGDCurriculum from "./Curriculum/AdvanceGDCurriculum"
import MasterSMMCurriculum from "./Curriculum/MasterSMMCurriculum"
import MCCurriculum from "./Curriculum/MCCurriculum"
import SCCurriculum from "./Curriculum/SCCurriculum"
import CWebDevCurriculum from "./Curriculum/CWebDevCurriculum"

import AdvanceDMSidebar from "./Sidebar/AdvanceDMSidebar";
import AdvanceGDSidebar from "./Sidebar/AdvanceGDSidebar";
import MasterSMMSidebar from "./Sidebar/MasterSMMSidebar"
import MCSidebar from "./Sidebar/MCSidebar"
import SCSidebar from "./Sidebar/SCSidebar"
import CWebDevSidebar from "./Sidebar/CWebDevSidebar"

import course_details_img1 from "@/assets/img/courses/courses_details.jpg";
import mybannerimage from "./mybannerimage.jpeg"
import course_details_img2 from "@/assets/img/courses/course_author001.png";
// import mybannerimage from "@/components/courses/course-details/mybannerimage.jpeg"
const tab_title: string[] = ["Overview", "Curriculum"];

const CourseDetailsArea = ({ single_course }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const currentOverView = () => {
    if (
      single_course?.overview ===
      "certification-in-advanced-digital-marketing-&-ai"
    ) {
      return <AdvanceDMOverview />;
    } 
    else if(single_course?.overview === "certification-in-advanced-graphic-design-&-ai"){
      return <AdvanceGDOverview/>
    }
    else if(single_course?.overview === "mastery-in-social-media-management"){
      return <MasterSMMOverview/>
    }
    else if(single_course?.overview === "marketplace-certification"){
      return <MCOverview/>
    }
    else if(single_course?.overview === "seo-certification"){
      return <SCOverview/>
    }
    else if(single_course?.overview === "certification-in-web-development"){
      return <CWebDevOverview/>
    }
    
    else {
      return <Overview />;
    }
  };

  const currentCurriculum = () => {
    if (
      single_course?.overview ===
      "certification-in-advanced-digital-marketing-&-ai"
    ) {
      return <AdvanceDMCurriculum />;
    } 
    else if(single_course?.overview === "certification-in-advanced-graphic-design-&-ai"){
      return <AdvanceGDCurriculum/>
    }
    else if(single_course?.overview === "mastery-in-social-media-management"){
      return <MasterSMMCurriculum/>
    }
    else if(single_course?.overview === "marketplace-certification"){
      return <MCCurriculum/>
    }
    else if(single_course?.overview === "seo-certification"){
      return <SCCurriculum/>
    }
    else if(single_course?.overview === "certification-in-web-development"){
      return <CWebDevCurriculum/>
    }
    else {
      return <Curriculum />;
    }
  };

  const currentSidebar = () => {
    if (
      single_course?.overview ===
      "certification-in-advanced-digital-marketing-&-ai"
    ) {
      return <AdvanceDMSidebar />;
    } 
    else if(single_course?.overview === "certification-in-advanced-graphic-design-&-ai"){
      return <AdvanceGDSidebar/>
    }
    else if(single_course?.overview === "mastery-in-social-media-management"){
      return <MasterSMMSidebar/>
    }
    else if(single_course?.overview === "marketplace-certification"){
      return <MCSidebar/>
    }
    else if(single_course?.overview === "seo-certification"){
      return <SCSidebar/>
    }
    else if(single_course?.overview === "certification-in-web-development"){
      return <CWebDevSidebar/>
    }
    else {
      return <Sidebar />;
    }
  };

  return (
    <section className="courses__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="courses__details-thumb">
              <Image src={course_details_img1} alt="img" />
              {/* <Image src={mybannerimage} alt="img" /> */}
              {/* <Image   src="/mybannerimage.jpeg"  width={1200}
  height={600} alt="img" /> */}
            </div>
            <div className="courses__details-content">
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link href="/courses">
                    {single_course?.category
                      ? single_course.category
                      : "Development"}
                  </Link>
                </li>
                <li className="avg-rating">
                  <i className="fas fa-star"></i>
                  {single_course?.rating
                    ? single_course.rating
                    : "(4.5 Reviews)"}
                </li>
              </ul>
              <h2 className="title">
                {single_course?.title
                  ? single_course.title
                  : "Resolving Conflicts Between Designers And Engineers"}
              </h2>
              <div className="courses__details-meta">
                {single_course && (
                  <ul className="list-wrap">
                    {single_course.meta1 && <li>{single_course.meta1}</li>}
                    {single_course.meta2 && <li>{single_course.meta2}</li>}
                    {single_course.meta3 && <li>{single_course.meta3}</li>}
                  </ul>
                )}
              </div>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {tab_title.map((tab, index) => (
                  <li
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className="nav-item"
                    role="presentation"
                  >
                    <button
                      className={`nav-link ${activeTab === index ? "active" : ""}`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`}
                  id="overview-tab-pane"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  {/* <Overview /> */}
                  {currentOverView()}
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`}
                  id="overview-tab-pane"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  {currentCurriculum()}
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 2 ? "show active" : ""}`}
                  id="overview-tab-pane"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <Instructors />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 3 ? "show active" : ""}`}
                  id="overview-tab-pane"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <Reviews />
                </div>
              </div>
            </div>
          </div>
          {currentSidebar()}
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea;
