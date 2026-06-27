import TermsAndConditions from "@/components/inner-pages/terms-and-conditions";

import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Terms & Conditions Adshalaa",
};
const page = () => {
   return (
      <Wrapper>
         <TermsAndConditions />
      </Wrapper>
   )
}

export default page