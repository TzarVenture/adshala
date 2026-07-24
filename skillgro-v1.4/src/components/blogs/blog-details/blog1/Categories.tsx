import Link from "next/link";

const categories_data: string[] = [
   "Digital Marketing & AI",
   "Graphic Design",
   "Web Development",
   "Career Growth & Placements",
   "Paid Internship",
   "Skill Certifications"
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
