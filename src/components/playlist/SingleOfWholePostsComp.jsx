import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useAddPostToPlaylistMutation } from "../../features/playlist/playlistSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../../features/auth/authSlice";

const SingleOfWholePostsComp = ({ post, id, playlistId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUsername);

  const [error, setError] = useState("");

  const [addPostToPlaylist, { isLoading }] = useAddPostToPlaylistMutation();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const body = {
      playlistId,
      postId: post?.postId,
    };

    const resp = await addPostToPlaylist(body);

    if (resp?.error) {
      setError(resp?.error?.data?.message);
    } else {
      navigate(`/${currentUser}/playlists/${playlistId}`);
    }
  };

  return (
    <>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{
          my: 1,
          bgcolor:
            id % 2 === 0
              ? theme.palette.primary.contrastText
              : theme.palette.primary.light,
          p: 1,
          borderRadius: "30px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: 9, md: 14 },
            fontWeight: "bolder",
            textAlign: "left",
          }}
        >
          {post?.title?.length > 50
            ? post?.title?.substring(0, 50) + "..."
            : post?.title}
        </Typography>
        <IconButton onClick={onSubmitHandler} disabled={isLoading}>
          <BiAddToQueue color="white" size={20} />
        </IconButton>
      </Stack>
      {error && (
        <Typography color="red" fontSize={20}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default SingleOfWholePostsComp;
