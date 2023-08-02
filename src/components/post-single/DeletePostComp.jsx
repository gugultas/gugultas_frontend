import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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
import { useDeletePostForEditorMutation } from "../../features/posts/postSlice";
import SnackbarMUI from "../snackbar/SnackbarMUI";

const DeletePostComp = ({ id }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [error, setError] = React.useState("");
  const [deletePost, { isLoading }] = useDeletePostForEditorMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await deletePost(id);

    if (response?.error) {
      setError(response?.error?.data?.message);
      setOpenSnack(true);
    }
    setOpen(false);
    navigate(-1);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} disabled={isLoading}>
        <MdDelete color={theme.palette.secondary.main} />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle align="center">Hesabı Sil</DialogTitle>
        <DialogContent sx={{ justifyContent: "center", textAlign: "center" }}>
          <DialogContentText>
            <p className="paragraph">
              Bu yazıyı kalıcı olarak silmek üzeresiniz , devam etmeye kararlıysanız sil
              butonuna tıklayın.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal Et</Button>
          <Button onClick={onSubmitHandler}>Sil</Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default DeletePostComp;
