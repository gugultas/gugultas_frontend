import React from "react";
import { useRemovePostToPlaylistMutation } from "../../features/playlist/playlistSlice";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { CgPlayListRemove } from "react-icons/cg";

const RemoveFromPlaylist = ({ postId, playlistId }) => {
  const [rmvPostFromPlaylist, { isLoading }] =
    useRemovePostToPlaylistMutation();

  const onSubmitRemovePostFromPlaylist = async (e) => {
    e.preventDefault();

    const reqBody = {
      playlistId,
      postId,
    };

    const response = await rmvPostFromPlaylist(reqBody);

    if (response?.error) {
      console.log(response?.error);
    }
  };

  return (
    <Tooltip title={<Typography fontSize={10} >Oynatma listesinden kaldır</Typography>}>
      <IconButton onClick={onSubmitRemovePostFromPlaylist} disabled={isLoading}>
        <CgPlayListRemove size={17} />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromPlaylist;
