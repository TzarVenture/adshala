import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import blog_img1 from "@/assets/img/blog/latest_post04.jpg"
import blog_img2 from "@/assets/img/blog/latest_post02.jpg"
import blog_img3 from "@/assets/img/blog/latest_post03.jpg"

interface DataType {
   id: number;
   thumb: StaticImageData;
   date: string;
   title: string;
   slug: string;
}[];

const latest_post_data: DataType[] = [
   {
      id: 1,
      thumb: blog_img1,
      date: "15 July, 2026",
      title: "Benefits of AI-powered advanced certification in digital marketing, graphic design, and web development.",
      slug: "blog1"
   },
   {
      id: 2,
      thumb: blog_img2,
      date: "15 July, 2026",
      title: "Digital marketing careers in India: high value, exceptional growth, and potential.",
      slug: "digital-marketing-careers-in-india"
   },
   {
      id: 3,
      thumb: blog_img3,
      date: "15 July, 2026",
      title: "Why digital marketing provides high-paying career opportunities.",
      slug: "why-digital-marketing-provides-high-paying-career-opportunities"
   }
];

const LatestPost = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Latest Post</h4>
         {latest_post_data.map((item) => (
            <div key={item.id} className="rc-post-item">
               <div className="rc-post-thumb">
                  <Link href={`/blog-details/${item.slug}`}>
                     <Image src={item.thumb} alt="img" />
                  </Link>
               </div>
               <div className="rc-post-content">
                  <span className="date"><i className="flaticon-calendar"></i> {item.date}</span>
                  <h4 className="title"><Link href={`/blog-details/${item.slug}`}>{item.title}</Link></h4>
               </div>
            </div>
         ))}
      </div>
   )
}

export default LatestPost;
