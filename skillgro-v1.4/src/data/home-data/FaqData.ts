interface DataType {
   id: number;
   page: string;
   question: string;
   answer: string;
   class_name?: string;
}[];

const faq_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      question: "What mode of learning does Adshalaa offer?",
      answer: "Our programs are offered in offline mode with in-person, mentor-led sessions.",
   },
   {
      id: 2,
      page: "home_1",
      question: "What courses does Adshalaa offer?",
      class_name: "collapsed",
      answer: "We currently offer certification programs in Digital Marketing, Graphic Designing and Web Development, along with specialized courses in SEO, Social Media Management, Marketplace and Instagram Mastery.",
   },
   {
      id: 3,
      page: "home_1",
      question: "Are the courses beginner-friendly?",
      class_name: "collapsed",
      answer: "Yes. No prior experience is required. Our programs are designed to take you from the basics to an industry-ready level.",
   },
   {
      id: 4,
      page: "home_1",
      question: "How long are the courses?",
      class_name: "collapsed",
      answer: "Each certification program is 3 months of training followed by 1 month of paid internship hence 4 months total.",
   },
];

export default faq_data;