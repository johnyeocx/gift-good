import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import "./Preview.css";
import useStyles from "./PreviewStyles";
import parley from "../../../images/parley.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AcceptModal = ({ open, setOpen, chosenGift }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {chosenGift ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"ARE YOU SURE THIS IS WHAT YOU WANT?"}
          </DialogTitle>
          <DialogContent style={{ padding: "20px" }}>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography variant="body1" style={{ color: "white" }}>
                <span className="description-span">Title: </span>
                {chosenGift.title}
                <br />
                <br />
              </Typography>

              <Typography style={{ color: "white" }}>
                <span className="description-span">Description: </span>{" "}
                {chosenGift.description}
              </Typography>
              <br />
              <br />
              <div className={classes.confirmImageContainer}>
                <Paper className={classes.confirmImagePaper} elevation={2}>
                  <img src={chosenGift.imageSrc} className="cover" />
                </Paper>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ padding: "20px" }}>
            <Button
              onClick={handleClose}
              color="secondary"
              variant="contained"
              fullWidth
              disableElevation
            >
              ACCEPT
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};
