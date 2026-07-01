import Image from "next/image"
import Link from "next/link";

import shape_1 from "@/assets/img/others/breadcrumb_shape01.svg";
import shape_2 from "@/assets/img/others/breadcrumb_shape02.svg";
import shape_3 from "@/assets/img/others/breadcrumb_shape03.svg";
import shape_4 from "@/assets/img/others/breadcrumb_shape04.svg";
import shape_5 from "@/assets/img/others/breadcrumb_shape05.svg";
import bg_img from "@/assets/img/bg/breadcrumb_bg.jpg";

import bg_image from "./adshalaa_certification.png"
interface StyleType {
   title: string;
   sub_title: string;
   sub_title_2?: string;
   style?: boolean;
   showCertificationImage?: boolean;
}

const BreadcrumbOne = ({ title, sub_title, sub_title_2, style, showCertificationImage = false }: StyleType) => {
   return (
      <section className="breadcrumb__area breadcrumb__bg" style={{ backgroundImage: `url(${bg_img.src})` }}>
         <div className="container">
            <div className="row align-items-center">
               <div className={showCertificationImage ? "col-12 col-lg-7" : "col-12"}>
                  <div className="breadcrumb__content">
                     <h3 className="title">{title}</h3>
                     <nav className="breadcrumb">
                        {
                           style ? (
                              <>
                                 <span property="itemListElement">
                                    <Link href="/">Home</Link>
                                 </span>
                                 <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                                 <span property="itemListElement">
                                    <Link href="/events">{sub_title}</Link>
                                 </span>
                                 <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                                 <span property="itemListElement">{sub_title_2}</span>
                              </>
                           ) : (
                              <>
                                 <span property="itemListElement">
                                    <Link href="/">Home</Link>
                                 </span>
                                 <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                                 <span property="itemListElement">{sub_title}</span>
                              </>
                           )
                        }
                     </nav>
                  </div>
               </div>
               {showCertificationImage && (
                  <div className="col-12 col-lg-5 d-flex justify-content-lg-end justify-content-center mt-4 mt-lg-1 gap-3">
                     {/* <Image
                        src="/adshalaa_certification.png"
                        alt="Certification"
                        width={500}
                        height={180}
                        className="img-fluid"
                        style={{ maxHeight: "180px", objectFit: "contain" }}
                     /> */}
                     <div className="img1 d-flex justify-content-center align-items-center bg-white rounded-3 p-3">
                        <Image src="/certificate1.png" alt="Certification" width={500} height={100} className="img-fluid" />
                     </div>
                     <div className="img2 bg-white rounded-3 p-3">
                        <Image src="/certificate2.png" alt="Certification" width={500} height={100} className="img-fluid" />
                     </div>
                     <div className="img3 bg-white rounded-3 p-3">
                        <Image src="/certificate3.png" alt="Certification" width={500} height={100} className="img-fluid" />
                     </div>
                     <div className="img4 bg-white rounded-3 p-3">
                        <Image src="/certificate4.png" alt="Certification" width={500} height={100} className="img-fluid" />
                     </div>
                     <div className="img4 bg-white rounded-3 p-3">
                        <Image src="/certificate5.png" alt="Certification" width={500} height={100} className="img-fluid" />
                     </div>
                     <div className="img4 bg-white rounded-3 p-3">
                        <Image src="/certificate6.png" alt="Certification" width={500} height={100} className="img-fluid" />
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
   )
}

export default BreadcrumbOne
