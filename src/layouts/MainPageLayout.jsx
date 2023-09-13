import React from "react";

import "./../styles/sass/main.scss";
import TopOfPageAd from "../components/advertisements/TopOfPageAd";
import { Container } from "@mui/material";

const MainPageLayout = ({ children }) => {
  return (
    <Container maxWidth="xl" >
      <div className="main_page_layout">
        <TopOfPageAd />
        {children}
      </div>
    </Container>
  );
};

export default MainPageLayout;
