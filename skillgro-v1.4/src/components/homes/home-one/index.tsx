'use client'
import BrandOne from "@/components/common/brands/BrandOne"
import Banner from "./Banner"
import About from "./About"
import CourseArea from "./CourseArea"
import Newsletter from "./Newsletter"
import Instructor from "./Instructor"
import Counter from "./Counter"
import FaqArea from "./FaqArea"
import EnquiryForm from "./EnquiryForm"
import Features from "./Features"
import InstructorTwo from "./InstructorTwo"
import Blog from "./Blog"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Categories from "./Categories"
import { useEffect } from "react"
const HomeOne = () => {
   useEffect(() => {
      if (window.location.hash === "#enquiry-form01") {
         setTimeout(() => {
            document.getElementById("enquiry-form01")?.scrollIntoView({ behavior: "smooth", block: "start" });
         }, 300); // small delay lets the page render first
      }
   }, []);
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <Banner />
            <Categories />
            <BrandOne />
            <About />
            <CourseArea />
            <Newsletter />
            {/* <Instructor /> */}
            <Counter />
            <FaqArea />
            <Features />
            <InstructorTwo />
            <EnquiryForm />
            {/* <Blog /> */}
         </main>
         <FooterOne />
      </>
   )
}

export default HomeOne
