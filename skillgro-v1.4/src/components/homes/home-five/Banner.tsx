"use client"
import BtnArrow from "@/svg/BtnArrow"
import Image from "next/image"
import Link from "next/link"

import banner_img1 from "@/assets/img/banner/h5_hero_img.png"
import banner_img2 from "@/assets/img/banner/h5_hero_shape04.svg"
import banner_img3 from "@/assets/img/banner/h5_hero_shape05.svg"
import banner_img4 from "@/assets/img/banner/h5_hero_shape06.svg"
import banner_img5 from "@/assets/img/banner/h5_hero_shape01.svg"
import banner_img6 from "@/assets/img/banner/h5_hero_shape02.svg"
import banner_img7 from "@/assets/img/banner/h5_hero_shape03.svg"
import bg_img from "@/assets/img/banner/h5_hero_bg.jpg"
import bg_img2 from "@/assets/img/banner/h5_hero_bg_shape.svg"

const Banner = () => {

   return (
      <section className="banner-area banner-bg-five tg-motion-effects" style={{ backgroundImage: `url(${bg_img.src})` }}>
         <div className="banner-bg-five-shape" style={{ backgroundImage: `url(${bg_img2.src})` }}></div>
         <div className="container">
            <div className="row justify-content-center align-items-center">
               <div className="col-xl-5 col-lg-5">
                  <div className="banner__content-five">
                     <span className="sub-title" >Kindergarten Care School</span>
                     <h2 className="title">Together We’ll Explore <span>New Things</span></h2>
                     <p>Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                     <div className="banner__btn">
                        <Link href="/courses" className="btn arrow-btn">Explore All Course <BtnArrow /></Link>
                     </div>
                  </div>
               </div>
               
               <div className="col-xl-7 col-lg-7 col-md-9 col-sm-10">
                  <div className="banner__images-five">
                     <Image src={banner_img1} alt="img" />
                     <div className="shape-wrap">
                        <div className="shape-one" >
                           <Image src={banner_img2} alt="shape" className="tg-motion-effects1" />
                        </div>
                        <div className="shape-two">
                           <Image src={banner_img3} alt="shape" className="tg-motion-effects3" />
                        </div>
                        <div className="shape-three">
                           <Image src={banner_img4} alt="shape" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="banner__shape-wrap-two">
            <Image src={banner_img5} alt="shape" />
            <Image src={banner_img6} alt="shape" className="tg-motion-effects7" />
            <Image src={banner_img7} alt="shape" className="tg-motion-effects3" />
         </div>
      </section>
   )
}

export default Banner
