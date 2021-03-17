import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "./Preview.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialogSlide = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Terms & Usage
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Rules and Usage"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography>
              <span className="description-span">Rules & Usage: </span>Happy
              Birthday! Your gifter has cherry picked 5 wonderful gifts for you
              today! You will see the gifts in sequence and if you like the
              gift, do click the button to accept it. If you do not, click the
              red button to view the next potential gift to accept. Beware! If
              you click the red button you will be unable to receive the gift
            </Typography>
            <br />
            <Typography>
              <span className="description-span">Alternatively! </span>You . Due
              to this very special occasion, your generous gifters have decided
              to partner with Gift-It-Forward and are donating a percentage of
              the funds used to buy your gift to _____. How awesome is that?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
