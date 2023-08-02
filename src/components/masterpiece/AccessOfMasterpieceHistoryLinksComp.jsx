import {
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { AiFillPicture } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";

const AccessOfMasterpieceHistoryLinksComp = () => {
  return (
    <Box sx={{ py: 5 }}>
      <h4 className="list-header">Tüm Ödülleri Gör</h4>
      <List >
        <ListItemButton component={Link} to={"/eserler/tüm-resimler"}>
          <ListItemAvatar>
            <AiFillPicture size={20} />
          </ListItemAvatar>
          <ListItemText>
            <h5 className="side-list-text">Ödül Alan Tüm Resimler </h5>
          </ListItemText>
        </ListItemButton>
        <ListItemButton component={Link} to={"/eserler/tüm-muzikler"}>
          <ListItemAvatar>
            <FaMusic size={20} />
          </ListItemAvatar>
          <ListItemText>
            <h5 className="side-list-text">Ödül Alan Tüm Müzikler </h5>
          </ListItemText>
        </ListItemButton>
        <ListItemButton component={Link} to={"/eserler/tüm-filmler"}>
          <ListItemAvatar>
            <BiMoviePlay size={20} />
          </ListItemAvatar>
          <ListItemText>
            <h5 className="side-list-text">Ödül Alan Tüm Filmler </h5>
          </ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default AccessOfMasterpieceHistoryLinksComp;
