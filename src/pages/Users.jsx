import React from "react";
import ResourceNotFound from "../components/error/ResourceNotFound";
import UsersList from "../components/list/UsersList";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import { useGetAllUsersQuery } from "../features/user/usersSlice";
import ProfileLayout from "../layouts/ProfileLayout";
import { Helmet } from "react-helmet-async";

const Users = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();
  return (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>{"Kullanıcılar | Gugultaş"}</title>
        <meta name="description" description={data?.description} />
      </Helmet>
      {isLoading && <MainLoadingComp isLoading={isLoading} />}
      {isError && <ResourceNotFound isError={isError} error={error} />}
      <UsersList users={data} />
    </ProfileLayout>
  );
};

export default Users;
