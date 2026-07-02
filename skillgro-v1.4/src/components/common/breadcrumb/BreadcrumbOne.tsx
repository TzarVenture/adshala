import Image from "next/image";
import Link from "next/link";

import shape_1 from "@/assets/img/others/breadcrumb_shape01.svg";
import shape_2 from "@/assets/img/others/breadcrumb_shape02.svg";
import shape_3 from "@/assets/img/others/breadcrumb_shape03.svg";
import shape_4 from "@/assets/img/others/breadcrumb_shape04.svg";
import shape_5 from "@/assets/img/others/breadcrumb_shape05.svg";
import bg_img from "@/assets/img/bg/breadcrumb_bg.jpg";
import "./BreadcrumbOne.css"
interface StyleType {
   title: string;
   sub_title: string;
   sub_title_2?: string;
   style?: boolean;
   showCertificationImage?: boolean;
}

const BreadcrumbOne = ({
   title,
   sub_title,
   sub_title_2,
   style,
   showCertificationImage = false,
}: StyleType) => {
   const certificates = [
      "/certificate1.png",
      "/certificate2.png",
      "/certificate3.png",
      "/certificate4.png",
      "/certificate5.png",
      "/certificate6.png",
   ];

   return (
      <section
         className="breadcrumb__area breadcrumb__bg"
         style={{ backgroundImage: `url(${bg_img.src})` }}
      >
         <div className="container">
            <div
               className={`d-flex ${showCertificationImage
                  ? "flex-column flex-lg-row justify-content-between align-items-start"
                  : "flex-column"
                  }`}
            >
               {/* Left Content */}
               <div className={showCertificationImage ? "flex-grow-1" : "w-100"}>
                  <div className="breadcrumb__content">
                     <h3 className="title">{title}</h3>

                     <nav className="breadcrumb">
                        {style ? (
                           <>
                              <span property="itemListElement">
                                 <Link href="/">Home</Link>
                              </span>

                              <span className="breadcrumb-separator">
                                 <i className="fas fa-angle-right"></i>
                              </span>

                              <span property="itemListElement">
                                 <Link href="/events">{sub_title}</Link>
                              </span>

                              <span className="breadcrumb-separator">
                                 <i className="fas fa-angle-right"></i>
                              </span>

                              <span property="itemListElement">{sub_title_2}</span>
                           </>
                        ) : (
                           <>
                              <span property="itemListElement">
                                 <Link href="/">Home</Link>
                              </span>

                              <span className="breadcrumb-separator">
                                 <i className="fas fa-angle-right"></i>
                              </span>

                              <span property="itemListElement">{sub_title}</span>
                           </>
                        )}
                     </nav>
                  </div>
               </div>

               {/* Certificates */}
               {showCertificationImage && (
                  <div className="certificate-wrapper mt-4 mt-lg-0">
                     <div className="certificate-list">
                        {certificates.map((src, index) => (
                           <div
                              key={index}
                              className="certificate-item bg-white rounded-3 p-2"
                           >
                              <Image
                                 src={src}
                                 alt={`Certificate ${index + 1}`}
                                 width={70}
                                 height={90}
                              // className="img-fluid"
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>

         <div className="breadcrumb__shape-wrap">
            <Image src={shape_1} alt="img" className="alltuchtopdown" />
            <Image src={shape_2} alt="img" />
            <Image src={shape_3} alt="img" />
            <Image src={shape_4} alt="img" />
            <Image src={shape_5} alt="img" />
         </div>
      </section>
   );
};

export default BreadcrumbOne;