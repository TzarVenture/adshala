"use client"
import Link from "next/link";
import Categories from "../../blog-common/Categories";
import LatestPost from "../../blog-common/LatestPost";
import Tags from "../../blog-common/Tags";
import { BlogDataType } from "@/data/inner-data/BlogData";

interface Props {
   blog?: BlogDataType;
}

const AIPoweredBlogSidebar = ({ blog }: Props) => {
   return (
      <div className="col-xl-3 col-lg-4">
         <aside className="blog-sidebar">
            {/* Search Widget */}
            <div className="blog-widget widget_search">
               <div className="sidebar-search-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Search blogs..." />
                     <button><i className="flaticon-search"></i></button>
                  </form>
               </div>
            </div>

            {/* Custom AI Course Promotion Widget */}
            <div className="blog-widget" style={{
               backgroundColor: "#1c1d20",
               color: "#ffffff",
               borderRadius: "12px",
               padding: "24px",
               marginBottom: "30px"
            }}>
               <span style={{
                  backgroundColor: "#5751e1",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  display: "inline-block",
                  marginBottom: "12px"
               }}>Featured Program</span>
               <h4 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>
                  AI-Powered Digital Marketing & Design
               </h4>
               <p style={{ color: "#a0a5b5", fontSize: "14px", marginBottom: "16px" }}>
                  Master 20+ AI tools with 100% practical training & placement assistance in Mumbai.
               </p>
               <Link href="/contact" className="btn" style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "10px 16px",
                  fontSize: "14px",
                  borderRadius: "6px"
               }}>
                  Book Free Demo
               </Link>
            </div>

            <Categories />
            <LatestPost />
            <Tags />
         </aside>
      </div>
   );
};

export default AIPoweredBlogSidebar;
