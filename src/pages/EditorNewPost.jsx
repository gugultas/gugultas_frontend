import React from "react";
import EditorNewPostComp from "../components/post-single/EditorNewPostComp";
import FormLayout from "../layouts/FormLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { Helmet } from "react-helmet-async";

const EditorNewPost = () => {
  return (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>Yazı Ekle | Editor</title>
        <meta name="description" description="Editörler için yazı ekleme sayfası. " />
      </Helmet>
      <FormLayout text="Yeni Yazınız (Editor)">
        <EditorNewPostComp />
      </FormLayout>
    </ProfileLayout>
  );
};

export default EditorNewPost;
