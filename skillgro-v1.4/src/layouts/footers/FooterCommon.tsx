import Link from "next/link"
import Image from "next/image"

import Adshalaa_logo from "@/assets/img/brand/Adshalaa_footer_logo.png"
import logo from "@/assets/img/logo/secondary_logo.svg"
import { RiExternalLinkLine } from "react-icons/ri";

const FooterCommon = () => {
   return (
      <>
         <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="footer__widget">
               <div className="logo mb-3">
                  <Link href="/"><Image src={Adshalaa_logo} alt="img" width={150} height={80} /></Link>
               </div>
               <div className="footer__content" >
                  <p style={{ color: "#dbd7d7" }}>India's leading skill-development institute offering certified programs in Digital Marketing, Graphic Design, and Web Development, with real internships and 100% placement support.</p>
                  <ul className="list-wrap">
                     <li style={{ color: "#dbd7d7", fontSize: "16px", marginTop: "10px" }}>
                        <i className="fas fa-phone" style={{ marginRight: "8px", color: "#FFC224" }}></i>
                        +91 8652199991 | +91 7760775875
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title" style={{ color: "#FFC224" }}>Our Company</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="/about-us" style={{ color: "#dbd7d7" }}>About Us</Link></li>
                     <li><Link href="/courses" style={{ color: "#dbd7d7" }}>Our Courses</Link></li>
                     <li><Link href="/contact" style={{ color: "#dbd7d7" }}>Become a Partner</Link></li>
                     <li><Link href="/contact" style={{ color: "#dbd7d7" }}>Work at Adshalaa </Link></li>
                     <li><Link href="/#" style={{ color: "#dbd7d7" }}>Blog</Link></li>
                     <li><Link href="/faq" style={{ color: "#dbd7d7" }}>FAQ's</Link></li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title" style={{ color: "#FFC224" }}>Useful Links</h4>
               <div className="footer__link">
                  <ul className="list-wrap" >
                     <li><Link href="/contact" style={{ color: "#dbd7d7" }}>Become an Instructor</Link></li>
                     <li><Link href="https://www.adshalaa.com/student-registration" style={{ color: "#dbd7d7" }}>Student Registration</Link></li>
                     <li><Link href="#" style={{ color: "#dbd7d7" }}>Placement Cell </Link></li>
                     <li><Link href="/contact" style={{ color: "#dbd7d7" }}>Contact Us</Link></li>
                     <li><Link href="https://www.adshalaa.com/certification-in-advanced-digital-marketing-and-ai-mumbai-enquiry-now" style={{ color: "#dbd7d7" }}>CADM</Link></li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

export default FooterCommon
