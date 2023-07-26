import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useGetEncyclopediaArticlesQuery } from "../features/encyclopediaArticle/encyclopediaArticleSlice";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import ResourceNotFound from "../components/error/ResourceNotFound";
import EncyclopediaArticlesComp from "../components/encyclopediaArticle/EncyclopediaArticlesComp";
import { Helmet } from "react-helmet-async";

const EncyclopediaArticles = () => {
  const { data, isLoading, isError, error } = useGetEncyclopediaArticlesQuery();

  return (
    <MainLayout>
      <Helmet prioritizeSeoTags>
        <title>Bunları biliyor muydunuz ? </title>
        <meta name="description" description="Bunları biliyor muydunuz ? " />
      </Helmet>
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
