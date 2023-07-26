import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearchBar } from "../../features/search/searchSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { MdSearch } from "react-icons/md";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  marginLeft: 0,

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontWeight: "bolder",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(setSearchBar(search));
    navigate("/search");
  };

  return (
    <Search>
      {pathname === "/search" ? (
        <>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onClick={onSubmitHandler}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Aramak için ikona tıkla"}
            inputProps={{ "aria-label": "search" }}
          />
        </>
      ) : (
        <Tooltip title={<Typography>Arama Sayfasına Git</Typography>}>
          <IconButton
            component={NavLink}
            to="/search"
            sx={{ bgcolor: "transparent" }}
          >
            <MdSearch size={15} />
          </IconButton>
        </Tooltip>
      )}
    </Search>
  );
};

export default SearchBar;
