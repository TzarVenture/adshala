import { StaticImageData } from "next/image";

import blog_thumb1 from "@/assets/img/blog/blog_post01.jpg"
import blog_thumb2 from "@/assets/img/blog/blog_post02.jpg"
import blog_thumb3 from "@/assets/img/blog/blog_post03.jpg"
import blog_thumb4 from "@/assets/img/blog/blog_post04.jpg"
import blog_thumb5 from "@/assets/img/blog/blog_post05.jpg"
import blog_thumb6 from "@/assets/img/blog/blog_post06.jpg"
import blog_thumb7 from "@/assets/img/blog/blog_post07.jpg"
import blog_thumb8 from "@/assets/img/blog/blog_post08.jpg"
import blog_thumb9 from "@/assets/img/blog/blog_post09.jpg"
import blog_thumb10 from "@/assets/img/blog/blog_post10.jpg"
import blog_thumb11 from "@/assets/img/blog/blog_post11.jpg"
import blog_thumb12 from "@/assets/img/blog/blog_post12.jpg"

interface DataType {
   id: number;
   thumb: StaticImageData;
   slug?: String
   tag: string;
   date: string;
   title: string;
}[];

const inner_blog_data: DataType[] = [
   {
      id: 101,
      slug: "benefits-ai-powered-advanced-certification",
      thumb: blog_thumb1,
      tag: "Marketing & AI",
      date: "15 July, 2026",
      title: "Benefits of AI-powered advanced certification in digital marketing, graphic design, and web development"
   },
   {
      id: 102,
      slug: "digital-marketing-careers-in-india",
      thumb: blog_thumb2,
      tag: "Digital Marketing",
      date: "15 July, 2026",
      title: "Digital marketing careers in India: high value, exceptional growth, and potential."
   },
   {
      id: 103,
      slug: "why-digital-marketing-provides-high-paying-career-opportunities",
      thumb: blog_thumb3,
      tag: "Salaries & Careers",
      date: "15 July, 2026",
      title: "Why digital marketing provides high-paying career opportunities."
   },
];

export default inner_blog_data;