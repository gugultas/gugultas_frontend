import React from "react";
import { selectSearchBar } from "../features/search/searchSlice";
import { useSelector } from "react-redux";
import { useSearchPostsQuery } from "../features/posts/postSlice";
import MainLayout from "../layouts/MainLayout";
import PostsList from "../features/posts/PostsList";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import { Helmet } from "react-helmet-async";

const Search = () => {
  const searchText = useSelector(selectSearchBar);

  const { data, isLoading } = useSearchPostsQuery(searchText);

  return (
    <MainLayout>
      <Helmet prioritizeSeoTags>
        <title>{searchText + " | Gugultaş"}</title>
        <meta name="description" description={data?.description} />
      </Helmet>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : data?.length < 1 ? (
        <h3 className="list-header">Yazı bulunamadı.</h3>
      ) : (
        <PostsList propData={data} />
      )}
    </MainLayout>
  );
};

export default Search;
