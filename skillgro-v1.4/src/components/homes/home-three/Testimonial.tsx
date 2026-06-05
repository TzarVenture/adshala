import CommonTestimonialtwo from '@/components/common/CommonTestimonialtwo';
import bg_img from "@/assets/img/bg/testimonials_bg.jpg"

const Testimonial = () => {
  return (
    <section className="testimonial__area-two section-py-120 testimonial__bg" style={{ backgroundImage: `url(${bg_img.src})` }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div className="section__title text-center mb-50">
              <span className="sub-title">Our Testimonials</span>
              <h2 className="title">What Students Think and Say About SkillGrow</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="testimonial__item-wrap">
              <CommonTestimonialtwo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
