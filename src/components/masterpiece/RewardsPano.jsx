import React from "react";
import { Link } from "react-router-dom";
import { Stack, useTheme } from "@mui/material";
import { FaAward } from "react-icons/fa";

const RewardsPano = () => {
  const theme = useTheme();
  return (
    <Stack
      component={Link}
      to={"/eserler"}
      alignItems="center"
      spacing={2}
      sx={{
        bgcolor: theme.palette.primary.contrastText,
        p: 3,
      }}
    >
      <FaAward size={60} color="gold" />
      <h3 className="list-header" style={{ color: "gold" }}>
        Haftalık Ödüller
      </h3>
    </Stack>
  );
};

export default RewardsPano;
