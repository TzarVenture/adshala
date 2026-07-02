// /src/app/[category]/page.tsx
// ─────────────────────────────────────────────────────────────────────
// Dynamic SEO category pages. Pre-renders one static page per entry
// in category_config at build time via generateStaticParams.
//
// FIX: In Next.js 15+, `params` is a Promise and MUST be awaited.
//      (Synchronous params access = always undefined = 404)
// ─────────────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./page.css"
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import Wrapper from "@/layouts/Wrapper";
import ScrollToTopOnMount from "./ScrollToTopOnMount";

import category_config from "@/data/home-data/CategoryConfig";
import courses_data from "@/data/inner-data/InnerCourseData";

// ─────────────────────────────────────────────────────────────────────
// 1. Tell Next.js which slugs to pre-render at build time
//    (synchronous — no await needed here)
// ─────────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return category_config.map((cat: any) => ({ category: cat.slug }));
}

// ─────────────────────────────────────────────────────────────────────
// 2. Unique SEO metadata per category page
//    params is a Promise in Next.js 15+ — must be awaited
// ─────────────────────────────────────────────────────────────────────
type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = category_config.find((c) => c.slug === category);

  if (!cat) {
    return { title: "Course Not Found | Adshalaa" };
  }

  return {
    title: cat.seo.title,
    description: cat.seo.description,
    keywords: cat.seo.keywords,
    openGraph: {
      title: cat.seo.title,
      description: cat.seo.description,
      url: `https://adshalaa.com/${cat.slug}`,
      siteName: "Adshalaa",
      type: "website",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────
// 3. Page Component — async so we can await params
// ─────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Find matching category config entry
  const cat = category_config.find((c) => c.slug === category);

  // Unknown slug → 404
  if (!cat) {
    notFound();
  }

  // Filter courses that belong to this broad category (e.g., Marketing)
  const courses = courses_data.filter(
    (course) => course.category === cat.targetCategory
  );

  return (
    <Wrapper>
      {/* Scroll to top on every navigation to this page */}
      <ScrollToTopOnMount />

      <HeaderOne />

      <main className="main-area fix">
        {/* Breadcrumb — reuses the existing BreadcrumbOne component */}
        <BreadcrumbOne title={cat.heading} sub_title={cat.title} showCertificationImage={true} />

        {/* Course listing section */}
        <section className="courses__area section-py-120">
          <div className="container">

            {/* Section heading */}
            <div className="row justify-content-center mb-50">
              <div className="col-xl-8 col-lg-9 text-center">
                <div className="section__title">
                  <span className="sub-title">Adshalaa Courses</span>
                  <h2 className="title">{cat.heading}</h2>
                  <p className="desc" style={{ marginTop: "12px" }}>
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Course cards grid */}
            <div className="row gy-3 ">
              {courses.map((course) => (
                <div key={course.id} className="col-xl-3 col-lg-4 col-md-6">
                  <div className="courses__item shine__animate-item">

                    {/* Thumbnail */}
                    <div className="courses__item-thumb">
                      <Link
                        href={`/course-details/${course.sku}`}
                        className="shine__animate-link"
                      >
                        <Image
                          src={course.thumb}
                          alt={course.title}
                          style={{ objectFit: "contain", width: "100%", height: "auto" }}
                        />
                      </Link>
                    </div>

                    {/* Content (Matched exactly to CourseArea.tsx UI) */}
                    <div className="courses__item-content">
                      <ul className="courses__item-meta list-wrap">
                        <li className="courses__item-tag">
                          <Link href="/courses">{course.category}</Link>
                        </li>
                      </ul>

                      <h5 className="title">
                        <Link href={`/course-details/${course.sku}`}>
                          {course.title}
                        </Link>
                      </h5>

                      <div className="courses__item-bottom">
                        <div className="button">
                          <Link href={`/course-details/${course.sku}`}>
                            <span className="text">Enroll Now</span>
                            <i className="flaticon-arrow-right"></i>
                          </Link>
                        </div>
                        <h5 className="price">
                          ₹{Number(course.price).toLocaleString("en-IN")}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="row mt-60">
              <div className="col-12 text-center">
                <p style={{ color: "#6D6C80", marginBottom: "16px" }}>
                  Want to know more about this program?
                </p>
                <Link href="/contact" className="btn arrow-btn me-3 mobilebtnsize">
                  Contact Us <i className="flaticon-arrow-right"></i>
                </Link>
                <Link href="/courses" className="btn btn-two mobilebtnsize">
                  View All Courses
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <FooterOne />
    </Wrapper>
  );
}
