import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { MdEdit, MdInsertPhoto } from "react-icons/md";
import FormField from "../form/FormField";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { useUpdatePlaylistMutation } from "../../features/playlist/playlistSlice";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import MultilineFormField from "../form/MultilineFormField";

const EditPlaylist = ({ data }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [values, setValues] = React.useState({
    title: data?.title,
    image: "",
    description: data?.description,
    imageProtect: true,
  });
  const [error, setError] = React.useState("");

  const photoImage =
    data?.playlistImage && `${BASE_URL}${photosApiUrl}/${data?.playlistImage}`;
  const [editPlaylistAPI, { isLoading }] = useUpdatePlaylistMutation();

  const { title, description, imageProtect, image } = values;

  const handleImageControlChange = (event) => {
    setValues({ ...values, imageProtect: !imageProtect });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, description, image, imageProtect } = values;

    if (!imageProtect && image === null) {
      return;
    }

    let updatePlaylist = new FormData();

    title && updatePlaylist.append("title", title);
    description && updatePlaylist.append("description", description);
    image && updatePlaylist.append("playlistImage", image);
    updatePlaylist.append("imageProtect", imageProtect);

    const editPlaylist = {
      id: data?.id,
      body: updatePlaylist,
    };

    const resp = await editPlaylistAPI(editPlaylist);

    if (resp?.error) {
      console.log(resp?.error);
      setError(resp?.error?.data?.message);
    }

    if (!resp.error) {
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          bgcolor: theme.palette.primary.main,
        }}
      >
        <MdEdit color="white" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle
          sx={{
            mb: 2,
            bgcolor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
          }}
          align="center"
        >
          Oynatma Listesini Düzenle
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{ textAlign: "center", alignItems: "center", margin: "auto" }}
          >
            <Button
              variant="contained"
              component="label"
              endIcon={<MdInsertPhoto />}
            >
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleChange("image")}
              />
            </Button>
            <span>{image ? image.name : ""}</span>
            <Stack direction="row" spacing={1} sx={{ pb: 4 }}>
              <img
                src={photoImage}
                style={{
                  width: "20rem",
                  height: "15rem",
                }}
                alt="user media"
              />
              <Stack direction="row" spacing={0} alignItems="center">
                <Checkbox
                  checked={imageProtect}
                  onChange={handleImageControlChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography> Fotoğrafı koru. </Typography>
              </Stack>
            </Stack>
            <FormField
              value={title}
              onChange={handleChange("title")}
              helperText="En fazla 75 karakter olabilir."
              type="text"
            />
            <MultilineFormField
              fieldName="description"
              value={description}
              onChange={handleChange("description")}
              helperText="Metin en fazla 255 karakter olmalıdır."
              type="text"
              rows={7}
              fullWidth={true}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal Et</Button>
          <Button onClick={onSubmitHandler} disabled={isLoading}>
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default EditPlaylist;
