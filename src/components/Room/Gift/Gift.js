import React, { useState } from "react";
import {
  Typography,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./GiftStyles";
import { useTheme } from "@material-ui/core/styles";
import GiftDialog from "./GiftDialog";

function Gift({
  information,
  setValue,
  previewData,
  setPreviewData,
  handleGiftSelectButton,
  openGiftDialogOne,
  setOpenGiftDialogOne,
  openGiftDialogTwo,
  setOpenGiftDialogTwo,
  openGiftDialogThree,
  setOpenGiftDialogThree,
  openGiftDialogFour,
  setOpenGiftDialogFour,
  openGiftDialogFive,
  setOpenGiftDialogFive,
}) {
  const theme = useTheme();
  const [small, setSmall] = useState(
    window.innerWidth < theme.breakpoints.width("sm")
  );
  const [open, setOpen] = useState(false);
  const [charity, setCharity] = useState("");

  const classes = useStyles();

  window.addEventListener("resize", () => {
    if (window.innerWidth < theme.breakpoints.width("sm")) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setCharity(e.target.value);
  };

  const tmpArray = [];

  const handleSubmitButton = async () => {
    for (let i = 1; i < 6; i++) {
      if (information[i].title) {
        console.log(information[i].title);
        tmpArray[i - 1] = {
          ...information[i],
          preference: i,
          swiped: false,
        };
        if (!information[i].note) {
          tmpArray[i - 1] = { ...tmpArray[i - 1], note: "" };
        }
      }
    }
    setPreviewData(tmpArray.reverse());
    console.log(previewData);
    setValue(2);
  };

  const handleGiftDialogClose = () => {};

  return (
    <Grid
      container
      direction="row"
      className={classes.chatContainer}
      alignItems="stretch"
    >
      <Grid container direction="column" item xs={12}>
        <div className={classes.explanationContainer}>
          <Typography className={classes.explanationHeader}>
            WELCOME TO YOUR GIFT CUSTOMIZATION
          </Typography>

          <Typography className={classes.explanation}>
            Usage: Select 5 worthy gifts for your recipient according to the
            recipient's likely preference of the gift. Copy your e-commerce link
            and paste it when prompted. Alternatively, choose from our list of
            gifts which all contribute to a social cause! Also, don't forget to
            select your charity!
          </Typography>
        </div>
        <div className={classes.giftContainer}>
          <div className={classes.charityContainer}>
            <Button className={classes.charityButton} onClick={handleOpen}>
              Choose Your Charity
            </Button>
            <FormControl className={classes.formControl}>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={charity}
                onChange={handleChange}
                variant="outlined"
                color="primary"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Gift-It-Forward</MenuItem>
                <MenuItem value={20}>Alzheimer's Disease Association</MenuItem>
                <MenuItem value={30}>Assisi Hospice</MenuItem>
                <MenuItem value={30}>Zero Waste, SG</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.urlContainer}>
            <div className={classes.chooseGiftContainer}>
              <Typography className={classes.giftTitle}>
                {information[1].title
                  ? `Gift 1: ${information["1"].title}`
                  : "Choose your first gift to present"}
              </Typography>
              <GiftDialog
                openGiftDialog={openGiftDialogOne}
                setOpenGiftDialog={setOpenGiftDialogOne}
                giftNumber={1}
                handleGiftDialogClose={handleGiftDialogClose}
                getUrlData={handleSubmitButton}
                handleSaveButton={handleGiftSelectButton}
                previewData={previewData}
              />
            </div>

            <div className={classes.chooseGiftContainer}>
              <Typography className={classes.giftTitle}>
                {information["2"].title
                  ? `Gift 2: ${information["2"].title}`
                  : "Choose your second gift to present"}
              </Typography>
              <GiftDialog
                openGiftDialog={openGiftDialogTwo}
                setOpenGiftDialog={setOpenGiftDialogTwo}
                giftNumber={2}
                handleGiftDialogClose={handleGiftDialogClose}
                getUrlData={handleSubmitButton}
                handleSaveButton={handleGiftSelectButton}
              />
            </div>
            <div className={classes.chooseGiftContainer}>
              <Typography className={classes.giftTitle}>
                {information["3"].title
                  ? `Gift 3: ${information["3"].title}`
                  : "Choose your third gift to present"}
              </Typography>
              <GiftDialog
                openGiftDialog={openGiftDialogThree}
                setOpenGiftDialog={setOpenGiftDialogThree}
                giftNumber={3}
                handleGiftDialogClose={handleGiftDialogClose}
                getUrlData={handleSubmitButton}
                handleSaveButton={handleGiftSelectButton}
              />
            </div>
            <div className={classes.chooseGiftContainer}>
              <Typography className={classes.giftTitle}>
                {information["4"].title
                  ? `Gift 4: ${information["4"].title}`
                  : "Choose your fourth gift to present"}
              </Typography>
              <GiftDialog
                openGiftDialog={openGiftDialogFour}
                setOpenGiftDialog={setOpenGiftDialogFour}
                giftNumber={4}
                handleGiftDialogClose={handleGiftDialogClose}
                getUrlData={handleSubmitButton}
                handleSaveButton={handleGiftSelectButton}
              />
            </div>
            <div className={classes.chooseGiftContainer}>
              <Typography className={classes.giftTitle}>
                {information["5"].title
                  ? `Gift 5: ${information["5"].title}`
                  : "Choose your fifth gift to present"}
              </Typography>
              <GiftDialog
                openGiftDialog={openGiftDialogFive}
                setOpenGiftDialog={setOpenGiftDialogFive}
                giftNumber={5}
                handleGiftDialogClose={handleGiftDialogClose}
                getUrlData={handleSubmitButton}
                handleSaveButton={handleGiftSelectButton}
              />
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              disableElevation
              onClick={handleSubmitButton}
            >
              GENERATE PREVIEW
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={handleSubmitButton}
              color="primary"
            >
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Gift;
