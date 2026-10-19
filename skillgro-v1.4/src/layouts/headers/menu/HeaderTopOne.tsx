import Image from "next/image"
import Link from "next/link"

import icon_1 from "@/assets/img/icons/map_marker.svg"
import icon_2 from "@/assets/img/icons/envelope.svg"
import icon_3 from "@/assets/img/icons/phone.svg"

import { FaPhone } from "react-icons/fa6";
interface StyleType{
   style?:boolean;
}

const HeaderTopOne = ({ style }: StyleType) => {
   return (
      <div className="tg-header__top">
         <div className={`container ${style ? "" : "custom-container"}`}>
            <div className="row align-items-center">
               <div className="col-xl-5 col-lg-6">
                  <ul className="tg-header__top-info list-wrap">
                     <li><Image src={icon_1} alt="Icon" /> <span>Saki Naka, Andheri, Mumbai 400072</span></li>
                     <li><Image src={icon_2} alt="Icon" /> <Link href="mailto:info@adshalaa.com">info@adshalaa.com</Link></li>
                  </ul>
               </div>
               <div className="col-xl-7 col-lg-6">
                  <div className="tg-header__top-right">
                     <div className="tg-header__phone">
                        <FaPhone />Call us: <Link href="tel:8652199991">+91 8652199991</Link>
                     </div>
                     <ul className="tg-header__top-social list-wrap">
                        <li className="d-none d-xxl-inline-block">Follow Us On :</li>
                        <li><Link href="https://www.facebook.com/share/1AQin71UzP/"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link href="https://wa.me/917304280472"><i className="fab fa-whatsapp"></i></Link></li>
                        <li><Link href="https://www.instagram.com/adshalaa?igsh=MXBwcTh1ajlmYTJpaA=="><i className="fab fa-instagram"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        <li><Link href="https://youtube.com/@adshalaa?si=VOWVukgFbThL1GJw"><i className="fab fa-youtube"></i></Link></li>
                     </ul>
                     <div className="tg-header__top-btn">
                        <Link
                           href="/student-registration"
                           className="tg-header__top-reg-btn"
                           style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: '#ffc224',
                              color: '#13382c',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              padding: '4px 13px',
                              borderRadius: '20px',
                              lineHeight: 1.5,
                              textDecoration: 'none',
                              letterSpacing: '0.2px',
                              transition: 'all 0.25s ease',
                              boxShadow: '0 2px 6px rgba(255, 194, 36, 0.25)',
                              whiteSpace: 'nowrap'
                           }}
                        >
                           <i className="fas fa-user-graduate" style={{ fontSize: '11px' }}></i>
                           <span>Register Now</span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTopOne
