"use client"
import Image from "next/image"
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"
import InjectableSvg from "@/hooks/InjectableSvg";

import banner_img3 from "@/assets/img/banner/h4_hero_img.png"
import banner_img4 from "@/assets/img/banner/h4_hero_img_shape01.svg"
import banner_img5 from "@/assets/img/banner/h4_hero_img_shape02.svg"
import banner_img6 from "@/assets/img/banner/h4_hero_shape01.svg"
import banner_img7 from "@/assets/img/banner/h4_hero_shape02.svg"
import banner_img8 from "@/assets/img/banner/h4_hero_shape03.svg"
import shape from "@/assets/img/banner/h4_title_shape.svg"
import icon_1 from "@/assets/img/icons/phone.svg";
import bg_img from "@/assets/img/banner/h4_hero_bg.jpg"

const Banner = () => {

   return (
      <section className="banner-area banner-bg-four tg-motion-effects" style={{ backgroundImage: `url(${bg_img.src})` }}>
         <div className="container">
            <div className="row justify-content-center align-items-start">
               <div className="col-xl-5 col-lg-6">
                  <div className="banner__content-four">
                     <h6 className="sub-title">Hi, Im</h6>
                     <h2 className="title">Jecov Rossy
                        <span className="title__shape">
                           <InjectableSvg src={shape.src} alt="" className="injectable" />
                        </span>
                     </h2>
                     <span className="sub-title-two" >Personal Yoga Coach</span>
                     <p>I’m here to help you find the confidence you need to feel amazing in your body!when an unknown printer took a galley of type and scrambled it ecimen has survived not onlyled it to make.</p>
                     <div className="banner__btn-wrap-two">
                        <Link href="/courses" className="btn arrow-btn">Find Your Class <BtnArrow /></Link>
                        <div className="banner__contact">
                           <div className="icon">
                              <InjectableSvg src={icon_1.src} alt="" className="injectable" />
                           </div>
                           <div className="content">
                              <span>Booking Open</span>
                              <Link href="tel:0123456789">+1 (123) 909090</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-xl-7 col-lg-6 col-md-9 col-sm-10">
                  <div className="banner__images-four">
                     <Image src={banner_img3} alt="img" className="main-img" />
                     <div className="shape big-shape">
                        <Image src={banner_img4} alt="shape" />
                     </div>
                     <div className="shape big-shape-two">
                        <Image src={banner_img5} alt="shape" className="tg-motion-effects5" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="banner__shape-wrap">
            <Image src={banner_img6} alt="shape" />
            <Image src={banner_img7} alt="shape" />
            <Image src={banner_img8} alt="shape" className="tg-motion-effects4" />
         </div>
      </section>
   )
}

export default Banner
