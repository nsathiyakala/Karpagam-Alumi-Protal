import BackToTop from "@/app/backToTop";
import Role from "./(role)";


export const metadata = {
  title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const RolePage = () => {
  return (
    <>
      <Role />
      <BackToTop />
    </>
  );
};

export default RolePage;
