import React from "react";
import { useGetMoviesAllQuery } from "../../features/masterpiece/masterpieceSlice";
import MainLoadingComp from "../../components/loading/MainLoadingComp";
import MasterpiecesTableComp from "../../components/masterpiece/MasterpiecesTableComp";
import ProfileLayout from "../../layouts/ProfileLayout";

const Movies = () => {
  const { data, isLoading } = useGetMoviesAllQuery();

  return (
    <ProfileLayout>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <MasterpiecesTableComp data={data} rewardTitle="Film" />
      )}
    </ProfileLayout>
  );
};

export default Movies;
