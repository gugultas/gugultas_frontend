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
            maxWidth: "100%",
            height: { md: "280px", lg: "250px" },
            bgcolor: "#e66a11",
            display: "flex",
            flexDirection:'column',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            align="center"
            gutterBottom
            fontSize={25}
            sx={{ fontFamily: "monospace", color:"white" }}
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

export default TopOfLogoAd;
