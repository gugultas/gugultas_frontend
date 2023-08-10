import React, { useEffect, useState } from "react";
import { BASE_URL, postsApiUrl } from "../../config/urls";
import ExPostCard from "../../external_components/posts/ExPostCard";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import PostCard from "../post-card/PostCard";
import PostsLoadingComp from "../loading/PostsLoadingComp";
import { POST_LIMIT_SIZE } from "../../config/constants";
import { axiosPublic } from "../../axios/publicAxios";
import MainLoadingComp from "../loading/MainLoadingComp";

const PostListLoadByScrollComp = ({ searchData }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesTab = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [card, setCard] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);

  const getCardData = async () => {
    if (page === 0) {
      setPageLoading(true);
    }
    const res = await fetch(
      `${BASE_URL}${postsApiUrl}?page=${page}&size=${POST_LIMIT_SIZE}`
    );

    const data = await res.json();

    const posts = await Promise.all(
      data?.posts?.map(async (p) => {
        await axiosPublic
          .get("/likes/likedUsersByPost/" + p?.id)
          .then((resp) => (p.likes = resp?.data))
          .catch((err) => console.log(err));
        return p;
      })
    );

    if (card?.length === 0) {
      setCard(posts);
    } else {
      setCard((prev) => [...prev, ...posts]);
    }
    setPageLoading(false);
    setTotalPage(data?.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    if (page <= totalPage) {
      getCardData();
    }
  }, [page]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setTimeout(() => {
          setPage((prev) => prev + 1);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const allData = searchData ? searchData : card;

  if (pageLoading) {
    return <MainLoadingComp isLoading={pageLoading} />;
  }

  let content;
  if (matches) {
    if (allData?.length === 0) {
      content = "";
    } else {
      content = allData?.map((post) => (
        <ExPostCard key={post.id} post={post} />
      ));
    }
  } else if (matchesTab) {
    content = (
      <Grid container sx={{ mb: 5 }}>
        {allData?.map((p) => (
          <Grid sm={6} key={p?.id}>
            <PostCard post={p} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    if (allData?.length < 1) {
      content = "";
    } else {
      content = allData?.map((post) => <PostCard key={post.id} post={post} />);
    }
  }

  return (
    <>
      {content}
      {page <= totalPage && <PostsLoadingComp isLoading={loading} />}
    </>
  );
};

export default PostListLoadByScrollComp;
