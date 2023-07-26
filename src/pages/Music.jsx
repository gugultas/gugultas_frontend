import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useGetMusicByIdQuery } from "../features/masterpiece/masterpieceSlice";
import MasterpieceById from "../components/masterpiece/MasterpieceById";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import { Helmet } from "react-helmet-async";

const Music = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMusicByIdQuery(id);

  return (
    <MainLayout>
      <Helmet prioritizeSeoTags>
        <title>{data?.title + " | Eser"}</title>
        <meta
          name="description"
          description={data?.showLink + " " + data?.showLink2 + " " + data?.marketLink }
        />
      </Helmet>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <MasterpieceById data={data} />
      )}
    </MainLayout>
  );
};

export default Music;
