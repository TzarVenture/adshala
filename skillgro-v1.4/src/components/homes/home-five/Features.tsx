import BtnArrow from "@/svg/BtnArrow"
import Image from "next/image"
import Link from "next/link"
import feature_data from "@/data/home-data/FeatureData"
import InjectableSvg from "@/hooks/InjectableSvg"
import SvgDashed from "@/svg/SvgDashed"

import feature_img_1 from "@/assets/img/others/h5_features_shape01.svg"
import feature_img_2 from "@/assets/img/others/h5_features_shape02.svg"
import shape_1 from "@/assets/img/others/h5_features_item_shape.svg"
import icon_1 from "@/assets/img/icons/h5_features_icon.svg";

const Features = () => {
   return (
      <section className="features__area-six section-pt-140 section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title text-center mb-40">
                     <h2 className="title bold">Grow and expand your skills through enjoyable & imaginative</h2>
                     <p>Modorem ipsum dolor sit amet, consectetur adipisicing elitsed eius modetempor incididunt ulabore et dolore magna aliqua.</p>
                  </div>
               </div>
            </div>

            <div className="features__item-wrap-three">
               <div className="row justify-content-center">
                  {feature_data.filter((items) => items.page === "home_5").map((item) => (
                     <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                        <div className="features__item-five">
                           <div className="features__item-five-shape">
                              <div className="shape-one">
                                 <InjectableSvg src={shape_1.src} alt="" className="injectable" />
                              </div>
                              <div className="shape-two">
                                 <SvgDashed />
                              </div>
                           </div>
                           <div className="features__icon-five">
                              <i className={item.icon_2}></i>
                              <InjectableSvg src={icon_1.src} alt="" className="injectable" />
                           </div>
                           <div className="features__content-five">
                              <h2 className="title">{item.title}</h2>
                              <p>{item.desc}</p>
                              <Link href="/about-us" className="btn arrow-btn">Read More <BtnArrow /></Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="features__shape-wrap-two">
            <Image src={feature_img_1} alt="shape" className="rotateme" />
            <Image src={feature_img_2} alt="shape" />
         </div>
      </section>
   )
}

export default Features
