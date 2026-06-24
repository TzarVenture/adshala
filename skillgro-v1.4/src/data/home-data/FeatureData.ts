import { StaticImageData } from "next/image";

import icon_1 from "@/assets/img/icons/features_icon01.svg";
import icon_2 from "@/assets/img/icons/features_icon02.svg";
import icon_3 from "@/assets/img/icons/features_icon03.svg";
import icon_4 from "@/assets/img/icons/features_icon04.svg";
import homefFeature_1 from "@/assets/img/icons/h4_features_icon01.svg"
import homefFeature_2 from "@/assets/img/icons/h4_features_icon02.svg"
import homefFeature_3 from "@/assets/img/icons/h4_features_icon03.svg"

import icon2_1 from "@/assets/img/icons/h2_features_icon01.svg";
import icon2_2 from "@/assets/img/icons/h2_features_icon02.svg";
import icon2_3 from "@/assets/img/icons/h2_features_icon03.svg";
import icon3_1 from "@/assets/img/icons/h3_features_icon01.svg";
import icon3_2 from "@/assets/img/icons/h3_features_icon02.svg";
import icon3_3 from "@/assets/img/icons/h3_features_icon03.svg";
import icon3_4 from "@/assets/img/icons/h3_features_icon04.svg";
import shape_1 from "@/assets/img/others/h5_features_item_shape02.svg";

interface DataType {
   id: number;
   page: string;
   icon?: StaticImageData;
   icon_2?: string;
   title: string;
   desc: string;
}[];

const feature_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      icon: icon_1,
      title: "Learn with Experts",
      desc: "Get mentorship and career guidance from people who've worked in the field",
   },
   {
      id: 2,
      page: "home_1",
      icon: icon_2,
      title: "Range of Programs",
      desc: "Whether you're a beginner or looking to upskill, there's a course for you",
   },
   {
      id: 3,
      page: "home_1",
      icon: icon_3,
      // title: "Industry Recognized Certificate",
      title: "Paid Internship",
      desc: "Paid Internships with Real Experience",
   },
   {
      id: 4,
      page: "home_1",
      icon: icon_4,
      title: "100% Placement Assistance",
      desc: "We don't just train you, we get you hired",
   },

   // home_2

   {
      id: 1,
      page: "home_2",
      icon: icon2_1,
      title: "Expert Tutors",
      desc: "Learn from professionals in digital marketing, design and development.",
   },

   {
      id: 2,
      page: "home_2",
      icon: icon2_2,
      title: "Effective Courses",
      desc: "Our curriculum is built around what hiring managers look for.",
   },

   {
      id: 3,
      page: "home_2",
      icon: icon2_3,
      title: "Earn Certificate",
      desc: "Get certification that validates your skills to employers.",
   },

   // home_3

   {
      id: 1,
      page: "home_3",
      icon: icon3_1,
      title: "Scholarship Facility",
      desc: "Eestuidar University we prepare you to launch your.",
   },
   {
      id: 2,
      page: "home_3",
      icon: icon3_2,
      title: "Learn From Experts",
      desc: "Eestuidar University we prepare you to launch your.",
   },
   {
      id: 3,
      page: "home_3",
      icon: icon3_3,
      title: "Graduation Courses",
      desc: "Eestuidar University we prepare you to launch your.",
   },
   {
      id: 4,
      page: "home_3",
      icon: icon3_4,
      title: "Certificate Program",
      desc: "Eestuidar University we prepare you to launch your.",
   },

   // home_4

   {
      id: 1,
      page: "home_4",
      icon: homefFeature_1,
      title: "Support & Motivation",
      desc: "We are able to offer every yoga training experienced & best yoga trainer.",
   },
   {
      id: 2,
      page: "home_4",
      icon: homefFeature_2,
      title: "Strong Body Life",
      desc: "We are able to offer every yoga training experienced & best yoga trainer.",
   },
   {
      id: 3,
      page: "home_4",
      icon: homefFeature_3,
      title: "Increased Flexibility",
      desc: "We are able to offer every yoga training experienced & best yoga trainer.",
   },

   // home-five

   {
      id: 1,
      page: "home_5",
      icon: shape_1,
      icon_2: "skillgro-video-tutorial",
      title: "Easy Class",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },
   {
      id: 2,
      page: "home_5",
      icon: shape_1,
      icon_2: "skillgro-verified",
      title: "Safety & Security",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },
   {
      id: 3,
      page: "home_5",
      icon: shape_1,
      icon_2: "skillgro-instructor",
      title: "Skilled Teacher",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },
   {
      id: 4,
      page: "home_5",
      icon: shape_1,
      icon_2: "skillgro-book-1",
      title: "Clean Curriculum",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },

   // home_8

   {
      id: 1,
      page: "home_8",
      icon: shape_1,
      icon_2: "skillgro-book-1",
      title: "Learn skills with 120k+",
      desc: "video courses.",
   },
   {
      id: 2,
      page: "home_8",
      icon: shape_1,
      icon_2: "skillgro-instructor",
      title: "Choose courses",
      desc: "real-world experts.",
   },
   {
      id: 3,
      page: "home_8",
      icon: shape_1,
      icon_2: "skillgro-tutorial",
      title: "processional Tutors",
      desc: "video courses.",
   },
   {
      id: 4,
      page: "home_8",
      icon: shape_1,
      icon_2: "skillgro-graduated",
      title: "Online Degrees",
      desc: "Study flexibly online",
   },

];

export default feature_data;