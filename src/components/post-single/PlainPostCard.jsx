import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function PlainPostCard({ post }) {
  const postImage = post?.image && `${BASE_URL}${photosApiUrl}/${post?.image}`;

  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: "white",
        border: "none",
        boxShadow: "none",
        height: "250px",
      }}
    >
      <Link to={`/posts/${post?.id}`}>
        <CardMedia sx={{ height: 140 }} image={postImage} title="Post Media" />
      </Link>
      <Stack spacing={2} sx={{ p: 1, pt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            component={Link}
            to={`/users/${post?.username}`}
            variant="body1"
            color="text.secondary"
            fontWeight={900}
          >
            {post?.username}
          </Typography>
          <Typography
            component={Link}
            to={`/posts/category/${post?.category}`}
            variant="body1"
            color="text.secondary"
            fontWeight={900}
          >
            {post?.category}
          </Typography>
        </Stack>
        <Typography
          gutterBottom
          // variant="h5"
          component="div"
          textAlign="left"
          fontWeight={700}
          sx={{ pb: 1, fontSize: 13 }}
        >
          {post?.title?.length > 45
                  ? post.title?.substring(0, 45) + "..."
                  : post.title}
        </Typography>
      </Stack>
    </Card>
  );
}
