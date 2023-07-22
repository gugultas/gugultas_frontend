import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import FormButton from "../button/FormButton";
import EditorToolbar, {
  formats,
  modules,
} from "./../../utils/QuillEditorToolbar";
import { validateContentTitleLength } from "../../validation/methods/length.method.validation";
import userInput from "../../hooks/user.input.hook";
import FormField from "../form/FormField";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { useCreateEncyclopediaArticleMutation } from "../../features/encyclopediaArticle/encyclopediaArticleSlice";

const NewEncyclopediaArticleComp = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");

  const [createEncyclopediaArticle, { isLoading }] =
    useCreateEncyclopediaArticleMutation();

  const {
    text: title,
    shouldDisplayError: titleHasError,
    textChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    clearHandler: titleClearHandler,
  } = userInput(validateContentTitleLength);

  const clearForm = () => {
    titleClearHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (titleHasError) return;

    setProgress(true);

    const newEncyclopediaArticle = {
      title,
      content,
    };

    const resp = await createEncyclopediaArticle(newEncyclopediaArticle);

    if (resp.error) {
      setProgress(false);
      setError(resp.error?.data?.message);
      setOpen(true);
    } else {
      clearForm();
      setProgress(false);
      navigate("/home");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
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
        <div style={{ maxWidth: "100%", margin: "3rem auto" }}>
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder={"Metninizi buraya ekleyin..."}
            modules={modules}
            formats={formats}
            style={{ height: "40rem" }}
          />
        </div>
        <FormButton
          text="Yazıyı Ekle"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={isLoading}
        />
      </Stack>
      <SnackbarMUI open={open} setOpen={setOpen} text={error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
};

export default NewEncyclopediaArticleComp;
