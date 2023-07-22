import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import SnackbarMUI from "../snackbar/SnackbarMUI";
import EditorToolbar, {
  formats,
  modules,
} from "./../../utils/QuillEditorToolbar";
import { validateContentTitleLength } from "../../validation/methods/length.method.validation";
import FormField from "../form/FormField";
import { useUpdateEncyclopediaArticleMutation } from "../../features/encyclopediaArticle/encyclopediaArticleSlice";
import { BiEditAlt } from "react-icons/bi";

const EditEncyclopediaArticles = ({ data }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [values, setValues] = React.useState({
    title: data?.title,
  });
  const [error, setError] = React.useState("");
  const [info, setInfo] = React.useState(data?.content);

  const [editEA, { isLoading }] = useUpdateEncyclopediaArticleMutation();

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

  const { title } = values;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (title === "" || !validateContentTitleLength(title)) {
      setOpenSnack(true);
      setError("Provide a valid title less than 75 characters , please.");
      return;
    }

    const editEABody = {
      title,
      content: info,
    };

    const reqBody = {
      id: data?.id,
      body: editEABody,
    };

    const resp = await editEA(reqBody);

    if (resp?.error) {
      setError(resp?.error?.data?.message);
      setOpenSnack(true);
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <BiEditAlt color="white" />
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
          Eseri Düzenle
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{ textAlign: "center", alignItems: "center", margin: "auto" }}
          >
            <FormField
              value={title}
              onChange={handleChange("title")}
              helperText="En fazla 75 karakter olabilir."
              type="text"
            />
            <div style={{ maxWidth: "100%", margin: "2rem auto" }}>
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={info}
                onChange={setInfo}
                placeholder={"Metninizi buraya ekleyin..."}
                modules={modules}
                formats={formats}
                style={{ height: "40rem" }}
              />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal Et</Button>
          <Button onClick={submitHandler} disabled={isLoading}>
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default EditEncyclopediaArticles;
