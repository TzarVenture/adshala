import Image from "next/image"
import Link from "next/link"
import MobileMenu from "./MobileMenu"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import Adshalaa_nav_logo from "@/assets/img/brand/Adshalaa_nav_logo.png"
import { CONTACT_PHONES, INSTITUTE } from "@/config/institute"
import "./mobile-sidebar.css"
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
         <div className="tgmobile__menu msb">
            <nav className="tgmobile__menu-box msb-box">
               {/* Header: logo + close */}
               <div className="msb-head">
                  <Link href="/" onClick={() => setIsActive(false)} className="msb-logo">
                     <Image src={Adshalaa_nav_logo} alt="Adshalaa" width={150} height={43} />
                  </Link>
                  <button type="button" onClick={() => setIsActive(false)} className="msb-close" aria-label="Close menu">
                     <i className="tg-flaticon-close-1"></i>
                  </button>
               </div>

               {/* Search */}
               <div className="tgmobile__search msb-search">
                  <form onSubmit={handleSubmit}>
                     <input type="text" placeholder="Search for a course..." value={query} onChange={(e) => setQuery(e.target.value)} />
                     <button aria-label="Search"><i className="fas fa-search"></i></button>
                  </form>
               </div>

               {/* Navigation */}
               <div className="tgmobile__menu-outer msb-nav">
                  <MobileMenu />
               </div>

               {/* Actions */}
               <div className="msb-actions">
                  <Link href="/student-registration" onClick={() => setIsActive(false)} className="msb-btn msb-btn--gold">
                     <i className="fas fa-user-graduate"></i>
                     <span>Student Registration</span>
                  </Link>
               </div>

               {/* Call us */}
               <div className="msb-contact">
                  <div className="msb-contact-title">Call us</div>
                  <ul className="msb-phones">
                     {CONTACT_PHONES.map((phone) => (
                        <li key={phone.tel}>
                           <a href={`tel:${phone.tel}`}>
                              <i className="fas fa-phone-alt"></i>
                              <span>{phone.display}</span>
                           </a>
                        </li>
                     ))}
                  </ul>
                  <a href="mailto:info@adshalaa.com" className="msb-mail">
                     <i className="fas fa-envelope"></i>
                     <span>info@adshalaa.com</span>
                  </a>
                  <a href={INSTITUTE.mapUrl} target="_blank" rel="noopener noreferrer" className="msb-mail">
                     <i className="fas fa-map-marker-alt"></i>
                     <span>Saki Naka, Andheri East, Mumbai 400072</span>
                  </a>
               </div>

               {/* Social */}
               <div className="social-links msb-social">
                  <ul className="list-wrap">
                     <li><Link href="https://www.facebook.com/share/1AQin71UzP/"><i className="fab fa-facebook-f"></i></Link></li>
                     <li><Link href="https://www.instagram.com/adshalaa?igsh=MXBwcTh1ajlmYTJpaA=="><i className="fab fa-instagram"></i></Link></li>
                     <li><Link href="https://wa.me/917304280472"><i className="fab fa-whatsapp"></i></Link></li>
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
