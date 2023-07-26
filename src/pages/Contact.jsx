import React from "react";
import ContactBoxComp from "../components/contact/ContactBoxComp";
import ContactFormComp from "../components/contact/ContactFormComp";
import FormLayout from "../layouts/FormLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <ProfileLayout bgColorBlack={true}>
      <Helmet prioritizeSeoTags>
        <title>İletişim Hattı</title>
        <meta name="description" description="Gugultaş iletişim hattı. Bizimle irtibata bu sayfadan geçebilirsiniz. Mail adresleri veya doğrudan yazılı bir şekilde iletişime geçebilirsiniz. Telefon numaramızı yakında ekleyeceğiz. " />
      </Helmet>
      <FormLayout text="İLETİŞİM HATTI">
        <ContactBoxComp />
        <ContactFormComp />
      </FormLayout>
    </ProfileLayout>
  );
};

export default Contact;
