import React from "react";
import { useParams } from "react-router-dom";
import ResourceNotFound from "../components/error/ResourceNotFound";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import EditorEditPostComp from "../components/post-single/EditorEditPostComp";
import { useGetCategoriesQuery } from "../features/categories/categorySlice";
import { useGetPostByIdQuery } from "../features/posts/postSlice";
import FormLayout from "../layouts/FormLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { Helmet } from "react-helmet-async";

const EditorUpdatePost = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useGetPostByIdQuery(postId);
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: ctgIsErr,
    error: ctgErr,
  } = useGetCategoriesQuery();

  return (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>Yazı Düzenle | Editor</title>
        <meta name="description" description="Editörler için yazı düzenleme sayfası. " />
      </Helmet>
      {isLoading || categoriesLoading ? (
        <MainLoadingComp isLoading={isLoading || categoriesLoading} />
      ) : isError || ctgIsErr ? (
        <ResourceNotFound
          isError={isError || ctgIsErr}
          error={error ? error : ctgErr}
        />
      ) : (
        <FormLayout text="Metin Düzenle (Editor)">
          <EditorEditPostComp post={data} categories={categories} />
        </FormLayout>
      )}
    </ProfileLayout>
  );
};

export default EditorUpdatePost;
