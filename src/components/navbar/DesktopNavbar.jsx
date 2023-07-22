import React from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsDiagram3 } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";

import { BRAND } from "../../config/constants";
import Logo from "./../../assets/img/logodnm4.png";
import {
  selectCurrentImage,
  selectCurrentUsername,
  selectCurrentUserRoles,
} from "../../features/auth/authSlice";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import AuthButton from "../button/AuthButton";
import {
  isAdmin,
  isAuthor,
  isEditor,
} from "../../validation/conditions/checkRole";
import useLogout from "../../hooks/useLogout.hook";
import { stringAvatar } from "../../utils/CustomProfileImage";
import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import { useGetActiveSubCategoriesByCategoryQuery } from "../../features/sub-categories/subCategorySlice";
import SocialLinks from "../social_media/SocialLinks";

const pages = [
  { id: 0, pageName: "/posts", navName: "Tüm Yazıları Gör" },
  { id: 1, pageName: "/contact-us", navName: "İletişim" },
];

const ITEM_HEIGHT = 48;

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const username = useSelector(selectCurrentUsername);
  const userRoles = useSelector(selectCurrentUserRoles);
  const image = useSelector(selectCurrentImage);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = useLogout();

  const { data: categories } = useGetCategoriesQuery();
  const { data: subCategories } = useGetActiveSubCategoriesByCategoryQuery(
    categoryName,
    {
      skip: categoryName ? false : true,
    }
  );

  const items = categories && [...categories];
  items?.sort((a, b) =>
    a.postCounts < b.postCounts ? 1 : b.postCounts < a.postCounts ? -1 : 0
  );
  const showedItems = items?.slice(0, 7);
  const listItems = items?.slice(7, items.length);
  // console.log(listItems);
  const imageUrl = image && `${BASE_URL}${photosApiUrl}/${image}`;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      handleCloseUserMenu();
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  if (!matches) {
    return;
  }

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none" }}
    >
      <Container
        maxWidth="xl"
        sx={{
          maxWidth: "100%",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            p: {
              lg: "2rem 12rem",
              md: "2rem 2rem",
            },
          }}
        >
          <Avatar src={Logo} sx={{ maxWidth: "100%", height: "auto" }} />
          <Link
            to="/home"
            style={{ marginLeft: "1rem", color: theme.palette.primary.main }}
          >
            <h3 className="list-header">{BRAND}</h3>
          </Link>
          <Box sx={{ flexGrow: 1, display: "flex", mx: 3 }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => navigate(page.pageName)}
                sx={{
                  mx: 2,
                  px: 1,
                  fontSize: "1.1rem",
                  fontWeight: "900",
                  my: 2,
                  color: theme.palette.primary.dark,
                  fontSizeAdjust: "inherit",
                  display: "block",
                  ":hover": {
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                {page.navName}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SocialLinks />
            {username ? (
              <Tooltip title="Ayarları Aç">
                <Button
                  variant="text"
                  sx={{ gap: 2 }}
                  onClick={handleOpenUserMenu}
                >
                  <Avatar
                    {...stringAvatar(username.toUpperCase())}
                    src={imageUrl}
                  />
                  <Typography
                    sx={{
                      color: theme.palette.primary.dark,
                      fontWeight: 700,
                      letterSpacing: "1px",
                    }}
                  >
                    {username}
                  </Typography>
                </Button>
              </Tooltip>
            ) : (
              <Link to="/auth">
                <AuthButton text="Aramıza Katıl !" />
              </Link>
            )}
            {username && (
              <Menu
                sx={{ mt: "45px", p: 0 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAuthor(userRoles) && (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/users/${username}`}>
                        <Typography textAlign="center">Profile Git</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/users/editUser/${username}`}>
                        <Typography textAlign="center">
                          Profil Düzenle
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to={
                          isEditor(userRoles)
                            ? "/editor/newPost"
                            : "/posts/newPost"
                        }
                      >
                        <Typography textAlign="center">
                          Yeni Yazı Ekle
                        </Typography>
                      </Link>
                    </MenuItem>
                  </div>
                )}
                {isEditor(userRoles) && (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/editor/infos`}>
                        <Typography textAlign="center">
                          Yeni Bilgi Ekle
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/masterpieces`}>
                        <Typography textAlign="center">Eserler</Typography>
                      </Link>
                    </MenuItem>
                  </div>
                )}
                {isAdmin(userRoles) && (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/editor/infos`}>
                        <Typography textAlign="center">
                          Yeni Bilgi Ekle
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/users`}>
                        <Typography textAlign="center">Kullanıcılar</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/categories`}>
                        <Typography textAlign="center">Kategoriler</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/masterpieces`}>
                        <Typography textAlign="center">Eserler</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/deactivatedPosts`}>
                        <Typography textAlign="center">
                          Deaktif Yazılar
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/mails`}>
                        <Typography textAlign="center">Mail Sayfası</Typography>
                      </Link>
                    </MenuItem>
                  </div>
                )}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    onClick={handleSignOut}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "transparent",
                      width: "100%",
                      gap: 3,
                      px: 1,
                      ":hover": {
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    <Typography textAlign="center">Çıkış Yap</Typography>
                    <AiOutlineLogout />
                  </Button>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
        <Toolbar
          disableGutters
          variant="dense"
          sx={{
            m: {
              lg: "0 12rem",
              md: "0 2rem",
            },
            bgcolor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              mx: 1,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flexWrap: "wrap",
            }}
          >
            {showedItems?.map((category) => (
              <Button
                key={category?.id}
                component={NavLink}
                to={`/posts/category/${category?.name}`}
                sx={{
                  borderRadius: 0,
                  mx: 1,
                  borderRight: "1px solid white",
                  my: 1,
                  px: 1,
                  fontSize: "1rem",
                  fontWeight: "900",
                  fontFamily: '"Montserrat", sans-serif',
                  color: "white",
                  display: "block",
                  "&.active": {
                    color: theme.palette.primary.light,
                    bgcolor: "white",
                  },
                  ":hover": {
                    color: "#ccc",
                  },
                }}
              >
                {category?.name}
              </Button>
            ))}

            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <RxHamburgerMenu color="white" />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "25ch",
                  background: theme.palette.primary.main,
                },
              }}
            >
              {listItems?.map((category) => (
                <MenuItem
                  key={category}
                  onClick={handleClose}
                  sx={{ color: "white" }}
                >
                  <Button
                    key={category?.id}
                    component={NavLink}
                    to={`/posts/category/${category?.name}`}
                    sx={{
                      borderRadius: 0,
                      fontSize: ".9rem",
                      fontWeight: "800",
                      fontFamily: '"Montserrat", sans-serif',
                      color: "white",
                      display: "block",
                      "&.active": {
                        color: theme.palette.primary.light,
                        bgcolor: "white",
                      },
                      ":hover": {
                        color: "#ccc",
                      },
                    }}
                  >
                    {category?.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

        {subCategories?.length > 0 && (
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              p: 0,
              m: {
                lg: "0 18rem",
                md: "0 9rem",
              },
              bgcolor: "#ffffff",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "2%",
                top: "20%",
                fontWeight: 900,
              }}
            >
              <BsDiagram3 size={30} color="black" />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                mx: 1,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                flexWrap: "wrap",
              }}
            >
              {subCategories?.map((subCategory) => (
                <Button
                  key={subCategory?.id}
                  component={NavLink}
                  to={`/posts/category/${categoryName}/subCategory/${subCategory?.id}`}
                  sx={{
                    mx: 0.3,
                    my: 1,
                    fontSize: ".8rem",
                    fontWeight: "700",
                    color: theme.palette.primary.dark,

                    display: "block",
                    "&.active": {
                      color: "#fff",
                      bgcolor: theme.palette.primary.main,
                    },
                    ":hover": {
                      borderRadius: 0,
                      borderBottom: "1px solid #0a5a15",
                    },
                  }}
                >
                  {subCategory?.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
};

export default DesktopNavbar;
