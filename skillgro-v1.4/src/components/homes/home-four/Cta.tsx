import Image from "next/image"
import Link from "next/link"

import cta_img1 from "@/assets/img/others/h4_cta_img.png"
import cta_img2 from "@/assets/img/others/h4_cta_shape.svg"
import cta_img3 from "@/assets/img/others/h4_cta_shape02.svg"
import bg_img from "@/assets/img/bg/h4_cta_bg.jpg"

const Cta = () => {
   return (
      <section className="cta__area-two cta__bg-two" style={{ backgroundImage: `url(${bg_img.src})` }}>
         <div className="container">
            <div className="row">
               <div className="col-lg-4">
                  <div className="cta__img">
                     <Image src={cta_img1} alt="img" />
                     <div className="shape">
                        <Image src={cta_img2} alt="shape" className="rotateme" />
                     </div>
                  </div>
               </div>
               <div className="col-lg-8">
                  <div className="cta__content-two">
                     <h2 className="title">My <span>course</span> helps to become Balance <span>in life</span></h2>
                     <div className="cta__btn">
                        <Link href="/contact" className="btn">Check Available Seat</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="cta__shape">
            <Image src={cta_img3} alt="shape" />
         </div>
      </section>
   )
}

export default Cta
