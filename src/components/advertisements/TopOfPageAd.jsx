import { Box, Typography } from "@mui/material";
import React from "react";

const TopOfPageAd = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <a href="#">
        <Box
          sx={{
            height: "100px",
            maxWidth: "100%",
            bgcolor: "#e66a11",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // my: "auto",
          }}
        >
          <Typography
            align="center"
            gutterBottom
            fontSize={25}
            sx={{ fontFamily: "monospace", color: "white" }}
          >
            Reklam Alanı
          </Typography>
          <Typography
            align="center"
            fontSize={17}
            sx={{ fontFamily: "monospace", color: "white" }}
          >
            Reklam vermek için İletişim Hattımızdan bizimle irtibata geçin.
          </Typography>
        </Box>
      </a>
    </Box>
  );
};

export default TopOfPageAd;
