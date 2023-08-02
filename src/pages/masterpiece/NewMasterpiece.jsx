import React, { useState } from "react";
import FormPageLayout from "../../layouts/FormPageLayout";
import { MenuItem, TextField } from "@mui/material";
import NewMasterpieceComp from "../../components/masterpiece/NewMasterpieceComp";
import { Helmet } from "react-helmet-async";

const NewMasterpiece = () => {
  const genres = ["music", "picture", "movie"];

  const [genre, setGenre] = useState("");

  const handleChange = (e) => setGenre(e.target.value);

  return (
    <FormPageLayout>
      <Helmet prioritizeSeoTags>
        <title>Eser Ekle</title>
        <meta
          name="description"
          description="Eser ekle"
        />
      </Helmet>
      <TextField
        id="genre"
        required
        select
        fullWidth
        label="Select Genre"
        value={genre}
        onChange={handleChange}
        sx={{
          m: 2,
          maxWidth: 300,
        }}
        helperText="Please select genre"
        variant="standard"
      >
        {genres.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <NewMasterpieceComp genre={genre} />
    </FormPageLayout>
  );
};

export default NewMasterpiece;
