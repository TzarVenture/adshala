import Image from "next/image"
import Link from "next/link"
import MobileMenu from "./MobileMenu"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import {
   FaFacebookF,
   FaInstagram,
   FaYoutube,
   FaLinkedinIn,
   FaWhatsapp,
} from "react-icons/fa";
import logo from "@/assets/img/logo/logo.svg"
import Adshalaa_logo from "@/assets/img/logo/Adshalaa_Logo.png"
interface MobileMenuProps {
   isActive: boolean;
   setIsActive: (isActive: boolean) => void;
}

const MobileSidebarInner = ({ isActive, setIsActive }: MobileMenuProps) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [query, setQuery] = useState('');
   useEffect(() => {
      setQuery(searchParams.get('q') || '');
   }, [searchParams]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedQuery = query.trim();

      if (trimmedQuery) {
         router.push(`/courses?q=${encodeURIComponent(trimmedQuery)}`);
      } else {
         router.push('/courses');
      }
   };
   return (
      <div className={isActive ? "mobile-menu-visible" : ""}>
         <div className="tgmobile__menu">
            <nav className="tgmobile__menu-box">
               <div onClick={() => setIsActive(false)} className="close-btn"><i className="tg-flaticon-close-1"></i></div>
               <div className="nav-logo">
                  {/* <Link href="/"><Image src={Adshalaa_logo} alt="Logo" /></Link> */}
               </div>
               <div className="tgmobile__search">
                  <form onSubmit={handleSubmit}>
                     <input type="text" placeholder="Search here..." onChange={(e) => setQuery(e.target.value)} />
                     <button><i className="fas fa-search"></i></button>
                  </form>
               </div>
               <div className="tgmobile__menu-outer">
                  <MobileMenu />
               </div>
               <div className="social-links">
                  <ul className="list-wrap">
                     <li><Link href="https://www.facebook.com/share/1AQin71UzP/"><i className="fab fa-facebook-f"></i></Link></li>
                     <li><Link href="https://www.instagram.com/adshalaa?igsh=MXBwcTh1ajlmYTJpaA=="><i className="fab fa-instagram"></i></Link></li>
                     <li><Link href="https://wa.me/918652199991"><i className="fab fa-whatsapp"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                     <li><Link href="https://youtube.com/@adshalaa?si=VOWVukgFbThL1GJw"><i className="fab fa-youtube"></i></Link></li>
                  </ul>
               </div>
            </nav>
         </div>
         <div className="tgmobile__menu-backdrop"></div>
      </div>
   )
}

const MobileSidebar = (props: MobileMenuProps) => {
   return (
      <Suspense fallback={null}>
         <MobileSidebarInner {...props} />
      </Suspense>
   );
};

export default MobileSidebar;
