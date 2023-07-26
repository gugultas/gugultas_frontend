import React from "react";
import { useParams } from "react-router-dom";
import PostsByCategory from "../features/posts/PostsByCategory";
import MainLayout from "../layouts/MainLayout";
import { Helmet } from "react-helmet-async";

const PostsByCategoryPage = () => {
  const { categoryName } = useParams();
  return (
    <MainLayout>
      <Helmet prioritizeSeoTags>
        <title>{categoryName + " | Yazılar"}</title>
        <meta name="description" description={categoryName} />
      </Helmet>
      <PostsByCategory category={categoryName} />
    </MainLayout>
  );
};

export default PostsByCategoryPage;
