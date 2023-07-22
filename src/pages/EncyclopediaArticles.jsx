import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useGetEncyclopediaArticlesQuery } from "../features/encyclopediaArticle/encyclopediaArticleSlice";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import ResourceNotFound from "../components/error/ResourceNotFound";
import EncyclopediaArticlesComp from "../components/encyclopediaArticle/EncyclopediaArticlesComp";

const EncyclopediaArticles = () => {
  const { data, isLoading, isError, error } = useGetEncyclopediaArticlesQuery();

  return (
    <MainLayout>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : isError ? (
        <ResourceNotFound isError={isError} error={error} />
      ) : (
        <EncyclopediaArticlesComp data={data} />
      )}
    </MainLayout>
  );
};

export default EncyclopediaArticles;
