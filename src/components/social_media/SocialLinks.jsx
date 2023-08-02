import { Link, Stack, useTheme } from "@mui/material";
import React from "react";
import {
  BsInstagram,
  BsReddit,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import {
  instaAccount,
  redditAccount,
  twitterAccount,
  youtubeAccount,
} from "../../config/constants";

const SocialLinks = ({ color, size }) => {
  const theme = useTheme();
  const navColor =
    color === "light"
      ? theme.palette.primary.light
      : theme.palette.primary.dark;
  const navSize = size === "small" ? 9 : 20;
  const linkStyle = {
    color: navColor,
    ":hover": {
      color: theme.palette.primary.main,
    },
  };

  return (
    <Stack
      direction="row"
      spacing={size === "small" ? 0.5 : 2}
      alignItems="center"
      sx={{ mt: { xs: 0, md: 1 }, mx: { xs: 0, md: 3 } }}
    >
      <Link href={instaAccount} sx={linkStyle}>
        <BsInstagram size={navSize} />
      </Link>
      <Link href={twitterAccount} sx={linkStyle}>
        <BsTwitter size={navSize} />
      </Link>
      <Link href={youtubeAccount} sx={linkStyle}>
        <BsYoutube size={navSize} />
      </Link>
      <Link href={redditAccount} sx={linkStyle}>
        <BsReddit size={navSize} />
      </Link>
    </Stack>
  );
};

export default SocialLinks;
