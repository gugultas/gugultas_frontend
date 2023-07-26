import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDeactivateUserMutation } from "../../features/user/usersSlice";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { useNavigate } from "react-router-dom";

const DeactivateUser = ({ userId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [error, setError] = React.useState("");

  const [deleteUser, { isLoading }] = useDeactivateUserMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async () => {
    const rep = await deleteUser(userId);

    if (rep?.error) {
      setError(rep?.error?.data?.message);
      setOpenSnack(true);
    }
    setOpen(false);
    navigate("/home");
  };

  return (
    <>
      <Tooltip title={<Typography> Hesabı Sil </Typography>} >
        <IconButton onClick={handleClickOpen} disabled={isLoading}>
          <MdDelete color="white" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle align="center">Hesabı Sil</DialogTitle>
        <DialogContent sx={{ justifyContent: "center", textAlign: "center" }}>
          <DialogContentText>
            <p className="paragraph">
              Hesabınızı silmek üzeresiniz. Eğer onaylarsanız hesabınız pasif
              hale getirelecektir. Eğer bir ay içinde hesabı aktifleştirmek için
              bizimle irtibata geçmez iseniz hesabınız kalıcı olarak
              silinecektir.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal Et</Button>
          <Button onClick={submitHandler}>Hesabı Sil</Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default DeactivateUser;
