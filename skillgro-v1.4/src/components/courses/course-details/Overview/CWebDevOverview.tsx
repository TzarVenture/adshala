const Overview = () => {
   return (
      <div className="courses__overview-wrap">
         <h3 className="title">Course Description</h3>

         <p>
            The Web Development Certification is a comprehensive, hands-on program designed
            to take you from complete beginner to building fully functional, professional
            websites and online stores, no coding required. Focused entirely on WordPress
            and Shopify, you'll learn to design, customize, launch and manage websites and
            e-commerce stores through live projects and real client-style builds. The course
            is backed by a 1-month paid internship and 100% placement support to help you
            transition smoothly into a web development career.
         </p>

         <h3 className="title">What you&apos;ll learn in this course?</h3>

         <p>
            This program covers WordPress and Shopify end-to-end combining website design,
            e-commerce setup, SEO, marketing tools and store management so you can build and
            run any professional website or online store independently.
         </p>

         <ul className="about__info-list list-wrap">
            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">
                  Build and customize professional websites on WordPress from scratch
               </p>
            </li>

            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">
                  Design pages using Elementor and popular WordPress themes
               </p>
            </li>

            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">
                  Set up and manage complete e-commerce stores on WooCommerce and Shopify
               </p>
            </li>

            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">
                  Configure payments, shipping and checkout for online stores
               </p>
            </li>

            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">
                  Optimize websites for speed, SEO and performance
               </p>
            </li>

            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">
                  Use AI tools to speed up website building, content creation and design
               </p>
            </li>
         </ul>

         <p className="last-info">
            By the end of the course, you'll be able to independently design, launch and
            manage WordPress websites and Shopify stores, handle real client projects and
            use AI tools to work more efficiently—skills directly applicable to WordPress
            Developer, Shopify Developer and freelance web development roles.
         </p>
      </div>
   );
};

export default Overview;