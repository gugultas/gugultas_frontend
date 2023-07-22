import { Box, Typography } from "@mui/material";
import React from "react";

const TopOfLogoAd = () => {
  return (
    <Box>
      <a href="#">
        {/* <img
          src="https://i.gifer.com/fyKH.gif"
          alt="logo"
          style={{
            objectFit: "cover",
            maxWidth: "100%",
            height: "300px",
            justifyContent: "center",
          }}
        /> */}
        <Box
          sx={{
            my: 1,
            maxWidth: "100%",
            height: { md: "280px", lg: "250px" },
            bgcolor: "transparent",
            border: "1px solid black",
            boxShadow: { xs: "none", md: "11px 12px #4f4b4b" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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

export default TopOfLogoAd;
