import Social from "@/components/common/Social"
// FooterCommon import removed
import Image from "next/image"
import Link from "next/link"
import "./footerone.css"
import icon_1 from "@/assets/img/others/google-play.svg"
import icon_2 from "@/assets/img/others/apple-store.svg"
import bg_img from "@/assets/img/others/h8_footer_shape.svg"
import Adshalaa_logo from "@/assets/img/brand/Adshalaa_footer_logo.png"

// import adshalaaImage from "./adshalaa_certification.png"
interface StyleType {
   style?: boolean;
   style_2?: boolean;
}

const FooterOne = ({ style, style_2 }: StyleType) => {
   return (
      <footer className={`footer__area ${style_2 ? "footer__area-five" : style ? "footer__area-two" : ""}`}>
         <div className={`footer__top ${style_2 ? "footer__top-three" : ""}`}>
            <div className="container">
               <div className="row">
                  {/* Left Half: Columns 1 & 2 + Address */}
                  <div className="col-lg-6">
                     <div className="row">
                        {/* Column 1 */}
                        <div className="col-sm-6">
                           <div className="footer__widget mb-4 mb-sm-2">
                              <div className="logo mb-3">
                                 <Link href="/"><Image src={Adshalaa_logo} alt="img" width={150} height={40} /></Link>
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
                        {/* Column 2 */}
                        <div className="col-sm-6">
                           <div className="footer__widget mb-4 mb-sm-2">
                              <h4 className="footer__widget-title" style={{ color: "#FFC224", marginBottom: "15px" }}>Our Company</h4>
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
                     </div>
                     {/* Address Row spanning below Column 1 and 2 */}
                     <div className="row mt-1 mb-4 mb-lg-0">
                        <div className="col-12">
                           <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "0" }}>
                              <Link
                                 href="https://www.google.com/maps/place/ADSHALAA+Advance+Digital+Marketing+Certification+Course+in+Andheri,+Mumbai/@19.1601052,72.863454,12z/data=!3m1!4b1!4m6!3m5!1s0x4b21caa1f3b88d6b:0x21c1ab798094afaa!8m2!3d19.1601052!4d72.863454!16s%2Fg%2F11zg002tph"
                                 target="_blank"
                                 style={{ color: "#dbd7d7", textDecoration: "underline" }}
                              >
                                 <i className="fas fa-map-marker-alt" style={{ marginRight: "8px", color: "#FFC224", fontSize: "20px" }}></i>
                                 B, Ground Floor, Andheri E, Saki Vihar Rd, behind Finch Restaurant, Ganesh Nagar, Marol, Andheri East, Mumbai, Maharashtra 400072
                              </Link>
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Right Half: Columns 3 & 4 */}
                  <div className="col-lg-6">
                     <div className="row">
                        {/* Column 3 */}
                        <div className="col-sm-6">
                           <div className="footer__widget mb-4 mb-sm-2">
                              <h4 className="footer__widget-title" style={{ color: "#FFC224", marginBottom: "15px" }}>Useful Links</h4>
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
                        {/* Column 4 */}
                        <div className="col-sm-6">
                           <div className="footer__widget mb-4 mb-sm-2">
                              <h4 className="footer__widget-title" style={{ color: "#FFC224", marginBottom: "15px" }}>Get In Touch</h4>
                              <div className="footer__contact-content">
                                 <p style={{ color: "#dbd7d7" }}>Have questions about our courses or admissions? <br /> Reach out. We're happy to help you find the right program.</p>
                                 <ul className="list-wrap footer__social">
                                    <Social />
                                 </ul>
                              </div>
                              <div className="app-download">
                                 <div>
                                    <Image
                                       src="/adshalaa_certification.png"
                                       alt="Certification"
                                       width={1200}
                                       height={800}
                                       style={{ width: "100%", height: "auto" }}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {style_2 && <div className="footer__shape" style={{ backgroundImage: `url(${bg_img.src})` }}></div>}
         </div>

         <div className={`footer__bottom myfooter ${style_2 ? "footer__bottom-four" : ""} `} style={{ background: "#153027" }}>
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-md-7">
                     <div className="copy-right-text">
                        <p>
                           © 2026 adshalaa.com. All rights reserved.{" "}Designed By{" "}
                           <a
                              href="https://tzar.co"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#FFC224" }}
                           >
                              Tzar Digital Agency
                           </a>
                        </p>                     </div>
                  </div>
                  <div className="col-md-5">
                     <div className="footer__bottom-menu">
                        <ul className="list-wrap">
                           <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                           <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterOne
