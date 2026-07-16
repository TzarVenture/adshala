import { redirect } from "next/navigation";

export const metadata = {
   title: "AdShalaa | Best Digital Marketing Courses in Mumbai",
};

const page = () => {
   redirect("/courses");
}

export default page