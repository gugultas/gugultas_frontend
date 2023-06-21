import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import DesktopNavbar from "../components/navbar/DesktopNavbar";
import Navbar from "../components/navbar/Navbar";
import { RightSide } from "../components/sides/RightSide";

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack>
      <DesktopNavbar />
      <div className="container">
        <Navbar />
        {matches ? (
          <Grid container spacing={2}>
            {/* <Grid
              xs={12}
              md={3}
              item="true"
              sx={{ borderRight: "0.6px solid #f0eeee",mt: { md: 1, lg: 5 }, }}
            >
              <LeftSide />
            </Grid> */}
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
            <RightSide />
          </Stack>
        )}
      </div>
    </Stack>
  );
};

export default MainLayout;
