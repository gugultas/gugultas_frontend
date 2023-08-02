import React from "react";
import { useGetPicturesAllQuery } from "../../features/masterpiece/masterpieceSlice";
import ProfileLayout from "../../layouts/ProfileLayout";
import MainLoadingComp from "../../components/loading/MainLoadingComp";
import MasterpiecesTableComp from "../../components/masterpiece/MasterpiecesTableComp";

const Pictures = () => {
  const { data, isLoading } = useGetPicturesAllQuery();

  return (
    <ProfileLayout>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <MasterpiecesTableComp data={data} rewardTitle="Resim" />
      )}
    </ProfileLayout>
  );
};

export default Pictures;
