import ExPostCard from "../../external_components/posts/ExPostCard";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import PostCard from "../../components/post-card/PostCard";

const PostsList = ({ propData }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesTab = useMediaQuery(theme.breakpoints.between("sm", "md"));

  let content;

  if (matches) {
    if (propData?.length === 0) {
      content = "";
    } else {
      content = propData?.map((post) => (
        <ExPostCard key={post.id} post={post} />
      ));
    }
  } else if (matchesTab) {
    content = (
      <Grid container sx={{ mb: 5 }}>
        {propData?.map((p) => (
          <Grid sm={6} key={p?.id}>
            <PostCard post={p} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    if (propData?.length < 1) {
      content = "";
    } else {
      content = propData?.map((post) => <PostCard key={post.id} post={post} />);
    }
  }

  return <>{content}</>;
};
export default PostsList;
