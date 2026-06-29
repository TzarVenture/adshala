import Link from "next/link"
import InjectableSvg from "@/hooks/InjectableSvg"
import { FaLinkedin } from "react-icons/fa";
import icon_1 from "@/assets/img/icons/facebook.svg"
import icon_2 from "@/assets/img/icons/twitter.svg"
import icon_3 from "@/assets/img/icons/whatsapp.svg"
import icon_4 from "@/assets/img/icons/instagram.svg"
import icon_5 from "@/assets/img/icons/youtube.svg"

const Social = () => {
   // <Link href="https://www.facebook.com/share/1AQin71UzP/"><i className="fab fa-facebook-f"></i></Link></li>
   // <li><Link href="https://wa.me/918652199991"><i className="fab fa-whatsapp"></i></Link></li>
   // <li><Link href="https://www.instagram.com/adshalaa?igsh=MXBwcTh1ajlmYTJpaA=="><i className="fab fa-instagram"></i></Link></li>
   // <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
   // <li><Link href="https://youtube.com/@adshalaa?si=VOWVukgFbThL1GJw"><i className="fab fa-youtube"></i></Link></li>
              
   return (
      <>
         <li>
             <Link href="https://www.facebook.com/share/1AQin71UzP/" target="_blank" style={{color: "#ffc224"}}>
               <InjectableSvg src={icon_1.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank" style={{color: "#ffc224"}}>
               <InjectableSvg src={icon_2.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank" style={{color: "#ffc224"}}>
               <InjectableSvg src={icon_3.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank" style={{color: "#ffc224"}}>
               <InjectableSvg src={icon_4.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank" style={{color: "#ffc224"}}>
               <InjectableSvg src={icon_5.src} alt="img" className="injectable" />
            </Link>
         </li>
      </>
   )
}

export default Social
