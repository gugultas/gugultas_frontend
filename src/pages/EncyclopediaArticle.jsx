import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetEncyclopediaArticleByIdQuery,
  useGetLastSevenEncyclopediaArticlesQuery,
} from "../features/encyclopediaArticle/encyclopediaArticleSlice";
import MainLayout from "../layouts/MainLayout";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import ResourceNotFound from "../components/error/ResourceNotFound";
import EncyclopediaArticleComp from "../components/encyclopediaArticle/EncyclopediaArticleComp";

const EncyclopediaArticle = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } =
    useGetEncyclopediaArticleByIdQuery(id);
  const {
    data: sevenInfos,
    isLoading: ldngSvn,
    isError: isErSvn,
    error: errSvn,
  } = useGetLastSevenEncyclopediaArticlesQuery();

  return (
    <MainLayout>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading || ldngSvn} />
      ) : isError ? (
        <ResourceNotFound
          isError={isError || isErSvn}
          error={error || errSvn}
        />
      ) : (
        <EncyclopediaArticleComp data={data} sevenInfos={sevenInfos} />
      )}
    </MainLayout>
  );
};

export default EncyclopediaArticle;
