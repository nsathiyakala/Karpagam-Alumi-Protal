import BackToTop from "@/app/backToTop";
import IndustryType from "./(industry-type)";


export const metadata = {
  title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const IndustryTypePage = () => {
  return (
    <>
      <IndustryType />
      <BackToTop />
    </>
  );
};

export default IndustryTypePage;
