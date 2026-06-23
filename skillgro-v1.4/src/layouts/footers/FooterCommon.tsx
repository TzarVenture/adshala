import Link from "next/link"
import Image from "next/image"

import Adshalaa_logo from "@/assets/img/logo/Adshalaa_Logo.png"
import logo from "@/assets/img/logo/secondary_logo.svg"
import { RiExternalLinkLine } from "react-icons/ri";

const FooterCommon = () => {
   return (
      <>
         <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="footer__widget">
               <div className="logo mb-35">
                  <Link href="/"><Image src={Adshalaa_logo} alt="img" width={153} height={40} /></Link>
               </div>
               <div className="footer__content" >
                  <p style={{color: "#1b4322"}}>when an unknown printer took galley of type and scrambled it to make pspecimen bookt has.</p>
                  <ul className="list-wrap">
<li>
  <Link
    href="https://www.google.com/maps/place/ADSHALAA+Advance+Digital+Marketing+Certification+Course+in+Andheri,+Mumbai/@19.1601052,72.863454,12z/data=!3m1!4b1!4m6!3m5!1s0x4b21caa1f3b88d6b:0x21c1ab798094afaa!8m2!3d19.1601052!4d72.863454!16s%2Fg%2F11zg002tph"
    target="_blank"
    style={{ color: "#1b4322", textDecoration: "none" }}
  >
    Saki Vihar, Andheri East 400072{" "}
    <RiExternalLinkLine style={{ verticalAlign: "middle" }} />
  </Link>
</li>                     <li style={{color: "#1b4322"}}>+91 8652199991/ +91 7760775875</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title" style={{color: "#1b4322"}}>Useful Links</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="/events-details" style={{color: "#1b4322"}}>Our values</Link></li>
                     <li><Link href="/events-details" style={{color: "#1b4322"}}>Our advisory board</Link></li>
                     <li><Link href="/events-details" style={{color: "#1b4322"}}>Our partners</Link></li>
                     <li><Link href="/events-details" style={{color: "#1b4322"}}>Become a partner</Link></li>
                     <li><Link href="/events-details" style={{color: "#1b4322"}}>Work at Future Learn</Link></li>
                     <li><Link href="/events-details" style={{color: "#1b4322"}}>Quizlet Plus</Link></li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title" style={{color: "#1b4322"}}>Our Company</h4>
               <div className="footer__link">
                  <ul className="list-wrap" >
                     <li><Link href="/contact" style={{color: "#1b4322"}}>Contact Us</Link></li>
                     <li><Link href="/instructor-details" style={{color: "#1b4322"}}>Become Teacher</Link></li>
                     <li><Link href="/blog" style={{color: "#1b4322"}}>Blog</Link></li>
                     <li><Link href="/instructor-details" style={{color: "#1b4322"}}>Instructor</Link></li>
                     <li><Link href="/events-details" style={{color: "#1b4322"}}>Events</Link></li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

export default FooterCommon
