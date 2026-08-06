import Image from "next/image"
import Link from "next/link"
import BlogAuthor from "./BlogAuthor"
import BlogPostComment from "./BlogPostComment"
import BlogForm from "@/forms/BlogForm"
import BlogSidebar from "../blog-common/BlogSidebar"

import Blog1DetailsArea from "./blog1/BlogDetailsArea";
import Blog2DetailsArea from "./blog2/BlogDetailsArea";
import Blog3DetailsArea from "./blog3/BlogDetailsArea";

import blog_img1 from "@/assets/img/blog/blog_details.jpg"

interface BlogDetailsAreaProps {
   single_blog?: any;
   id?: string;
}

const BlogDetailsArea = ({ single_blog, id }: BlogDetailsAreaProps) => {
   const blogIdentifier = id || single_blog?.slug || String(single_blog?.id || "");

   // ─────────────────────────────────────────────────────────────────────
   // Component Switcher per Blog (Matches CourseDetailsArea.tsx pattern)
   // Add your custom blog detail components below as you create new blogs:
   // ─────────────────────────────────────────────────────────────────────
   if (
      blogIdentifier === "blog1" || 
      blogIdentifier === "1" || 
      blogIdentifier === "benefits-ai-powered-advanced-certification" || 
      single_blog?.id === 1 || 
      single_blog?.id === 101
   ) {
      return <Blog1DetailsArea />;
   }

   if (
      blogIdentifier === "blog2" || 
      blogIdentifier === "2" || 
      blogIdentifier === "digital-marketing-careers-in-india" || 
      single_blog?.id === 2
   ) {
      return <Blog2DetailsArea />;
   }

   if (
      blogIdentifier === "blog3" || 
      blogIdentifier === "3" || 
      blogIdentifier === "why-digital-marketing-provides-high-paying-career-opportunities" || 
      single_blog?.id === 3
   ) {
      return <Blog3DetailsArea />;
   }

   // Default / Fallback Blog Details View
   return (
      <section className="blog-details-area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-xl-9 col-lg-8">
                  <div className="blog__details-wrapper">
                     <div className="blog__details-thumb">
                        <Image src={single_blog?.thumb || blog_img1} alt={single_blog?.title || "img"} />
                     </div>
                     <div className="blog__details-content">
                        <div className="blog__post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i> {single_blog?.date || "20 July, 2024"}</li>
                              <li><i className="flaticon-user-1"></i> by <a href="#">Admin</a></li>
                              <li><i className="flaticon-clock"></i> 5 Min Read</li>
                              <li><i className="far fa-comment-alt"></i> 05 Comments</li>
                           </ul>
                        </div>
                        <h3 className="title">{single_blog?.title || "How To Become Ridiculously Self-Aware In 20 Minutes"}</h3>
                        <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae in tristique libero, quis ultrices diamraesent varius diam dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra.Maximus ligula eleifend.</p>
                        <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae in tristique libero, quis ultrices diamraesent varius diam dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra.Maximus ligula eleifend.</p>
                        <blockquote>
                           <p>“ urabitur varius eros rutrum consequat Mauris areathe sollicitudin enim condimentum luctus enim justo non molestie nisl ”</p>
                        </blockquote>
                        <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
                        <div className="blog__details-bottom">
                           <div className="row align-items-center">
                              <div className="col-xl-6 col-md-7">
                                 <div className="tg-post-tag">
                                    <h5 className="tag-title">Tags :</h5>
                                    <ul className="list-wrap p-0 mb-0">
                                       <li><Link href="#">{single_blog?.tag || "Education"}</Link></li>
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
                                       <li><Link href="#"><i className="fab fa-pinterest-p"></i></Link></li>
                                    </ul>
                                 </div>
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
               <BlogSidebar />
            </div>
         </div>
      </section>
   )
}

export default BlogDetailsArea;
