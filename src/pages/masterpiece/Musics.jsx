import React from "react";
import { useGetMusicsAllQuery } from "../../features/masterpiece/masterpieceSlice";
import ProfileLayout from "../../layouts/ProfileLayout";
import MainLoadingComp from "../../components/loading/MainLoadingComp";
import MasterpiecesTableComp from "../../components/masterpiece/MasterpiecesTableComp";

const Musics = () => {
  const { data, isLoading } = useGetMusicsAllQuery();

  return (
    <ProfileLayout>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <MasterpiecesTableComp data={data} rewardTitle="Müzik" />
      )}
    </ProfileLayout>
  );
};

export default Musics;
