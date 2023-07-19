import { Stack } from "@mui/material";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SIZE_ICON = 30;

const SharePost = ({ title }) => {
  const url = window.location.href;
  const style = { borderRadius: "50%" };
  return (
    <>
      <h4
        className="list-header"
        style={{ textAlign: "left", marginLeft: "1rem" }}
      >
        Paylaş :
      </h4>
      <Stack direction="row" spacing={2} sx={{ pl: 3 }}>
        <TwitterShareButton url={url}>
          <TwitterIcon size={SIZE_ICON} style={style} />
        </TwitterShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon size={SIZE_ICON} style={style} />
        </WhatsappShareButton>
        <FacebookShareButton url={url}>
          <FacebookIcon size={SIZE_ICON} style={style} />
        </FacebookShareButton>
        <EmailShareButton url={url} subject={title} separator>
          <EmailIcon size={SIZE_ICON} style={style} />
        </EmailShareButton>
        <RedditShareButton url={url}>
          <RedditIcon size={SIZE_ICON} style={style} />
        </RedditShareButton>
      </Stack>
    </>
  );
};

export default SharePost;
