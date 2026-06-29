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
            <div className="row">
               <div className="col-lg-6">
                  <ul className="tg-header__top-info list-wrap">
                     <li><Image src={icon_1} alt="Icon" /> <span>Saki Naka, Andheri, Mumbai 400072</span></li>
                     <li><Image src={icon_2} alt="Icon" /> <Link href="mailto:hello@adshalaa.com">hello@adshalaa.com</Link></li>
                  </ul>
               </div>
               <div className="col-lg-6">
                  <div className="tg-header__top-right">
                     <div className="tg-header__phone">
                        <FaPhone />Call us: <Link href="tel:8652199991">+91 8652199991</Link>
                     </div>
                     <ul className="tg-header__top-social list-wrap">
                        <li>Follow Us On :</li>
                        <li><Link href="https://www.facebook.com/share/1AQin71UzP/"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link href="https://wa.me/918652199991"><i className="fab fa-whatsapp"></i></Link></li>
                        <li><Link href="https://www.instagram.com/adshalaa?igsh=MXBwcTh1ajlmYTJpaA=="><i className="fab fa-instagram"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        <li><Link href="https://youtube.com/@adshalaa?si=VOWVukgFbThL1GJw"><i className="fab fa-youtube"></i></Link></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTopOne
