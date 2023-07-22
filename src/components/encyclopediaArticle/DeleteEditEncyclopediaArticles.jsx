import { IconButton } from "@mui/material";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDeleteEncyclopediaArticleMutation } from "../../features/encyclopediaArticle/encyclopediaArticleSlice";

const DeleteEditEncyclopediaArticles = ({ eaID }) => {
  const [deleteEA, { isLoading }] = useDeleteEncyclopediaArticleMutation();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await deleteEA(eaID);

    if (response?.error) {
      console.log(response?.error);
      console.log(response?.data);
    }
  };

  return (
    <IconButton onClick={onSubmitHandler} disabled={isLoading}>
      <BsFillTrashFill color="white" />
    </IconButton>
  );
};

export default DeleteEditEncyclopediaArticles;
