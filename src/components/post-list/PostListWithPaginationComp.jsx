import { useState } from "react";
import {
  Grid,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useGetPostsQuery } from "./postSlice";
import ExPostCard from "../../external_components/posts/ExPostCard";
import PostCard from "../../components/post-card/PostCard";
import MainLoadingComp from "../../components/loading/MainLoadingComp";
import ResourceNotFound from "../../components/error/ResourceNotFound";

const PostListWithPaginationComp = () => {
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
  } = useGetPostsQuery({
    page: page - 1,
  });

  const handleChange = (event, value) => {
    window.scrollTo(0, 0);
    setPage(value);
  };

  const allPost = fetchedPosts?.posts;

  let content;
  if (isLoading) {
    content = <MainLoadingComp isLoading={isLoading} />;
  } else if (isError) {
    content = <ResourceNotFound isError={isError} error={error} />;
  } else if (isSuccess) {
    if (matches) {
      if (allPost?.length === 0) {
        content = "";
      } else {
        content = allPost?.map((post) => (
          <ExPostCard key={post.id} post={post} />
        ));
      }
    } else if (matchesTab) {
      content = (
        <Grid container sx={{ mb: 5 }}>
          {allPost?.map((p) => (
            <Grid sm={6} key={p?.id}>
              <PostCard post={p} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      if (allPost?.length < 1) {
        content = "";
      } else {
        content = allPost?.map((post) => (
          <PostCard key={post.id} post={post} />
        ));
      }
    }
  }

  return (
    <>
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

export default PostListWithPaginationComp;
