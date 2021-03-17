import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import PublicIcon from "@material-ui/icons/Public";
import { buttonClass } from "./buttonStyles";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import { makeStyles } from "@material-ui/core/styles";
import { AcceptModal } from "./AcceptModal";

const useStyles = makeStyles({
  root: {
    borderRadius: "50%",
    border: "1px solid",
    width: 50,
    minWidth: 40,
    height: 50,
  }, // a style rule
  label: {}, // a nested style rule
});
const OptionButtons = ({
  swipe,
  open,
  setOpen,
  handleChosenClick,
  chosenGift,
}) => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const gutterStyles = usePushingGutterStyles({
    firstExcluded: true,
    space: 2,
  });

  return (
    <Box
      className={gutterStyles.parent}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Button
        classes={{ root: classes.root }}
        variant="outlined"
        size="small"
        style={{
          borderColor: "#00B4FF",
          color: "#00B7FF",
          fontSize: "10px",
          borderRadius: "50%",
        }}
        open={open}
        setOpen={setOpen}
        onClick={() => {
          handleChosenClick(chosenGift);
        }}
      >
        <ThumbUpAltIcon />
      </Button>
      <AcceptModal open={open} setOpen={setOpen} chosenGift={chosenGift} />
      <div></div>
      <Button
        classes={classes}
        style={{ color: "#FF7067" }}
        onClick={() => swipe("left")}
      >
        <NotInterestedIcon />
      </Button>
    </Box>
  );
};

export default OptionButtons;
