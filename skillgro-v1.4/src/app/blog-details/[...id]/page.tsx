import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import BlogDetailsArea from "@/components/blogs/blog-details/BlogDetailsArea";
import inner_blog_data from "@/data/inner-data/BlogData";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";

type Props = {
   params: Promise<{ id: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = await params;
   const blogParam = id[0];

   const single_blog = inner_blog_data.find(
      (item) => item.slug === blogParam || String(item.id) === blogParam
   );

   if (!single_blog) {
      return {
         title: "Blog Details | AdShalaa",
      };
   }

   return {
      title: `${single_blog.title} | AdShalaa`,
      description: single_blog.title,
   };
}

export default async function Page({ params }: Props) {
   const { id } = await params;
   const blogParam = id[0];

   const single_blog = inner_blog_data.find(
      (item) => item.slug === blogParam || String(item.id) === blogParam
   );

   if (!single_blog && !["blog1", "1", "blog2", "2", "blog3", "3"].includes(blogParam)) {
      notFound();
   }

   return (
      <Wrapper>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne
               title="Blog Details"
               sub_title={single_blog?.title || "Blog Details"}
            />
            <BlogDetailsArea single_blog={single_blog} id={blogParam} />
         </main>
         <FooterOne />
      </Wrapper>
   );
}
