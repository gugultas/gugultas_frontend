import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { MdInsertPhoto, MdPlaylistAdd } from "react-icons/md";

import FormField from "../form/FormField";
import userInput from "./../../hooks/user.input.hook";
import { validateTitleLength } from "../../validation/methods/length.method.validation";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { useCreatePlaylistMutation } from "../../features/playlist/playlistSlice";
import MultilineFormField from "../form/MultilineFormField";

const AddPlaylistComp = () => {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [error, setError] = React.useState("");

  const [addPlaylist, { isLoading }] = useCreatePlaylistMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    text: title,
    shouldDisplayError: titleHasError,
    textChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    clearHandler: titleClearHandler,
  } = userInput(validateTitleLength);

  const {
    text: description,
    shouldDisplayError: descriptionHasError,
    textChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    clearHandler: descriptionClearHandler,
  } = userInput();

  const {
    text: photo,
    textChangeHandler: photoChangeHandler,
    clearHandler: photoClearHandler,
  } = userInput();

  const clearForm = () => {
    photoClearHandler();
    titleClearHandler();
    descriptionClearHandler();
  };

  const submitHandler = async () => {
    let newPlaylist = new FormData();

    title && newPlaylist.append("title", title);
    description && newPlaylist.append("description", description);
    photo && newPlaylist.append("playlistImage", photo);

    const rep = await addPlaylist(newPlaylist);

    if (rep?.error) {
      setError(rep?.error?.data?.message);
      setOpenSnack(true);
    }
    clearForm();
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={<Typography>Okuma Listesi Ekle</Typography>}>
        <IconButton onClick={handleClickOpen}>
          <MdPlaylistAdd color="white" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle align="center" fontSize={20} fontWeight={900}>
          Playlist Ekle
        </DialogTitle>
        <DialogContent sx={{ justifyContent: "center", textAlign: "center" }}>
          <Button
            variant="contained"
            component="label"
            endIcon={<MdInsertPhoto />}
          >
            Resim Ekle
            <input
              id="image"
              hidden
              accept="image/*"
              type="file"
              onChange={photoChangeHandler}
            />
          </Button>
          <span>{photo ? photo.name : ""}</span>
          <FormField
            fieldName="title"
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            error={titleHasError}
            helperText="Maximum 75 karakterli bir başlık giriniz."
            type="text"
            fullwidth={true}
            placeholder="Başlık"
          />
          <MultilineFormField
            fieldName="description"
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            error={descriptionHasError}
            helperText="En fazla 255 karakter içeren bir tanıtım metni giriniz."
            type="text"
            fullwidth={true}
            placeholder="En fazla 255 karakter olmalıdır."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
          <Button onClick={submitHandler} disabled={isLoading}>
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default AddPlaylistComp;
