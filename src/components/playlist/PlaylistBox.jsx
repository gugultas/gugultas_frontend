import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";

import { BASE_URL, photosApiUrl } from "../../config/urls";
import DeletePlaylist from "./DeletePlaylist";
import EditPlaylist from "./EditPlaylist";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";

const PlaylistBox = ({ data }) => {
  const { username } = useParams();
  const theme = useTheme();
  const currentUsername = useSelector(selectCurrentUsername);

  return (
    <Stack
      sx={{
        p: 1,
        backgroundImage: `linear-gradient(to Bottom, #cccccc52, #e860df9a), url(${BASE_URL}${photosApiUrl}/${data?.playlistImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: { xs: "150px", md: "200px" },
        position: "relative",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: { xs: 10, md: 17 },
          fontWeight: "bolder",
          color: "white",
          bgcolor: theme.palette.primary.dark,
          p: 1,
          borderRadius: "10px",
        }}
      >
        {data?.title}
      </Typography>
      {currentUsername === username && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: "7px",
            left: "12px",
          }}
        >
          <EditPlaylist data={data} />
          <DeletePlaylist playlistId={data?.id} />
        </Stack>
      )}

      <Typography
        sx={{
          position: "absolute",
          bottom: "7px",
          right: "10px",
          color: "white",
          bgcolor: theme.palette.primary.dark,
          p: 1,
          borderRadius: "10px",
        }}
      >
        {moment(data?.updateDateTime).format("dddd MM/YY")}
      </Typography>
    </Stack>
  );
};

export default PlaylistBox;
