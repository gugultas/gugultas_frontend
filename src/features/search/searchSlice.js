import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchBar: "",
  },
  reducers: {
    setSearchBar: (state, action) => {
      state.searchBar = action.payload;
    },
    cleanSearchBar: (state, action) => {
      state.isSearched = "";
      state.isSearched = false;
    },
  },
});

export const { setSearchBar, cleanSearchBar } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchBar = (state) => state.searchSlice.searchBar;
