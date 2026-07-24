import Link from "next/link";

const categories_data: string[] = [
   "Digital Marketing Careers",
   "SEO & Performance Marketing",
   "Social Media & Ads",
   "E-commerce Marketing",
   "Analytics & Automation",
   "Career Growth in India"
];

const Categories = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Categories</h4>
         <div className="shop-cat-list">
            <ul className="list-wrap">
               {categories_data.map((cat, i) => (
                  <li key={i}>
                     <Link href="/courses"><i className="flaticon-angle-right"></i>{cat}</Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default Categories;
