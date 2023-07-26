import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDeletePlaylistMutation } from "../../features/playlist/playlistSlice";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { useNavigate } from "react-router-dom";

const DeletePlaylist = ({ playlistId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [error, setError] = React.useState("");

  const [deletePlaylist, { isLoading }] = useDeletePlaylistMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const resp = await deletePlaylist(playlistId);

    if (resp?.error) {
      setError(resp?.error?.data?.message);
      setOpenSnack(true);
    }
    setOpen(false);
    navigate(-1);
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        disabled={isLoading}
        sx={{
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <MdDelete color="white" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle align="center">Hesabı Sil</DialogTitle>
        <DialogContent sx={{ justifyContent: "center", textAlign: "center" }}>
          <DialogContentText>
            <p className="paragraph">
              Okuma listenizi silmek üzeresiniz , devam etmeye kararlıysanız sil
              butonuna tıklayın.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal Et</Button>
          <Button onClick={onSubmit}>Sil</Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default DeletePlaylist;
