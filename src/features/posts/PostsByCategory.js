import React, { useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Grid,
  Stack,
  Pagination,
} from "@mui/material";

import MainLoadingComp from "../../components/loading/MainLoadingComp";
import PostCard from "../../components/post-card/PostCard";
import ExPostCard from "../../external_components/posts/ExPostCard";
import { useGetPostsByCategoryQuery } from "./postSlice";
import NoPostInList from "../../components/error/NoPostInList";
import ResourceNotFound from "../../components/error/ResourceNotFound";
import { POST_LIMIT_SIZE } from "../../config/constants";

const PostsByCategory = ({ category }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesTab = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [page, setPage] = useState(1);

  const {
    data: fetchedPosts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByCategoryQuery({
    categoryName: category,
    page: page - 1,
    size: POST_LIMIT_SIZE,
  });

  const handleChange = (event, value) => {
    window.scrollTo(0, 0);
    setPage(value);
  };

  const data = fetchedPosts?.posts;

  let content;
  if (isLoading) {
    content = <MainLoadingComp isLoading={isLoading} />;
  } else if (isError) {
    content = <ResourceNotFound isError={isError} error={error} />;
  } else if (isSuccess) {
    if (matches) {
      if (data?.length === 0) {
        content = <NoPostInList />;
      } else {
        content = data.map((post) => <ExPostCard key={post.id} post={post} />);
      }
    } else if (matchesTab) {
      content = (
        <Grid container sx={{ mb: 5 }}>
          {data?.map((p) => (
            <Grid sm={6} key={p?.id}>
              <PostCard post={p} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      if (data?.length < 1) {
        content = <NoPostInList />;
      } else {
        content = data.map((post) => <PostCard key={post.id} post={post} />);
      }
    }
  }

  return (
    <>
      <h3 className="list-header"> {category} </h3>
      {content}
      <Stack spacing={2}>
        <Pagination
          count={fetchedPosts?.totalPages}
          page={page}
          color="primary"
          variant="outlined"
          onChange={handleChange}
          size="large"
        />
      </Stack>
    </>
  );
};

export default PostsByCategory;
