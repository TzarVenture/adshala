"use client"
import Image from "next/image";
import InjectableSvg from '@/hooks/InjectableSvg';
import useSvgAnimation from '@/hooks/useSvgAnimation';
import CommonTestimonial from '@/components/common/CommonTestimonial';

import testi_img1 from "@/assets/img/others/h6_testimonial_img.jpg";
import icon_1 from "@/assets/img/icons/star.svg";
import icon_2 from "@/assets/img/icons/quote02.svg";

const Testimonial = () => {

   const svgIconRef = useSvgAnimation('/svg-animation-img/h6_testimonial_shape.svg');

   return (
      <section className="testimonial__area-five section-pb-130">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-xl-5 col-lg-6 col-md-8">
                  <div className="testimonial__img-three tg-svg" ref={svgIconRef}>
                     <div className="testimonial__mask-img">
                        <Image src={testi_img1} alt="img" />
                     </div>
                     <div className="banner__review">
                        <div className="icon">
                           <InjectableSvg src={icon_1.src} alt="" className="injectable" />
                        </div>
                        <h6 className="title">4.9/5 <span>Real Reviews</span></h6>
                     </div>
                     <div className="testimonial__img-icon">
                        <InjectableSvg src={icon_2.src} alt="" className="injectable" />
                     </div>
                     <span className="svg-icon"></span>
                  </div>
               </div>
               <div className="col-xl-7 col-lg-6">
                  <div className="testimonial__content-three">
                     <div className="section__title mb-25">
                        <span className="sub-title">Testimonials</span>
                        <h2 className="title bold">What’s our client Say <br /> About us</h2>
                     </div>
                     <CommonTestimonial />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Testimonial
