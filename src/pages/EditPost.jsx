import React from "react";
import EditPostComp from "../components/post-single/EditPostComp";

import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EditPost = () => {
  const { postId } = useParams();

  return (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>Yazı Düzenle | Yazar</title>
        <meta name="description" description="Yazarlar için yazı düzenleme sayfası. " />
      </Helmet>
      <FormLayout text="Metin Düzenle">
        <EditPostComp postId={postId} />
      </FormLayout>
    </ProfileLayout>
  );
};

export default EditPost;
