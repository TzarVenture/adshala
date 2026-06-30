"use client"
import VideoPopup from "@/modals/VideoPopup"
import EnquiryPopup from "@/modals/EnquiryPopup"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import InjectableSvg from "@/hooks/InjectableSvg";
import BtnArrow from "@/svg/BtnArrow";
import { useRouter } from "next/navigation";
import img_1 from "@/assets/img/courses/course_thumb02.jpg"
import img_2 from "@/assets/img/others/payment.png"
import icon_1 from "@/assets/img/icons/course_icon01.svg";
import icon_2 from "@/assets/img/icons/course_icon02.svg";
import icon_3 from "@/assets/img/icons/course_icon03.svg";
import icon_4 from "@/assets/img/icons/course_icon04.svg";
import icon_5 from "@/assets/img/icons/course_icon05.svg";
import icon_6 from "@/assets/img/icons/course_icon06.svg";
import sidebarimage from "@/assets/img/courses/sidebar_image/ADSHALA BANNER 03.jpg";
const Sidebar = () => {
   const router = useRouter();
   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
   return (
      <>
         <div className="col-xl-3 col-lg-4">
            <div className="courses__details-sidebar">
               <div className="courses__details-video">
                  <Image src={sidebarimage} alt="img" style={{ objectFit: "contain" }} />
                  <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video"><i className="fas fa-play"></i></a>
               </div>
               <div className="courses__cost-wrap">
                  <span>This Course Fee:</span>
                  <h2 className="title">₹20,000 <del style={{ color: "#ffc224" }}>₹35,000</del></h2>
               </div>
               <div className="courses__information-wrap">
                  <h5 className="title">Course includes:</h5>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src={icon_1.src} alt="img" className="injectable" />
                        Level
                        <span>Expert</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_2.src} alt="img" className="injectable" />
                        Duration
                        <span>3 Month</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_3.src} alt="img" className="injectable" />
                        Class
                        <span>72+ Hour</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_4.src} alt="img" className="injectable" />
                        Mode
                        <span>Offline</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_5.src} alt="img" className="injectable" />
                        Certifications
                        <span>Yes</span>
                     </li>
                     <li>
                        <InjectableSvg src={icon_6.src} alt="img" className="injectable" />
                        Case Study
                        <span>25+</span>
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

export default Sidebar
