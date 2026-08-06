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
                        <Image src={blog_img1} alt="Digital marketing careers in India" />
                     </div>
                     <div className="blog__details-content">
                        <div className="blog__post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i> 29 July, 2026</li>
                              <li><i className="flaticon-clock"></i> 6 Min Read</li>
                           </ul>
                        </div>
                        <h3 className="title">Digital marketing careers in India: high value, exceptional growth, and potential.</h3>

                        <p style={{ fontSize: "18px", fontWeight: "600" }}>
                           Digital marketing is the fastest way to reach target customers around the globe at just one click.
                        </p>

                        <p>In today's digital-first world, nearly 90% of the global population uses the internet for communication, learning, shopping, entertainment, and making informed decisions. Since the rise of the internet, the way people live, work, and do business has transformed dramatically. Consumers now rely on online platforms to discover products, compare services, read reviews, and connect with brands, making a strong digital presence essential for every business.</p>

                        <p>As businesses continue to embrace digital transformation, marketing has shifted from traditional methods to powerful online strategies. From startups and small businesses to global enterprises, organizations leverage digital channels to increase brand visibility, generate qualified leads, engage customers, and drive sustainable revenue growth. Today, digital marketing has become the backbone of modern business success, enabling companies to reach the right audience with the right message at the right time.</p>

                        <p style={{ fontWeight: "600", }}>
                           Dear students of BCOM, BBA, BA, BMC, AND BSC, call us for more information.<br />
                           Saki Vihar, Andheri East, Mumbai 400072<br />
                           <a href="tel:+918652199991">+91 8652199991</a> / <a href="tel:+917760775875">+91 7760775875</a>
                        </p>

                        <blockquote style={{ margin: "25px 0", padding: "20px 30px" }}>
                           <p>“ Future-proof your career. Learn in-demand skills. Build your portfolio. Get certified. Get 100% placement guarantee. Start creating opportunities today. All possible with Adshalaa. ”</p>
                        </blockquote>

                        <p><strong>Hurry, limited seats are available. Our upcoming batch is going to start on 15th July, 2026.</strong></p>

                        <div className="blog__details-content-inner">
                           <h4 className="inner-title">Explore the Core Pillars of Digital Marketing</h4>
                           <p style={{ fontStyle: "italic" }}>A Career Domain Supported by Naukri.com and Leading Indian Institutes of Management Programs:</p>

                           <ul className="about__info-list list-wrap">
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Search Engine Optimization (SEO) & Search Engine Marketing (SEM)</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Social Media Marketing & Performance Marketing</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Google Ads & Meta Ads</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Content Marketing & Email Marketing</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Influencer Marketing & Affiliate Marketing</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Programmatic Advertising & Reputation Management</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">Marketing Analytics & Marketing Automation</p>
                              </li>
                              <li className="about__info-list-item">
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">E-commerce Marketing & Conversion Rate Optimization (CRO)</p>
                              </li>
                           </ul>
                        </div>

                        <p>Professionals can work in digital marketing agencies, corporate organizations, startups, or media companies, or as independent consultants and freelancers. Many marketers also establish their agencies or build personal brands, creating multiple income streams through consulting, affiliate marketing, content creation, and online businesses.</p>

                        <p>The future of digital marketing in India looks exceptionally promising as emerging technologies continue to reshape the industry. Businesses are looking for professionals who can adapt to these evolving trends and deliver innovative solutions.</p>

                        <div className="blog__details-content-inner">
                           <h4 className="inner-title">What Makes the Digital Marketing Domain a Virtuous Choice Among HR Managers?</h4>

                           <p>One of the biggest advantages of pursuing a career in digital marketing is the diversity of opportunities available. Professionals can specialize in search engine optimization (SEO), search engine marketing (SEM), social media marketing, content marketing, email marketing, influencer marketing, performance marketing, affiliate marketing, programmatic advertising, video marketing, reputation management, marketing automation, and web analytics. With the growing integration of artificial intelligence (AI), marketers are also expected to leverage AI-powered tools for content creation, campaign optimization, audience targeting, predictive analytics, and customer engagement.</p>

                           <p>Unlike many traditional careers, digital marketing values practical skills and measurable performance over academic qualifications alone. Employers prioritize candidates with hands-on experience, certifications, and the ability to execute real-world campaigns. This creates excellent career opportunities for students, graduates, working professionals, entrepreneurs, and freelancers who want to build a rewarding career without spending years pursuing specialized degrees.</p>

                           <p>The rise of e-commerce, fintech, edtech, healthcare, real estate, travel, and entertainment industries has further accelerated the demand for digital marketing professionals. Every business today requires an online presence to remain competitive. Whether it is generating website traffic, increasing social media engagement, running paid advertising campaigns, improving search engine rankings, or building customer loyalty, digital marketers play a vital role in driving business success.</p>

                           <p>At Adshalaa Institute, we prepare aspiring professionals with the practical skills and industry knowledge needed to thrive in this rapidly growing field. Our implementation-focused training combines live projects, real-world case studies, AI-powered marketing tools, expert mentorship, and hands-on learning to ensure students are job-ready from day one.</p>
                        </div>

                        {/* <div className="blog__details-bottom">
                           <div className="row align-items-center">
                              <div className="col-xl-6 col-md-7">
                                 <div className="tg-post-tag">
                                    <h5 className="tag-title">Tags :</h5>
                                    <ul className="list-wrap p-0 mb-0">
                                       <li><Link href="#">Digital Marketing</Link></li>
                                       <li><Link href="#">Career Growth</Link></li>
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
                  {/* <BlogAuthor /> */}
                  {/* <div className="blog-post-comment">
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
