import Image from "next/image"
import Link from "next/link"
import BlogAuthor from "../BlogAuthor"
import BlogPostComment from "../BlogPostComment"
import BlogForm from "@/forms/BlogForm"
import BlogSidebar from "./BlogSidebar"

import blog_img1 from "@/assets/img/blog/blog_details.jpg"

const BlogDetailsArea = () => {
   return (
      <section className="blog-details-area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-xl-9 col-lg-8">
                  <div className="blog__details-wrapper">
                     <div className="blog__details-thumb">
                        <Image src={blog_img1} alt="Benefits of AI-powered advanced certification" />
                     </div>
                     <div className="blog__details-content">
                        <div className="blog__post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i> 24 July, 2026</li>
                              <li><i className="flaticon-clock"></i> 5 Min Read</li>
                           </ul>
                        </div>
                        <h3 className="title">Benefits of AI-powered advanced certification in digital marketing, graphic design, and web development.</h3>

                        <p style={{ fontWeight: "600" }}>
                           Call us for more information.<br />
                           Saki Vihar, Andheri East, Mumbai 400072<br />
                           <a href="tel:+918652199991">+91 8652199991</a> / <a href="tel:+917760775875">+91 7760775875</a>
                        </p>

                        <blockquote>
                           <p>“ Future-proof your career. Learn in-demand skills. Build your portfolio. Get certified. Get 100% placement guarantee. Start creating opportunities today. All possible with Adshalaa. ”</p>
                        </blockquote>

                        <p><strong>Hurry, limited seats are available. Our upcoming batch is going to start on 15th July, 2026.</strong></p>

                        <p>Dear students of BCOM, BBA, BA, BMC, AND BSC, are you tired of working the same regular job for a very low salary? Do you want to boost your career in a new and creative way, or do you already have an idea of joining a digital marketing course for an upgraded future? Then you are at the right place. We have launched a learning platform called Adshalaa where you can become a master of digital marketing. As we are an almost 10-year-old digital marketing company (Tzar Venture Digital Agency) located in Andheri East, Mumbai, we are overly experienced in digital marketing, website development and graphic design. Our team of employees and teachers are extremely competent in their field of expertise.</p>

                        <p>Not only will you get a proper certification in a particular department, but also a one-month paid internship and a 100% job placement guarantee with a generous annual package.</p>

                        <div className="blog__details-content-inner">
                           <h4 className="inner-title">Create Limitless Career Opportunities</h4>
                           <p>Step into the world of creativity and excellence and build your future with our AI-powered advanced certification programme in digital marketing, graphic design, and web development. A comprehensive, industry-focused course is designed to prepare you for the real-world challenges and today’s digital economy and tomorrow’s opportunities.</p>
                           <p>We all know that every industry rapidly adopts artificial intelligence and digital technologies; professionals with expertise in AI-powered marketing, creative graphic designs, and modern web development are among the most sought-after talent worldwide. This program equips you with practical, job-ready skills through live projects, real-world case studies, industry-standard tools, and expert mentorship.</p>
                        </div>

                        <div className="blog__details-content-inner">
                           <h4 className="inner-title">Why Choose Adshalaa?</h4>
                           <ul className="about__info-list list-wrap">
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Master AI-powered Digital Marketing strategies, SEO, Social Media Marketing, Google Ads, Meta Ads, Email Marketing, Influencer Marketing, Affiliate Marketing, Programmatic Advertising, and Analytics.</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Learn Graphic Design using industry-leading tools to create impactful branding, social media creatives, advertisements, and marketing materials.</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Build responsive, high-performance websites with modern web development technologies and AI-assisted development tools.</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Gain hands-on experience through live projects, portfolio development, and practical assignments.</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Earn an industry-recognised certification that strengthens your professional profile.</p>
                              </li>
                           </ul>
                        </div>

                        <div className="blog__details-content-inner">
                           <h4 className="inner-title">A Bright Future Awaits You; Join Adshalaa Today</h4>
                           <p>The digital industry is experiencing unprecedented growth, creating millions of opportunities across startups, multinational companies, agencies, e-commerce businesses, and freelance platforms. Organisations are actively seeking professionals who can combine creativity, technology, and AI to drive business success.</p>

                           <p><strong>After completing this certification, you can pursue careers such as the following:</strong></p>
                           <ul className="about__info-list list-wrap">
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Digital Marketing Specialist</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">SEO & Performance Marketing Executive</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Social Media Manager</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">AI Marketing Specialist</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Graphic Designer</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">UI Designer</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Web Developer</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Content Strategist</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Brand & Creative Executive</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Freelance Digital Consultant</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Entrepreneur or Agency Owner</p>
                              </li>
                           </ul>
                        </div>

                        <p>Whether you aspire to secure a high-paying job, work with global clients, launch your own business, or build a successful freelance career, this programme provides the skills, confidence, and practical experience to help you thrive in the AI-driven digital world.</p>

                        {/* <div className="blog__details-bottom">
                           <div className="row align-items-center">
                              <div className="col-xl-6 col-md-7">
                                 <div className="tg-post-tag">
                                    <h5 className="tag-title">Tags :</h5>
                                    <ul className="list-wrap p-0 mb-0">
                                       <li><Link href="#">Digital Marketing</Link></li>
                                       <li><Link href="#">AI Certification</Link></li>
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
                        </div> */}
                     </div>
                  </div>
                  {/* <BlogAuthor />
                  <div className="blog-post-comment">
                     <BlogPostComment />
                     <BlogForm />
                  </div> */}
               </div>
               <BlogSidebar />
            </div>
         </div>
      </section>
   )
}

export default BlogDetailsArea;
