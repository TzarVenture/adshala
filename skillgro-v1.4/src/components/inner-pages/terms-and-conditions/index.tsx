import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import TermsAndConditions from "./TermsAndConditions"
import BrandOne from "@/components/common/brands/BrandOne"
import Feature from "@/components/homes/home-two/Feature"
import Newsletter from "@/components/homes/home-two/Newsletter"
import Features from "@/components/homes/home-one/Features"

const AboutUs = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Terms & Conditions" sub_title="Terms & Condition" />
            <TermsAndConditions />
         </main>
         <FooterOne />
      </>
   )
}

export default AboutUs
