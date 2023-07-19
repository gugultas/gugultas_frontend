import React from "react";

import "./../styles/sass/main.scss";
import TopOfPageAd from "../components/advertisements/TopOfPageAd";

const MainPageLayout = ({ children }) => {
  return (
    <>
      <div className="main_page_layout">
        <TopOfPageAd />
        {children}
      </div>
    </>
  );
};

export default MainPageLayout;
