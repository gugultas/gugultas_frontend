import React from "react";

import MainLayout from "../layouts/MainLayout";
import "../styles/sass/main.scss";
import { Helmet } from "react-helmet-async";
import PostListLoadByScrollComp from "../components/post-list/PostListLoadByScrollComp";

const Home = () => {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Tüm Yazılar</title>
        <meta
          name="description"
          description="Tüm yazıları gör. Dergimizde mevcut olan veya olmayan tüm yazıları burada görebilirsiniz."
        />
      </Helmet>
      <MainLayout>
        <PostListLoadByScrollComp />
      </MainLayout>
    </>
  );
};

export default Home;
