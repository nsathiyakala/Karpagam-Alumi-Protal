import BackToTop from "@/app/backToTop";
import IndustryType from "./(categories)";
import Locations from "./(categories)";
import Country from "./(categories)";
import Category from "./(categories)";


export const metadata = {
  title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const CategoryPage = () => {
  return (
    <>
      <Category />
      <BackToTop />
    </>
  );
};

export default CategoryPage;
