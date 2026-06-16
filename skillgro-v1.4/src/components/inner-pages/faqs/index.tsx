import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import FaqArea from "./FaqArea"

const Faq = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            {/* <BreadcrumbOne title="All Events" sub_title="Events" /> */}
            <FaqArea />
         </main>
         <FooterOne />
      </>
   )
}

export default Faq

