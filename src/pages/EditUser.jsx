import React from "react";
import EditUserComp from "../components/profile/EditUserComp";

import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EditUser = () => {
  const { username } = useParams();

  return (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>Hesap Düzenle | Yazar</title>
        <meta name="description" description="Yazarlar için hesap düzenleme sayfası. " />
      </Helmet>
      <FormLayout text="Profil Düzenleme">
        <EditUserComp username={username} />
      </FormLayout>
    </ProfileLayout>
  );
};

export default EditUser;
