import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

import PostsList from "../features/posts/PostsList";
import MainLayout from "../layouts/MainLayout";
import "../styles/sass/main.scss";
import { Helmet } from "react-helmet-async";

const Home = () => {
  
  const [showTopBtn, setShowTopBtn] = useState(false);

  

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Tüm Yazılar</title>
        <meta name="description" description="Tüm yazıları gör. Dergimizde mevcut olan veya olmayan tüm yazıları burada görebilirsiniz." />
      </Helmet>
      <MainLayout>
        <PostsList/>
      </MainLayout>
      {showTopBtn && (
        <IconButton
          onClick={goToTop}
          sx={{
            position: "fixed",
            bottom: 15,
            right: 15,
            cursor: "pointer",
          }}
        >
          <FaAngleUp size={30} />
        </IconButton>
      )}
    </>
  );
};

export default Home;
