import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useGetPlaylistsByAuthorQuery } from "../../features/playlist/playlistSlice";
import MainLoadingComp from "../loading/MainLoadingComp";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { MdExpandMore } from "react-icons/md";
import { NavLink } from "react-router-dom";

const PlaylistListComp = ({ username }) => {
  const { data, isLoading } = useGetPlaylistsByAuthorQuery(username);

  if (isLoading) {
    return <MainLoadingComp isLoading={isLoading} />;
  }

  return (
    <Accordion
      sx={{
        width: "100%",
        px: { sm: 5, md: 10, lg: 15 },
        bgcolor: "transparent",
        border: "none",
      }}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<MdExpandMore size={20} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h3 className="list-header">Okuma Listeleri</h3>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowGap={2}>
          {data?.map((p) => (
            <Grid
              key={p?.id}
              xs={12}
              sm={6}
              md={4}
              component={NavLink}
              to={`/${username}/playlists/${p?.id}`}
            >
              <Stack
                spacing={1}
                sx={{
                  maxWidth: "100%",
                  mx: 1,
                }}
              >
                <img
                  src={`${BASE_URL}${photosApiUrl}/${p?.playlistImage}`}
                  alt={p?.title}
                  style={{
                    maxWidth: "100%",
                    height: "120px",
                    borderRadius: "50px",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    fontWeight: "bolder",
                    color: "black",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {p?.title}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default PlaylistListComp;
