import React from "react";
import { useRemovePostFromPlaylistMutation } from "../../features/playlist/playlistSlice";
import { IconButton } from "@mui/material";
import { CgPlayListRemove } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const RemoveFromPlaylist = ({ postId, playlistId }) => {
  const navigate = useNavigate();
  const [rmvPostFromPlaylist, { isLoading }] =
    useRemovePostFromPlaylistMutation();

  const onSubmitRemovePostFromPlaylist = async (e) => {
    e.preventDefault();

    const reqBody = {
      playlistId,
      postId,
    };

    const response = await rmvPostFromPlaylist(reqBody);

    console.log(response);

    if (response?.error) {
      console.log(response?.error);
    } else {
      navigate(-1);
    }
  };

  return (
    <IconButton onClick={onSubmitRemovePostFromPlaylist} disabled={isLoading}>
      <CgPlayListRemove size={17} />
    </IconButton>
  );
};

export default RemoveFromPlaylist;
