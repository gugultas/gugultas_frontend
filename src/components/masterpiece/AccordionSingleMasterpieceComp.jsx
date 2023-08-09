import React from "react";
import { MdExpandMore } from "react-icons/md";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Piano from "../../assets/img/piano.jpg";
import Canvas from "../../assets/img/canvas.jpg";
import Movie from "../../assets/img/movie.jpg";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { Stack, Tooltip } from "@mui/material";
import { BiShoppingBag, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { genres } from "../../utils/genres";
import { isAdmin, isEditor } from "../../validation/conditions/checkRole";
import { useSelector } from "react-redux";
import { selectCurrentUserRoles } from "../../features/auth/authSlice";
import UpdateMasterpiece from "./UpdateMasterpiece";

const AccordionSingleMasterpieceComp = ({
  data,
  genre,
  bgColor = "#0000007b",
}) => {
  const userRoles = useSelector(selectCurrentUserRoles);
  const imageUrl = data?.image && `${BASE_URL}${photosApiUrl}/${data?.image}`;
  return (
    <>
      <Accordion
        sx={{
          backgroundImage: `linear-gradient(to right, ${bgColor},#220a0a24), url(${
            genre === genres.MUSIC
              ? Piano
              : genre === genres.PICTURE
              ? Canvas
              : genre === genres.MOVIE
              ? Movie
              : "Tanımlanamadı"
          })`,

          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore size={25} color="white" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4 className="list-header white">
            {genre === genres.MUSIC
              ? "Haftanın Müziği"
              : genre === genres.PICTURE
              ? "Haftanın Tablosu"
              : genre === genres.MOVIE
              ? "Haftanın Perdesi"
              : "Tanımlanamadı"}
          </h4>
        </AccordionSummary>
        <AccordionDetails>
          {data ? (
            <Box
              sx={{
                backgroundImage: `linear-gradient(to left, ${bgColor},#18051199),url(${imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "200px",
                width: "100%",
                borderRadius: "30px",
                p: 2,
              }}
            >
              <Link
                to={
                  genre === genres.MUSIC
                    ? "/eserler/musicById/" + data?.id
                    : genre === genres.PICTURE
                    ? "/eserler/pictureById/" + data?.id
                    : genre === genres.MOVIE
                    ? "/eserler/movieById/" + data?.id
                    : ""
                }
              >
                <h4 className="list-header white">{data?.title}</h4>
              </Link>
              <br />
              <h4 className="heading-tertiary white"> {data?.owner} </h4>
              <br />
              <Stack direction="row" justifyContent="center" spacing={3}>
                {data?.showLink && (
                  <Tooltip title="Erişim Linki 1">
                    <a href={data?.showLink}>
                      <BiShow size={15} color="white" />
                    </a>
                  </Tooltip>
                )}
                {data?.showLink2 && (
                  <Tooltip title="Erişim Linki 2">
                    <a href={data?.showLink2}>
                      <BiShow size={15} color="white" />
                    </a>
                  </Tooltip>
                )}
                {data?.marketLink && (
                  <Tooltip title="Satın Alma Linki">
                    <a href={data?.marketLink}>
                      <BiShoppingBag size={15} color="white" />
                    </a>
                  </Tooltip>
                )}
              </Stack>
              {(isAdmin(userRoles) || isEditor(userRoles)) && (
                <UpdateMasterpiece data={data} genre={genre} />
              )}
            </Box>
          ) : (
            <h4 className="paragraph white">Henüz Belirlenmedi.</h4>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionSingleMasterpieceComp;
