import Social from "@/components/common/Social"
import FooterCommon from "./FooterCommon"
import Image from "next/image"
import Link from "next/link"

import icon_1 from "@/assets/img/others/google-play.svg"
import icon_2 from "@/assets/img/others/apple-store.svg"
import bg_img from "@/assets/img/others/h8_footer_shape.svg"

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
                  <FooterCommon />
                  <div className="col-xl-3 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title" style={{color: "#FFC224"}}>Get In Touch</h4>
                        <div className="footer__contact-content">
                           <p style={{color: "#dbd7d7"}}>Have questions about our courses or admissions? <br/> Reach out. We're happy to help you find the right program.</p>
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
                           {/* <Link href="#"><Image src={icon_1} alt="img" /></Link>
                           <Link href="#"><Image src={icon_2} alt="img" /></Link> */}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {style_2 && <div className="footer__shape" style={{ backgroundImage: `url(${bg_img.src})` }}></div>}
         </div>

         <div className={`footer__bottom ${style_2 ? "footer__bottom-four" : ""}`} style={{background: "#153027"}}>
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
    style={{color: "#FFC224"}}
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
