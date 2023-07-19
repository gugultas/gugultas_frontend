import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { TfiPencilAlt2 } from "react-icons/tfi";
import { BsEyeglasses } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";

import "./../../styles/sass/main.scss";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import {
  BsFacebook,
  BsGlobe,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import SendActivationRequest from "../auth/SendActivationRequest";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import {
  isAdmin,
  isAuthor,
  isEditor,
} from "../../validation/conditions/checkRole";

const ProfileBox = ({ user }) => {
  console.log(user)
  const loggedUsername = useSelector(selectCurrentUsername);
  const theme = useTheme();
  const imageUrl = user?.image && `${BASE_URL}${photosApiUrl}/${user?.image}`;

  return (
    <div className="profile">
      <div className="profile__box">
        <div className="profile__box__main">
          <Avatar
            src={imageUrl}
            sx={{
              width: {
                xs: 80,
                lg: 120,
              },
              height: {
                xs: 80,
                lg: 120,
              },
            }}
          />
          <Box sx={{ alignItems: "center", textAlign: "center" }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <h3 className="heading-secondary--profile">{user?.username}</h3>
              {isAdmin(user?.roles) && (
                <Tooltip title={<Typography> Admin </Typography>} arrow>
                  <IconButton>
                    <RiAdminLine color="#0d9f0b" size={15} />
                  </IconButton>
                </Tooltip>
              )}
              {isEditor(user?.roles) && (
                <Tooltip title={<Typography> Editor </Typography>}>
                  <IconButton>
                    <BsEyeglasses color="#0d9f0b" size={15} />
                  </IconButton>
                </Tooltip>
              )}
              {isAuthor(user?.roles) && (
                <Tooltip title={<Typography> Yazar </Typography>}>
                  <IconButton>
                    <TfiPencilAlt2 color="#0d9f0b" size={15} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            {(user?.firstName || user?.lastName) && (
              <h5
                className="heading-tertiary"
                style={{ marginBottom: ".5rem" }}
              >
                {user.username && user?.firstName + " " + user?.lastName}
              </h5>
            )}
            {loggedUsername === user?.username && !user?.enabled && (
              <SendActivationRequest
                userEmail={user?.email}
                username={user?.username}
              />
            )}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 1 }}
            >
              {user?.facebook && (
                <Tooltip title="Facebook">
                  <a href={user?.facebook}>
                    <BsFacebook size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.instagram && (
                <Tooltip title="Instagram">
                  <a href={user?.instagram}>
                    <BsInstagram size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.twitter && (
                <Tooltip title="Twitter">
                  <a href={user?.twitter}>
                    <BsTwitter size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.youtube && (
                <Tooltip title="Youtube">
                  <a href={user?.youtube}>
                    <BsYoutube size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.blog && (
                <Tooltip title="Blog">
                  <a href={user?.blog}>
                    <BsGlobe size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
            </Stack>
          </Box>
        </div>
        <Divider />
        <div className="profile__box__sub"></div>
        <div className="profile__box__description">
          <p className="paragraph--min p-padding p-padding-bottom-big">
            {user?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
