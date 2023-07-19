import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { AiFillRightCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const LastFivePostsOfAuthorComp = ({ posts }) => {
  return (
    <Box>
      <h4
        className="list-header"
        style={{ textAlign: "left", marginLeft: "1rem" }}
      >
        Yazarın Son 5 Yazısı
      </h4>
      <List>
        {posts?.map((p) => (
          <ListItem key={p?.postId}>
            <ListItemButton
              component={NavLink}
              to={`/posts/${p?.postId}`}
              sx={{ borderBottom: "1px solid grey" }}
            >
              <ListItemIcon sx={{ px: 0, mx: 0 }}>
                <AiFillRightCircle fontSize={20} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontSize={12} fontWeight={700}>
                    {p?.title}
                  </Typography>
                }
                secondary={
                  <Typography fontSize={10}>
                    {moment(p?.createdTime).format("dddd DD/MM/YYYY")}{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LastFivePostsOfAuthorComp;
