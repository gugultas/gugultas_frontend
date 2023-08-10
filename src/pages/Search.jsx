import React from "react";
import { selectSearchBar } from "../features/search/searchSlice";
import { useSelector } from "react-redux";
import { useSearchPostsQuery } from "../features/posts/postSlice";
import MainLayout from "../layouts/MainLayout";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import { Helmet } from "react-helmet-async";
import PostListLoadByScrollComp from "../components/post-list/PostListLoadByScrollComp";

const Search = () => {
  const searchText = useSelector(selectSearchBar);

  const { data, isLoading } = useSearchPostsQuery(searchText);
  
  return (
    <MainLayout>
      <Helmet prioritizeSeoTags>
        <title>{searchText + " | Gugultaş"}</title>
        <meta name="description" description={searchText} />
      </Helmet>
      <h3 className="heading-secondary u-margin-bottom-medium">
        Arama Sonuçları
      </h3>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : data?.length < 1 ? (
        <h3 className="paragraph">
          <em> {searchText + " "} </em> ile ilgili herhangi bir yazı bulunamadı.
        </h3>
      ) : (
        <PostListLoadByScrollComp searchData={data} />
      )}
    </MainLayout>
  );
};

export default Search;
