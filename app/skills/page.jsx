import BackToTop from "@/app/backToTop";
import Skills from "./(skills)";


export const metadata = {
  title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const SkillsPage = () => {
  return (
    <>
      <Skills />
      <BackToTop />
    </>
  );
};

export default SkillsPage;
