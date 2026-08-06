"use client"
import VideoPopup from "@/modals/VideoPopup"
import EnquiryPopup from "@/modals/EnquiryPopup"
import Image from "next/image"
import { useState } from "react";
import InjectableSvg from "@/hooks/InjectableSvg";
import BtnArrow from "@/svg/BtnArrow";
import { useRouter } from "next/navigation";
import icon_1 from "@/assets/img/icons/course_icon01.svg";
import icon_2 from "@/assets/img/icons/course_icon02.svg";
import icon_3 from "@/assets/img/icons/course_icon03.svg";
import icon_4 from "@/assets/img/icons/course_icon04.svg";
import icon_5 from "@/assets/img/icons/course_icon05.svg";
import icon_6 from "@/assets/img/icons/course_icon06.svg";
import { CourseDataType } from "@/data/inner-data/InnerCourseData";

const AdvanceDMSidebar = ({ single_course }: { single_course?: CourseDataType }) => {
   const router = useRouter();
   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)

   if (!single_course) return null;

   return (
      <>
         <div className="col-xl-3 col-lg-4">
            <div className="courses__details-sidebar">
               <div className="courses__details-video">
                  {single_course.sidebarImage && (
                     <Image src={single_course.sidebarImage} alt="img" style={{ objectFit: "contain" }} />
                  )}
                  <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video"><i className="fas fa-play"></i></a>
               </div>
               <div className="courses__cost-wrap">
                  <span>This Course Fee:</span>
                  <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--tg-common-color-white)", margin: 0 }}>Offline:</span>
                        <h2 className="title" style={{ fontSize: "22px", margin: 0 }}>
                           ₹{single_course.offlinePrice ? single_course.offlinePrice.toLocaleString("en-IN") : "39,000"}
                        </h2>
                     </div>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--tg-common-color-white)", margin: 0 }}>Online:</span>
                        <h2 className="title" style={{ fontSize: "22px", margin: 0 }}>
                           ₹{single_course.onlinePrice ? single_course.onlinePrice.toLocaleString("en-IN") : "30,000"}
                        </h2>
                     </div>
                  </div>
               </div>
               <div className="courses__information-wrap">
                  <h5 className="title">Course includes:</h5>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src={icon_1.src} alt="img" className="injectable" />
                        Level
                        <span>{single_course.level}</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_2.src} alt="img" className="injectable" />
                        Duration
                        <span>{single_course.duration}</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_3.src} alt="img" className="injectable" />
                        Class
                        <span>{single_course.classHours}</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_4.src} alt="img" className="injectable" />
                        Mode
                        <span>{single_course.mode}</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_5.src} alt="img" className="injectable" />
                        Certifications
                        <span>{single_course.certifications}</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_6.src} alt="img" className="injectable" />
                        Case Study
                        <span>{single_course.caseStudies}</span>
                     </li>
                  </ul>
               </div>
               <div className="courses__details-enroll">
                  <div className="tg-button-wrap">
                     <button className="btn btn-two arrow-btn" onClick={() => setIsEnquiryOpen(true)}>
                        Enquire Now<BtnArrow />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <VideoPopup
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoId="b2Az7_lLh3g"
         />
         <EnquiryPopup
            isOpen={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
            videoId="b2Az7_lLh3g"
         />
      </>
   )
}

export default AdvanceDMSidebar
