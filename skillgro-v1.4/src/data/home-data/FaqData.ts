interface DataType {
   id: number;
   page: string;
   question: string;
   answer: string;
   class_name?:string;
}[];

const faq_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      question: "What mode of learning does Adshala offer?",
      answer: "Our programs are offered in offline mode with in-person, mentor-led sessions.",
   },
   {
      id: 2,
      page: "home_1",
      question: "What courses does Adshala offer?",
      class_name:"collapsed",
      answer: "We currently offer certification programs in Digital Marketing, Graphic Designing and Web Development, along with specialized courses in SEO, Social Media Management, Marketplace and Instagram Mastery.",
   },
   {
      id: 3,
      page: "home_1",
      question: "How We Provide Service For you?",
      class_name:"collapsed",
      answer: "Groove’s intuitive shared inbox makes it easy for team members organize prioritize and.In this episode.urvived not only five centuries.Edhen an unknown printer took a galley of type and scrambl",
   },
   {
      id: 4,
      page: "home_1",
      question: "How long are the courses?",
      class_name:"collapsed",
      answer: "Each certification program is 3 months of training followed by 1 month of paid internship hence 4 months total.",
   },
];

export default faq_data;