import Link from "next/link"
import InjectableSvg from "@/hooks/InjectableSvg"
import { FaLinkedin } from "react-icons/fa";
import icon_1 from "@/assets/img/icons/facebook.svg"
import icon_2 from "@/assets/img/icons/twitter.svg"
import icon_3 from "@/assets/img/icons/whatsapp.svg"
import icon_4 from "@/assets/img/icons/instagram.svg"
import icon_5 from "@/assets/img/icons/youtube.svg"
import {
   FaFacebookF,
   FaInstagram,
   FaYoutube,
   FaLinkedinIn,
   FaWhatsapp,
} from "react-icons/fa";
const Social = () => {
   // <Link href="https://www.facebook.com/share/1AQin71UzP/"><i className="fab fa-facebook-f"></i></Link></li>
   // <li><Link href="https://wa.me/918652199991"><i className="fab fa-whatsapp"></i></Link></li>
   // <li><Link href="https://www.instagram.com/adshalaa?igsh=MXBwcTh1ajlmYTJpaA=="><i className="fab fa-instagram"></i></Link></li>
   // <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
   // <li><Link href="https://youtube.com/@adshalaa?si=VOWVukgFbThL1GJw"><i className="fab fa-youtube"></i></Link></li>

   return (
      <>
         <li>
            <Link href="https://www.facebook.com/share/1AQin71UzP/" target="_blank" style={{ color: "#ffc224" }}>
               <FaFacebookF size={22} />            </Link>
         </li>
         <li>
            <Link href="https://www.instagram.com/adshalaa?igsh=MXBwcTh1ajlmYTJpaA==" target="_blank" style={{ color: "#ffc224" }}>
               <FaInstagram size={22} />            </Link>
         </li>
         <li>
            <Link href="https://wa.me/918652199991" target="_blank" style={{ color: "#ffc224" }}>
               <FaWhatsapp size={22} />            </Link>
         </li>
         <li>
            <Link href="#" target="_blank" style={{ color: "#ffc224" }}>
               <FaLinkedinIn size={22} />            </Link>
         </li>
         <li>
            <Link href="https://youtube.com/@adshalaa?si=VOWVukgFbThL1GJw" target="_blank" style={{ color: "#ffc224" }}>
               <FaYoutube size={22} />         </Link>
         </li>

      </>
   )
}

export default Social
