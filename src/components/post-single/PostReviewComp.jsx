import React from "react";
import { IoMdEye } from "react-icons/io";
import { MdClose } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { Container } from "@mui/material";
import { parseHtmlText } from "../../utils/htmlParseConfig";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostReviewComp = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen} sx={{ width: 27, height: 27 }}>
        <IoMdEye color="black" />
      </IconButton>
      <Dialog
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <MdClose color="white" size={20} />
            </IconButton>
            <Typography
              sx={{ color: "white", ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              {data?.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ p: 2 }}>
          <h4 className="heading-tertiary" style={{ textAlign: "left" }}>
            {data?.subtitle}
          </h4>
          <p className="paragraph--parsed">{parseHtmlText(data?.content)}</p>
        </Container>
      </Dialog>
    </>
  );
};

export default PostReviewComp;
