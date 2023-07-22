import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import moment from "moment";
import EditEncyclopediaArticles from "./EditEncyclopediaArticles";
import DeleteEditEncyclopediaArticles from "./DeleteEditEncyclopediaArticles";
import { useSelector } from "react-redux";
import { selectCurrentUserRoles } from "../../features/auth/authSlice";
import { isEditor } from "../../validation/conditions/checkRole";

const EncyclopediaArticlesComp = ({ data }) => {
  const userRoles = useSelector(selectCurrentUserRoles);
  return (
    <>
      <h4 className="info-header"> Bunları Biliyor Muydunuz ? </h4>
      <List sx={{ width: "100%", mt: 2 }}>
        {data?.map((e, i) => (
          <ListItem
            component={NavLink}
            to={`/infos/${e?.id}`}
            key={e?.id}
            sx={{ bgcolor: "#001f24", borderRadius: "5px", mb: 2 }}
          >
            <ListItemAvatar>
              <BsFillArrowRightCircleFill color="white" fontSize={20} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography color="white" fontSize={12} fontWeight={900}>
                  {e?.title}
                </Typography>
              }
              secondary={
                <Typography color="white">
                  {moment(e?.createDateTime).format("dddd MM/YY")}
                </Typography>
              }
            />
            {isEditor(userRoles) && (
              <ListItemSecondaryAction>
                <Stack direction="row" spacing={1}>
                  <EditEncyclopediaArticles data={e} />
                  <DeleteEditEncyclopediaArticles eaID={e?.id} />
                </Stack>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default EncyclopediaArticlesComp;
