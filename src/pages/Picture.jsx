import React from "react";
import { useGetPictureByIdQuery } from "../features/masterpiece/masterpieceSlice";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import MasterpieceById from "../components/masterpiece/MasterpieceById";
import { Helmet } from "react-helmet-async";

const Picture = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetPictureByIdQuery(id);

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

export default Picture;
