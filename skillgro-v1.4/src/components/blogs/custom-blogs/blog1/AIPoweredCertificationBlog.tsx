import Image from "next/image";
import Link from "next/link";
import BlogAuthor from "../../blog-details/BlogAuthor";
import BlogPostComment from "../../blog-details/BlogPostComment";
import BlogForm from "@/forms/BlogForm";
import blog_img1 from "@/assets/img/blog/blog_details.jpg";
import { BlogDataType } from "@/data/inner-data/BlogData";

interface Props {
   blog?: BlogDataType;
}

const AIPoweredCertificationBlog = ({ blog }: Props) => {
   return (
      <div className="blog__details-wrapper">
         <div className="blog__details-thumb">
            <Image src={blog?.thumb || blog_img1} alt={blog?.title || "AI-powered Certification"} />
         </div>
         <div className="blog__details-content">
            <div className="blog__post-meta">
               <ul className="list-wrap">
                  <li><i className="flaticon-calendar"></i> {blog?.date || "20 July, 2024"}</li>
                  <li><i className="flaticon-user-1"></i> by <a href="#">AdShalaa Expert</a></li>
                  <li><i className="flaticon-clock"></i> 6 Min Read</li>
               </ul>
            </div>

            <h3 className="title">
               {blog?.title || "Benefits of AI-powered advanced certification in digital marketing, graphic design, and web development"}
            </h3>

            <p>
               In today's fast-paced digital era, artificial intelligence is reshaping how businesses market their brands, create visual assets, and build web applications. Mastering AI tools in Digital Marketing, Graphic Design, and Web Development gives students and professionals an unmatched competitive edge.
            </p>

            <blockquote>
               <p>“ AI is not replacing creative professionals; professionals leveraging AI are replacing those who don't. ”</p>
            </blockquote>

            <p>
               AdShalaa's AI-integrated advanced certification program is designed to provide practical, hands-on experience with industry-standard AI software, prompt engineering, and automated campaign workflows.
            </p>

            <div className="blog__details-content-inner">
               <h4 className="inner-title">Key Benefits of AI-Powered Advanced Certification</h4>
               <ul className="about__info-list list-wrap">
                  <li className="about__info-list-item">
                     <i className="flaticon-angle-right"></i>
                     <p className="content"><strong>Digital Marketing:</strong> AI-driven audience targeting, automated content creation, and real-time performance analytics.</p>
                  </li>
                  <li className="about__info-list-item">
                     <i className="flaticon-angle-right"></i>
                     <p className="content"><strong>Graphic Design:</strong> Generative AI tools (Midjourney, Photoshop AI, Canvas Magic) for rapid visual asset generation.</p>
                  </li>
                  <li className="about__info-list-item">
                     <i className="flaticon-angle-right"></i>
                     <p className="content"><strong>Web Development:</strong> AI coding assistants, automated UI/UX scaffolding, and smart full-stack deployment pipelines.</p>
                  </li>
               </ul>
            </div>

            {/* Course CTA Banner */}
            <div style={{
               backgroundColor: "#f4f7fa",
               borderRadius: "12px",
               padding: "30px",
               marginTop: "30px",
               marginBottom: "30px",
               borderLeft: "4px solid #5751e1"
            }}>
               <h4 style={{ fontSize: "20px", fontWeight: "700", color: "#1c1d20" }}>Ready to Master AI in Digital Marketing & Design?</h4>
               <p style={{ margin: "10px 0 20px" }}>Join AdShalaa's Mumbai campus for hands-on mentorship, live projects, and 100% placement support.</p>
               <Link href="/contact" className="btn arrow-btn">
                  Enquire Now <i className="flaticon-arrow-right"></i>
               </Link>
            </div>

            <div className="blog__details-bottom">
               <div className="row align-items-center">
                  <div className="col-xl-6 col-md-7">
                     <div className="tg-post-tag">
                        <h5 className="tag-title">Tags :</h5>
                        <ul className="list-wrap p-0 mb-0">
                           <li><Link href="#">AI Marketing</Link></li>
                           <li><Link href="#">Graphic Design</Link></li>
                           <li><Link href="#">Web Dev</Link></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-xl-6 col-md-5">
                     <div className="tg-post-social justify-content-start justify-content-md-end">
                        <h5 className="social-title">Share :</h5>
                        <ul className="list-wrap p-0 mb-0">
                           <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <BlogAuthor />

         <div className="blog-post-comment">
            <BlogPostComment />
            <BlogForm />
         </div>
      </div>
   );
};

export default AIPoweredCertificationBlog;
