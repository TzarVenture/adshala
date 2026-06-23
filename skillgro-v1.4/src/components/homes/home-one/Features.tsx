import feature_data from "@/data/home-data/FeatureData";
import InjectableSvg from "@/hooks/InjectableSvg";
import Image from "next/image";

import graduateIcon from "@/assets/icons/1.png";
import certificateIcon from "@/assets/icons/2.png";
import laptopIcon from "@/assets/icons/3.png";

import {
//   FaLaptopCode,
//   FaCertificate,
//   FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

// const featureIcons: Record<number, React.ReactNode> = {
//   1: <FaUserGraduate size={50} color="#ffff" />,
//   2: <FaCertificate size={50} color="#fff" />,
//   3: <FaLaptopCode size={50} color="#fff" />,
//   4: <FaBriefcase size={50} color="#fff" />,

// };


const featureIcons: Record<number, React.ReactNode> = {
  1: <Image src={graduateIcon} alt="Graduate" width={80} height={50} />,
  2: <Image src={certificateIcon} alt="Certificate" width={80} height={50} />,
  3: <Image src={laptopIcon} alt="Laptop" width={80} height={50} />,
  4: <FaBriefcase size={58} color="#1a3f32" />,
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
                     <p>At Adshalaa, we transform ambition into careers through hands-on certification programs, real-world training and placement support.</p>
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
