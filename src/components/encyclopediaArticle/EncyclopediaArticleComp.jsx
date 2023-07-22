import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { parseHtmlText } from "../../utils/htmlParseConfig";
import { NavLink } from "react-router-dom";
import { AiFillRightCircle } from "react-icons/ai";
import moment from "moment";

const EncyclopediaArticleComp = ({ data, sevenInfos }) => {
  return (
    <Stack spacing={4} sx={{ p: { xs: 0.5, md: 1.5 } }}>
      <h2 className="info-header p-padding-top-medium">{data.title}</h2>

      <p className="paragraph--parsed">{parseHtmlText(data?.content)}</p>

      <h4
        className="list-header"
        style={{ textAlign: "left", marginLeft: "1rem" }}
      >
        Bunları Biliyor muydunuz ?
      </h4>
      <List>
        {sevenInfos?.map((e) => (
          <ListItem key={e?.id}>
            <ListItemButton
              component={NavLink}
              to={`/infos/${e?.id}`}
              sx={{ borderBottom: "1px solid grey" }}
            >
              <ListItemIcon sx={{ px: 0, mx: 0 }}>
                <AiFillRightCircle fontSize={20} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontSize={12} fontWeight={700}>
                    {e?.title}
                  </Typography>
                }
                secondary={
                  <Typography fontSize={10}>
                    {moment(e?.createdTime).format("dddd DD/MM/YYYY")}{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default EncyclopediaArticleComp;
