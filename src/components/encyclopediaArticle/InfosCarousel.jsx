import { IconButton, Paper, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";
import { BsLightbulb } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import Carousel from "react-material-ui-carousel";
import { Link, NavLink } from "react-router-dom";

const InfosCarousel = ({ data }) => {
  const theme = useTheme();
  return (
    <Stack sx={{ my: 3, mx: { xs: 0, sm: 3, lg: 4 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ bgcolor: theme.palette.primary.dark, py: 0.5, px: 2 }}
      >
        <Typography
          className="list-header"
          sx={{
            color: "white",
            textAlign: "left",
            fontSize: { xs: "1.4rem", md: "1.7rem" },
          }}
        >
          Bunları Biliyor Muydunuz ?
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          spacing={0.2}
        >
          <IconButton>
            <BsLightbulb size={17} color="yellow" />
          </IconButton>
          <IconButton component={NavLink} to={`/infos`}>
            <CgMoreO size={17} color="yellow" />
          </IconButton>
        </Stack>
      </Stack>
      <Carousel
        indicators={false}
        navButtonsAlwaysInvisible
        sx={{
          borderRadius: 0,
          width: "100%",
          bgcolor: "#ccc",
        }}
        duration={900}
      >
        {data?.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Stack>
  );
};

function Item(props) {
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up("md"));
  // const smMatches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Paper elevation={0} sx={{ p: "1.3rem" }}>
      <Link
        to={"/infos/" + props.item?.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem 0 1rem",
        }}
      >
        <h3
          style={{
            bgcolor: "pink",
            color: "black",
            fontSize: "1.5rem",
            fontFamily: '"Lora", serif',
          }}
        >
          {props?.item?.title}
        </h3>
        <h5
          style={{
            bgcolor: "pink",
            color: "#251f1fb8",
            fontSize: "1.1rem",
            padding: "0 0 0 3rem",
            fontFamily: '"Lora", serif',
          }}
        >
          {moment(props?.item?.createDateTime).format("dddd MM/YY")}
        </h5>
      </Link>
    </Paper>
  );
}

export default InfosCarousel;
