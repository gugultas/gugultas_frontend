import React from "react";

import userInput from "./../../hooks/user.input.hook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchBar } from "../../features/search/searchSlice";

const SearchBarSpecial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { text: search, textChangeHandler: searchChangeHandler } = userInput();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(setSearchBar(search));
    navigate("/search");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        id="search"
        type="search"
        label="Search"
        value={search}
        onChange={searchChangeHandler}
        placeholder="Ara..."
        style={{
          margin: "0 12px",
          padding: "5px 8px",
          borderRadius: "10px",
          border: "1px solid #ccccccdd",
          background: "transparent",
          maxWidth: "100%",
        }}
      />
    </form>
  );
};

export default SearchBarSpecial;
