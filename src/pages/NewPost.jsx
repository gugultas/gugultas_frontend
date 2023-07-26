import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import NewPostComp from "../components/post-single/NewPostComp";
import { Helmet } from "react-helmet-async";

const NewPost = () => {
  return (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>Yeni Yazı Ekle</title>
        <meta
          name="description"
          description="Yeni yazı ekle"
        />
      </Helmet>
      <FormLayout text="Yeni Yazınız">
        <NewPostComp />
      </FormLayout>
    </ProfileLayout>
  );
};

export default NewPost;
