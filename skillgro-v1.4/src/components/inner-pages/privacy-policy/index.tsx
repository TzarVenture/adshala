import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import PrivacyPolicy from "./PrivacyPolicy"

const PrivacyPolicyPage = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Privacy Policy" sub_title="Privacy Policy" />
            <PrivacyPolicy />
         </main>
         <FooterOne />
      </>
   )
}

export default PrivacyPolicyPage
