import feature_data from "@/data/home-data/FeatureData";
import InjectableSvg from "@/hooks/InjectableSvg";
import {
  FaLaptopCode,
  FaCertificate,
  FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

const featureIcons: Record<number, React.ReactNode> = {
  1: <FaUserGraduate size={50} color="#ffff" />,
  2: <FaCertificate size={50} color="#fff" />,
  3: <FaLaptopCode size={50} color="#fff" />,
  4: <FaBriefcase size={50} color="#fff" />,

};

const Features = () => {
   return (
      <section className="features__area">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title white-title text-center mb-50">
                     <span className="sub-title">Why Choose Adshalaa</span>
                     <h2 className="title">Start your Learning Journey Today!</h2>
                     <p>At Adshalaa, we turn ambition into a career. Whether you're a student, a fresher or a working professional, our hands-on certification programs give you the skills, experience and placement support you need to succeed in today's digital world.</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               {feature_data.filter((items) => items.page === "home_1").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                     <div className="features__item">
                       <div className="features__icon">
  {featureIcons[item.id]}
</div>
                        <div className="features__content">
                           <h4 className="title">{item.title}</h4>
                           <p>{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Features;
