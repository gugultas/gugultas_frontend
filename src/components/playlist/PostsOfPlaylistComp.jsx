import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExPostCard from "../../external_components/posts/ExPostCard";
import SingleOfWholePostsComp from "./SingleOfWholePostsComp";
import FormField from "../form/FormField";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import PostCard from "../post-card/PostCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PostsOfPlaylistComp = ({ posts, wholePosts }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { username, id: playlistId } = useParams();

  const [search, setSearch] = useState("");
  const [value, setValue] = useState(0);

  const currentUser = useSelector(selectCurrentUsername);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPosts = wholePosts?.filter((post) =>
    post?.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Yazılar" {...a11yProps(0)} />
          {username === currentUser && (
            <Tab label="Yazı Ekle" {...a11yProps(1)} />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {posts?.map((p) =>
          matches ? (
            <ExPostCard key={p?.id} post={p} playlistId={playlistId} removeFromPlaylist={true} />
          ) : (
            <PostCard key={p?.id} post={p} playlistId={playlistId} removeFromPlaylist={true} />
          )
        )}
      </CustomTabPanel>
      {username === currentUser && (
        <CustomTabPanel value={value} index={1}>
          <FormField
            fieldName="Ara"
            value={search}
            onChange={handleSearch}
            placeholder="Yazı ara..."
          />
          <br />
          <br />
          {filteredPosts?.map((p, i) => (
            <SingleOfWholePostsComp post={p} id={i} playlistId={playlistId} />
          ))}
        </CustomTabPanel>
      )}
    </Box>
  );
};

export default PostsOfPlaylistComp;
