import React from "react";
import { TbSocial } from "react-icons/tb";
import { BsInstagram, BsReddit, BsTwitter, BsYoutube } from "react-icons/bs";
import { IconButton, Link, Menu, Stack, useTheme } from "@mui/material";
import { instaAccount, redditAccount, twitterAccount, youtubeAccount } from "../../config/constants";

const SocialLinksMenu = ({ color, size }) => {
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <TbSocial size={navSize} color={navColor} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            padding: "2px",
            backgroundColor: "#f3eeee",
            borderRadius: "30px",
          },
        }}
        // transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Stack direction="column" spacing={2} sx={{ px: 1, py: 1 }}>
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
      </Menu>
    </>
  );
};

export default SocialLinksMenu;
