import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ResourceNotFound from "../components/error/ResourceNotFound";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import ProfileBox from "../components/profile/ProfileBox";
import { useGetAuthorByQuery } from "../features/user/usersSlice";
import ProfileLayout from "../layouts/ProfileLayout";
import PostListfOfAuthorByScrollComp from "../components/post-list/PostListfOfAuthorByScrollComp";

const Profile = () => {
  const { username } = useParams();
  const { data, isLoading, isError, error } = useGetAuthorByQuery(username);

  return isError ? (
    <ProfileLayout>
      <ResourceNotFound isError={isError} error={error} />
    </ProfileLayout>
  ) : (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>{username + " | Gugultaş"}</title>
        <meta name="description" description={data?.description} />
      </Helmet>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <ProfileBox user={data} />
      )}
      <PostListfOfAuthorByScrollComp username={username} />
    </ProfileLayout>
  );
};

export default Profile;
