import BackToTop from "@/app/backToTop";
import EventCategory from "./(event-category)";



export const metadata = {
  title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const EventCategoryPage = () => {
  return (
    <>
      <EventCategory />
      <BackToTop />
    </>
  );
};

export default EventCategoryPage;
