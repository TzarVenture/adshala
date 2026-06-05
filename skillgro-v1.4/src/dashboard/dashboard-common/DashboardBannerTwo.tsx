import BtnArrow from "@/svg/BtnArrow"
import Image from "next/image"
import Link from "next/link"
import InjectableSvg from "@/hooks/InjectableSvg"

import img_1 from "@/assets/img/courses/details_instructors02.jpg"
import icon_1 from "@/assets/img/icons/course_icon03.svg";
import icon_2 from "@/assets/img/icons/course_icon05.svg";
import bg_img from "@/assets/img/bg/student_bg.jpg"

const DashboardBannerTwo = () => {
   return (
      <div className="dashboard__top-wrap">
         <div className="dashboard__top-bg" style={{ backgroundImage: `url(${bg_img.src})` }}></div>
         <div className="dashboard__instructor-info">
            <div className="dashboard__instructor-info-left">
               <div className="thumb">
                  <Image src={img_1} alt="img" />
               </div>
               <div className="content">
                  <h4 className="title">Emily Hannah</h4>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src={icon_1.src} alt="img" className="injectable" />
                        5 Courses Enrolled
                     </li>
                     <li>
                        <InjectableSvg src={icon_2.src} alt="img" className="injectable" />
                        4 Certificate
                     </li>
                  </ul>
               </div>
            </div>
            <div className="dashboard__instructor-info-right">
               <Link href="#" className="btn btn-two arrow-btn">Become an Instructor <BtnArrow /></Link>
            </div>
         </div>
      </div>
   )
}

export default DashboardBannerTwo
