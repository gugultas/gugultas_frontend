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
            bgcolor: "transparent",
            border: "1px solid black",
            boxShadow: "3px 5px #4f4b4b",
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
            sx={{ fontFamily: "monospace", color: "black" }}
          >
            Reklam Alanı
          </Typography>
          <Typography
            align="center"
            fontSize={17}
            sx={{ fontFamily: "monospace", color: "black" }}
          >
            Reklam vermek için İletişim Hattımızdan bizimle irtibata geçiniz.
          </Typography>
        </Box>
      </a>
    </Box>
  );
};

export default TopOfPageAd;
