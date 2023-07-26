import { IconButton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import { MdEdit, MdPostAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import DeactivateUser from "./DeactivateUser";
import AddPlaylistComp from "../playlist/AddPlaylistComp";

const ToolBox = ({ user }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      sx={{
        mt: 1,
        p: 0.5,
        border: "1px solid #ccc",
        borderRadius: "10px",
        bgcolor: theme.palette.primary.dark,
      }}
    >
      <Tooltip title={<Typography>Profili Düzenle</Typography>}>
        <IconButton
          component={NavLink}
          to={`/users/editUser/${user?.username}`}
        >
          <MdEdit color="white" />
        </IconButton>
      </Tooltip>
      <Tooltip title={<Typography>Yazı Ekle</Typography>} >
        <IconButton component={NavLink} to={"/posts/newPost"}>
          <MdPostAdd color="white" />
        </IconButton>
      </Tooltip>
      <AddPlaylistComp />
      <DeactivateUser userId={user?.id} />
    </Stack>
  );
};

export default ToolBox;
