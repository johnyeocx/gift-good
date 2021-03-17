import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Paper,
  Typography,
  TextField,
  Slide,
} from "@material-ui/core";
import axios from "axios";

import iphoneRed from "../../../images/iphone_red.jpg";

import useStyles from "./GiftDialogStyles";
import { useTheme } from "@material-ui/core/styles";

// dummy data for social gifts
const socialGiftsData = [
  {
    title: "iPhone 12 Red",
    description:
      "100% of all money raised by (RED) goes directly to Global Fund HIV/AIDS grants that provide testing, counseling, treatment and prevention programs with a specific focus on eliminating transmission of the virus from moms to their babies.",
    price: "$1,349",
    imageSrc: iphoneRed,
  },
  {
    title:
      "Colorful Recycled Glass Pitcher Crafted in Mexico, 'Ocean Confetti'",
    description:
      "This purchase can provide 28 packets of lifesaving nourishment to children suffering from acute malnutrition.",
    price: "$49.95",
    imageSrc: "https://images1.novica.net/pictures/7/p362078_2a_400.jpg",
  },
  {
    title:
      "Ceramic Measuring Spoons 4 Piece Blue Vines And Petals - Ten Thousand Villages",
    description:
      "Ten Thousand Villages is a leader in fair trade, offering a unique assortment of gifts — everything from ceramic measuring spoons to coffee-infused bar soap — made by more than 20,000 artisans in 30 countries around the world. The money from every product purchased goes straight into their pockets in an effort to combat generational poverty. ",
    price: "$16.34",
    imageSrc:
      "https://images-na.ssl-images-amazon.com/images/I/717Lso7uSEL._AC_SL1500_.jpg",
  },
  {
    title: "Karatasi DIY Bracelet Kit in Rainbow",
    description:
      "Akola means 'she works' in local Ugandan dialect, which makes perfect sense given thev brand's mission to give sustainable, life-giving jobs to women in Uganda. So far, they've employed 183 Ugandan women in poverty, providing financial stability and educational opportunities. ",
    price: "$59.99",
    imageSrc:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1596142758-IMG-0142_2048x_c55d9b70-b051-4967-88b3-50859c346639_x700.jpg",
  },
  {
    title: "Personal Water Filter",
    description:
      "Not only does LifeStraw guarantee cleaner drinking water for anyone using their products, but they also make it a reality for people worldwide through their Give Back Program. For every product sold, a child in need receives access to safe drinking water and hygiene education for an entire school year. ",
    price: "$17.38",
    imageSrc:
      "https://images-na.ssl-images-amazon.com/images/I/417QFsHEJWL._AC_SL1301_.jpg",
  },
  {
    title: "PHENOMENALLY SOFT CREWNECK SWEATSHIRT (BLACK) - BLACK LIVES MATTER",
    description:
      "Meena Harris started the Phenomenal Woman Action Campaign to give more women a well-deserved seat at the table. It all started with a single t-shirt, and has since been expanded to include sweatshirts, hats, and long-sleeve tees that support a wide-range of initiatives, including Black Futures Lab and Families Belong Together.",
    price: "$59.00",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/1857/6179/products/black_1080x.png?v=1593453933",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GiftDialog({
  openGiftDialog,
  setOpenGiftDialog,
  giftNumber,
  handleSaveButton,
}) {
  const theme = useTheme();
  const [giftState, setGiftState] = useState(socialGiftsData);
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [chosenGift, setChosenGift] = useState(false);
  const [descriptionTextFieldValue, setDescriptionTextFieldValue] = useState(
    ""
  );
  const [noteTextField, setNoteTextField] = useState("");

  const [isXSWidth, setIsXSWidth] = useState(
    window.innerWidth < theme.breakpoints.width("sm")
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth < theme.breakpoints.width("sm")) {
      setIsXSWidth(true);
    } else {
      setIsXSWidth(false);
    }
  });

  const selectButtonClicked = (gift) => {
    console.log(gift);
    setChosenGift(gift);
    setDescriptionTextFieldValue(gift.description);
    if (gift.note) {
      setNoteTextField(noteTextField);
    }
    setOpenConfirmDialog(true);
  };

  const [openCardDescription, setOpenCardDescription] = useState(false);
  let openArray = [];
  //   const openCardDescription
  useEffect(() => {
    setChosenGift({ ...chosenGift, note: `${noteTextField}` });
  }, [noteTextField]);

  useEffect(() => {
    setChosenGift({
      ...chosenGift,
      description: `${descriptionTextFieldValue}`,
    });
  }, [descriptionTextFieldValue]);

  async function paste() {
    const text = await navigator.clipboard.readText();
    return text;
  }

  const getUrlData = async () => {
    const text = await paste();
    console.log(text);
    const reqBody = {
      url: text,
    };
    try {
      const { data } = await axios.post(
        "https://gift-good.herokuapp.com/generate",
        reqBody
      );
      const customGift = {
        title: data.title,
        description: `Custom gift. ${data.description}`,
        price: data.price,
        imageSrc: data.productImage,
      };
      setGiftState([...giftState, customGift]);
      console.log(data);
    } catch (error) {
      console.log(error);
      alert("unable to scrape this URL");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpenGiftDialog(true);
        }}
        size="small"
      >
        CHOOSE
      </Button>
      <Dialog
        // onClose={handleGiftDialogClose}
        aria-labelledby="simple-dialog-title"
        open={openGiftDialog}
        classes={{ paper: classes.dialogPaper }}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="gift-1-container">{`GIFT ${giftNumber}`}</DialogTitle>
        <DialogContent
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#272727",
            padding: "0px",
          }}
        >
          {/* <div
            classes={classes.dialogActionsRoot}
            style={{
              display: "flex",
              position: "relative",
              height: "110%",
              overflow: "hidden",
              backgroundColor: "#272727",
            }}
          > */}
          <div className={classes.viewContainer}>
            {giftState.map((gift, index) => {
              openArray.push(false);
              return (
                <Paper
                  key={gift.title}
                  className={classes.cardRoot}
                  elevation={5}
                >
                  <div className={classes.cardMain}>
                    <div className={classes.imageContainer}>
                      <img
                        src={gift.imageSrc}
                        className={classes.cardImage}
                        alt="image not found?"
                      />
                    </div>
                    <div className={classes.titleContainer}>
                      <Typography className={classes.giftTitle}>
                        {gift.title}
                        <br />
                        {gift.price}
                      </Typography>

                      <Button
                        color="secondary"
                        size="small"
                        className={classes.learnButton}
                        onClick={() => {
                          setOpenCardDescription(true);
                        }}
                      >
                        Learn More
                      </Button>
                      <Button
                        color="secondary"
                        size="small"
                        className={classes.selectButton}
                        onClick={() => {
                          selectButtonClicked(gift);
                        }}
                      >
                        SELECT
                      </Button>
                    </div>
                  </div>
                  <div
                    className={classes.descriptionContainer}
                    style={openCardDescription ? { left: "0" } : {}}
                  >
                    <div className={classes.description}>
                      <Typography className={classes.descriptionText}>
                        <span style={{ fontWeight: "500" }}>
                          About This Item:{" "}
                        </span>
                        {gift.description}
                      </Typography>
                    </div>
                    <Button
                      onClick={() => {
                        setOpenCardDescription(false);
                      }}
                      color="secondary"
                      style={{
                        color: "black",
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        fontWeight: "400",
                      }}
                    >
                      close
                    </Button>
                  </div>
                </Paper>
              );
            })}
          </div>

          {/* confirm section */}
          <div
            className={classes.acceptContainer}
            style={
              openConfirmDialog
                ? {
                    position: "absolute",
                    right: "0",
                    height: "100%",
                    overflow: "auto",
                  }
                : {}
            }
          >
            <Typography
              variant="h5"
              className={classes.confirmHeading}
              color="secondary"
            >
              CUSTOMIZE AND SAVE YOUR GIFT
            </Typography>

            <Typography style={{ textAlign: "center" }}>
              <span style={{ fontWeight: "600" }}> Title: </span>
              {chosenGift.title}
              <br />
              <br />
              <span style={{ fontWeight: "600" }}> Price: </span>
              {chosenGift.price}
              <br />
              <br />
            </Typography>
            <TextField
              // label=" Description"
              value={descriptionTextFieldValue}
              label="Description"
              onChange={(e) => {
                e.preventDefault();
                setDescriptionTextFieldValue(e.target.value);
                setChosenGift({
                  ...chosenGift,
                  description: e.target.value,
                });
              }}
              variant="outlined"
              style={{ width: "80%", height: "120px" }}
              InputLabelProps={{
                style: {
                  height: "120px",
                },
              }}
              inputProps={{
                style: {
                  height: "80px",
                  padding: "0 14px",
                },
              }}
            />
            <br />
            <TextField
              // label=" Description"
              label="Note"
              placeholder="Write a nice note for your friend!"
              onChange={(e) => {
                e.preventDefault();
                setNoteTextField(e.target.value);
                console.log(chosenGift);
              }}
              variant="outlined"
              style={{ width: "80%", height: "120px" }}
              InputLabelProps={{
                style: {
                  height: "120px",
                },
              }}
              inputProps={{
                style: {
                  height: "80px",
                  padding: "0 14px",
                },
              }}
            />

            <div
              className={classes.imageTwoContainer}
              style={{ width: "100%" }}
            >
              <img
                src={chosenGift.imageSrc}
                className={classes.imageTwo}
                alt="not found"
              />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                handleSaveButton(giftNumber, chosenGift);
              }}
              fullWidth
              style={{
                height: "10%",
                marginBottom: "10px",
                width: "80%",
                alignSelf: "center",
              }}
            >
              {`SAVE GIFT ${giftNumber}`}
            </Button>
          </div>
          {/* </div> */}
        </DialogContent>
        <div
          className={classes.customGiftButton}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 10px 0 10px",
          }}
        >
          <Button
            style={openConfirmDialog ? { display: "none" } : {}}
            onClick={getUrlData}
          >
            {isXSWidth
              ? "Paste Link"
              : "click here to paste a link to a product (eg. Amazon) and get your own custom gift"}
          </Button>
          <Button
            style={openConfirmDialog ? {} : { display: "none" }}
            onClick={() => {
              setOpenConfirmDialog(false);
            }}
          >
            choose another gift
          </Button>
          <Button
            onClick={() => {
              setOpenGiftDialog(false);
            }}
          >
            Close
          </Button>
        </div>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default GiftDialog;
