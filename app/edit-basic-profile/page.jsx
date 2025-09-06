
import BackToTop from "@/app/backToTop";
import MyBasicDetails from "./(edit-basic-profile)";


export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyBasicDetailsPage = async () => {
  return (
    <>
      <MyBasicDetails/>
      <BackToTop/>
    </>
  );
};

export default MyBasicDetailsPage;