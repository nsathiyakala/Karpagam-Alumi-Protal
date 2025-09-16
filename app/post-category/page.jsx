import BackToTop from "@/app/backToTop";

import PostCategory from "./(post-category)";


export const metadata = {
  title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const PostCategoryPage = () => {
  return (
    <>
      <PostCategory />
      <BackToTop />
    </>
  );
};

export default PostCategoryPage;
