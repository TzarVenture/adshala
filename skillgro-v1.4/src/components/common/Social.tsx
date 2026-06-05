import Link from "next/link"
import InjectableSvg from "@/hooks/InjectableSvg"

import icon_1 from "@/assets/img/icons/facebook.svg"
import icon_2 from "@/assets/img/icons/twitter.svg"
import icon_3 from "@/assets/img/icons/whatsapp.svg"
import icon_4 from "@/assets/img/icons/instagram.svg"
import icon_5 from "@/assets/img/icons/youtube.svg"

const Social = () => {
   return (
      <>
         <li>
             <Link href="https://www.facebook.com/" target="_blank">
               <InjectableSvg src={icon_1.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank">
               <InjectableSvg src={icon_2.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank">
               <InjectableSvg src={icon_3.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank">
               <InjectableSvg src={icon_4.src} alt="img" className="injectable" />
            </Link>
         </li>
         <li>
            <Link href="https://www.facebook.com/" target="_blank">
               <InjectableSvg src={icon_5.src} alt="img" className="injectable" />
            </Link>
         </li>
      </>
   )
}

export default Social
