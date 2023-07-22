import React from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import NewEncyclopediaArticleComp from "../components/encyclopediaArticle/NewEncyclopediaArticleComp";

const NewEncyclopediaArticle = () => {
  return (
    <ProfileLayout>
      <FormLayout text="Yeni Bilgi Ekleyiniz.">
        <NewEncyclopediaArticleComp />
      </FormLayout>
    </ProfileLayout>
  );
};

export default NewEncyclopediaArticle;
