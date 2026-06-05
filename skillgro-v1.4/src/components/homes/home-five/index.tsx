import Banner from "./Banner"
import Features from "./Features"
import About from "./About"
import Courses from "./Courses"
import Faq from "./Faq"
import Instructor from "./Instructor"
import Blog from "./Blog"
import Testimonial from "./Testimonial"
import FooterThree from "@/layouts/footers/FooterThree"
import HeaderFive from "@/layouts/headers/HeaderFive"
import HeaderOne from "@/layouts/headers/HeaderOne"
import HeaderTwo from "@/layouts/headers/HeaderTwo"
// import HeaderThree from "@/layouts/headers/HeaderThree"
// import HeaderFour from "@/layouts/headers/HeaderFour"
// import HeaderSix from "@/layouts/headers/HeaderSix"
// import HeaderSeven from "@/layouts/headers/HeaderSeven"
// import HeaderEight from "@/layouts/headers/HeaderEight"

const HomeFive = () => {
   return (
      <>
         <HeaderFive /> 
         <main className="main-area fix">
            <Banner />
            <Features />
            <About/>
            <Courses />
            <Faq />
            <Instructor />
            <Testimonial />
            <Blog />
         </main>
         <FooterThree />
      </>
   )
}

export default HomeFive
