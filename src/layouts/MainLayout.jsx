import { Grid, IconButton, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import DesktopNavbar from "../components/navbar/DesktopNavbar";
import Navbar from "../components/navbar/Navbar";
import { RightSide } from "../components/sides/RightSide";
import { FaAngleUp } from "react-icons/fa";

const MainLayout = ({ children }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Stack>
      {showTopBtn && (
        <IconButton
          onClick={goToTop}
          sx={{
            position: "fixed",
            bottom: 9,
            right: 9,
            cursor: "pointer",
          }}
        >
          <FaAngleUp size={30} />
        </IconButton>
      )}
      <DesktopNavbar />
      <div className="container">
        <Navbar />
        {matches ? (
          <Grid container spacing={2}>
            <Grid
              xs={12}
              md={8}
              item="true"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                mt: 4,
                p: 1,
              }}
            >
              {children}
            </Grid>
            <Grid
              xs={12}
              md={4}
              item="true"
              sx={{
                bgcolor: "#F8F9FA",
                mt: { md: 1, lg: 5 },
              }}
            >
              <RightSide />
            </Grid>
          </Grid>
        ) : (
          <Stack spacing={2} sx={{ p: 1, pt: 3 }} alignItems="center">
            {children}
            {/* <RightSide /> */}
          </Stack>
        )}
      </div>
    </Stack>
  );
};

export default MainLayout;
