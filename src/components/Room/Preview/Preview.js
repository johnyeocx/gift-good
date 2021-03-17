import React, { useState, useMemo, useEffect, useForceUpdate } from "react";
import ReactFlipCard from "react-card-flip";
import {
  Typography,
  Card,
  Grid,
  CardMedia,
  CardContent,
  Button,
  ButtonGroup,
  Paper,
  IconButton,
  setValue,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import "./Preview.css";
import useStyles from "./PreviewStyles";

import productImage from "../../../images/productImage.jpg";
import parley from "../../../images/parley.jpg";
import PublicIcon from "@material-ui/icons/Public";
import ClearIcon from "@material-ui/icons/Clear";

import OptionButtons from "./Buttons";
import { AlertDialogSlide } from "./Rules";
import TinderCard from "react-tinder-card";
import zIndex from "@material-ui/core/styles/zIndex";
import { AcceptModal } from "./AcceptModal";
// const db = [
//   {
//     title:
//       "All-new Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto rem nulla atque dolor veniam animi in eaet unde dolores, odio sequi quas esse sit eligendi. Esse necessitatibus quas animi?",
//     note:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptates quo reiciendis ex atque necessitatibus.",
//     preference: 1,
//     imageSrc:
//       "https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/amazon-seo-product-images.jpg?RTG4A4jxOolNLZ63fSqHL5uboAaRwXU6&itok=XSbikWqd",
//     swiped: false,
//   },
//   {
//     title:
//       " ZAYOR STEM Building Sets Remote Control Race Car Educational Toys Learning Building Kits for Boys Birthday Gift for Kids 6 7 8 9 10 11 12+ and Adults (457Pcs)",
//     description: "None",
//     note:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptates quo reiciendis ex atque necessitatibus.",
//     preference: 2,
//     imageSrc:
//       "https://images-na.ssl-images-amazon.com/images/I/71V0n9L1K8L._AC_SX679_.jpg",
//     swiped: false,
//   },
//   {
//     title: " Trial",
//     description: "None",
//     note:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptates quo reiciendis ex atque necessitatibus.",
//     preference: 3,
//     imageSrc:
//       "https://static.businessworld.in/article/article_extra_large_image/1597056012_CNRvas_amazon_dkblue_noto_email_v2016_us_main_CB468775337_.png",
//     swiped: false,
//   },
// ];

const dummySocialGift = {
  title: "ADIDAS X PARLEY ULTRABOOST DNA",
  description:
    "In 2015, adidas brought a prototype shoe to the United Nations to show what could be achieved in the fight to end plastic waste. These men's running shoes are made with a seamless knit upper that's made with yarn spun from plastic reclaimed from beaches and coastal communities. Responsive cushioning returns energy to your stride.",
  note: "You are 18! Be compassionate!",
  charity: "Zero Waste SG",
  imageSrc: parley,
};

const alreadyRemoved = [];
let giftsState = [];

function Preview({ previewData, setPreviewData }) {
  const [childRefs, setChildRefs] = useState([]);
  const [gifts, setGifts] = useState(previewData);
  useEffect(() => {
    setGifts(previewData);
    setChildRefs(
      Array(previewData.length)
        .fill(0)
        .map((i) => React.createRef())
    );
    giftsState = previewData;
  }, [previewData]);

  const [openChosenDialog, setOpenChosenDialog] = useState(false);

  // const childRefs = () =>
  //   Array(previewData.length)
  //     .fill(0)
  //     .map((i) => React.createRef());

  const [value, setValue] = useState(0);
  const [chosenGift, setChosenGift] = useState();
  const [openCharityDialog, setOpenCharityDialog] = useState(false);
  function forceUpdate() {
    // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }

  const theme = useTheme();
  const classes = useStyles();
  const [small, setSmall] = useState(
    window.innerWidth < theme.breakpoints.width("sm")
  );
  const [isSMWidth, setIsSMWidth] = useState(
    window.innerWidth < theme.breakpoints.width("md")
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth < theme.breakpoints.width("sm")) {
      setSmall(true);
    } else {
      setSmall(false);
    }
    if (window.innerWidth < theme.breakpoints.width("md")) {
      setIsSMWidth(true);
    } else {
      setIsSMWidth(false);
    }
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [isCharityFlipped, setIsCharityFlipped] = useState(false);
  const [isCreatorView, setIsCreatorView] = useState(true);
  const [isEmpty, setIsEmpty] = useState(gifts.length === 0);

  const swiped = (direction, giftToDelete) => {
    console.log("removing: " + giftToDelete);
    alreadyRemoved.push(giftToDelete);
  };

  const outOfFrame = (giftName) => {
    console.log(giftName + " left the screen!");
    giftsState = giftsState.filter((gift) => gift.title !== giftName);
    setGifts(giftsState);
    console.log(giftsState.length);
    if (giftsState.length === 0) {
      setIsEmpty(true);
    }
  };

  const swipe = async (dir) => {
    const cardsLeft = gifts.filter(
      (gift) => !alreadyRemoved.includes(gift.title)
    );

    console.log("cardsLeft:");
    console.log(cardsLeft);
    if (cardsLeft.length) {
      // Find the card object to be removed
      console.log(cardsLeft.length);
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].title;
      console.log(toBeRemoved);
      // Find the index of which to make the reference to
      const index = previewData.map((gift) => gift.title).indexOf(toBeRemoved);
      console.log(index);
      // Make sure the next card gets removed next time if this card do not have time to exit the screen
      alreadyRemoved.push(toBeRemoved);
      console.log(childRefs[index]);
      await childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  const chooseButtonClicked = (gift) => {
    console.log(gift);
    setChosenGift(gift);
    setOpenChosenDialog(true);
  };

  const chooseCharityButtonClicked = (gift) => {
    console.log(gift);
    setOpenCharityDialog(true);
  };

  return (
    <Grid
      container
      direction="row"
      className={classes.chatContainer}
      alignItems="stretch"
    >
      <Grid
        container
        direction="column"
        item
        xs={12}
        className={classes.chatUI}
      >
        <div className={classes.giftDisplayContainer}>
          {isCreatorView || !isSMWidth ? (
            <div
              className={classes.creatorGiftContainer}
              style={isEmpty ? { display: "none" } : {}}
            >
              {gifts
                ? gifts.map((gift, index) => {
                    return (
                      <TinderCard
                        ref={childRefs[index]}
                        className="swipe"
                        key={gift.title}
                        onSwipe={(dir) => {
                          swiped(dir, gift.title);
                        }}
                        onCardLeftScreen={() => outOfFrame(gift.title)}
                        // preventSwipe={["left", "right", "up", "down"]}
                        styles={gift.swiped ? { display: "none" } : null}
                      >
                        <div className="flip-card">
                          <div
                            className="flip-card-inner"
                            style={
                              isFlipped
                                ? { transform: "rotateY(180deg)" }
                                : null
                            }
                            elevation={5}
                          >
                            <div class="flip-card-front">
                              <div className="image-wrapper">
                                <Paper
                                  className={classes.imageContainer}
                                  elevation={2}
                                >
                                  <img src={gift.imageSrc} className="cover" />
                                </Paper>
                              </div>
                              <div className="number-wrapper">
                                <Typography className={classes.giftNumber}>
                                  {`GIFT ${gift.preference}`}
                                </Typography>
                              </div>
                              <div className="title-wrapper">
                                <Typography className={classes.giftTitle}>
                                  {gift.title.toUpperCase()}
                                </Typography>
                              </div>
                              <div className="button-wrapper">
                                <Button
                                  style={{ backfaceVisibility: "hidden" }}
                                  className={classes.learnButton}
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => {
                                    setIsFlipped(!isFlipped);
                                  }}
                                >
                                  Learn More
                                </Button>
                              </div>
                            </div>
                            <div class="flip-card-back">
                              <div className="description-container">
                                <Typography variant="body1">
                                  <span className="description-span">
                                    Description:
                                  </span>{" "}
                                  {gift.description}
                                </Typography>
                                <Typography variant="body1">
                                  <span className="description-span">
                                    Note:
                                  </span>{" "}
                                  {gift.note}
                                </Typography>
                                <Button
                                  style={{ backfaceVisibility: "hidden" }}
                                  className={classes.backButton}
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => {
                                    setIsFlipped(!isFlipped);
                                  }}
                                  disableElevation
                                >
                                  <ClearIcon />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TinderCard>
                    );
                  })
                : null}
            </div>
          ) : (
            <div className={classes.charityGiftContainer}>
              <div className="flip-card">
                <div
                  className="flip-card-inner"
                  style={
                    isCharityFlipped ? { transform: "rotateY(180deg)" } : null
                  }
                  onClick={() => {
                    setIsCharityFlipped(!isCharityFlipped);
                  }}
                  elevation={5}
                >
                  <div class="flip-card-front">
                    <div className="image-wrapper">
                      <Paper className={classes.imageContainer} elevation={2}>
                        <img src={parley} className="cover" />
                      </Paper>
                    </div>
                    <div className="number-wrapper">
                      <Typography className={classes.giftNumber}>
                        IT'S TIME TO TAKE A STEP FORWARD!
                      </Typography>
                    </div>
                    <div className="title-wrapper">
                      <Typography className={classes.giftTitle}>
                        ADIDAS X PARLEY ULTRABOOST DNA
                      </Typography>
                    </div>
                    <div className="button-wrapper">
                      <Button
                        style={{ backfaceVisibility: "hidden" }}
                        className={classes.learnButton}
                        variant="contained"
                        color="secondary"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div class="flip-card-back">
                    <div className="description-container">
                      <Typography variant="body1">
                        <span className="description-span">Charity:</span> Zero
                        Waste SG
                      </Typography>
                      <Typography variant="body1">
                        <span className="description-span">
                          About this item:{" "}
                        </span>
                        In 2015, adidas brought a prototype shoe to the United
                        Nations to show what could be achieved in the fight to
                        end plastic waste. These men's running shoes are made
                        with a seamless knit upper that's made with yarn spun
                        from plastic reclaimed from beaches and coastal
                        communities. Responsive cushioning returns energy to
                        your stride.
                      </Typography>

                      <Typography variant="body1">
                        <span className="description-span">Note: </span> You are
                        18! Be compassionate! ~ John ;)
                      </Typography>
                      <Button
                        style={{ backfaceVisibility: "hidden" }}
                        className={classes.backButton}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setIsCharityFlipped(!isCharityFlipped);
                        }}
                        disableElevation
                      >
                        <ClearIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isSMWidth ? (
            <div className={classes.charityGiftContainer}>
              <div className="flip-card">
                <div
                  className="flip-card-inner"
                  style={
                    isCharityFlipped ? { transform: "rotateY(180deg)" } : null
                  }
                  onClick={() => {
                    setIsCharityFlipped(!isCharityFlipped);
                  }}
                  elevation={5}
                >
                  <div class="flip-card-front">
                    <div className="image-wrapper">
                      <Paper className={classes.imageContainer} elevation={2}>
                        <img src={parley} className="cover" />
                      </Paper>
                    </div>
                    <div className="number-wrapper">
                      <Typography className={classes.giftNumber}>
                        IT'S TIME TO TAKE A STEP FORWARD!
                      </Typography>
                    </div>
                    <div className="title-wrapper">
                      <Typography className={classes.giftTitle}>
                        ADIDAS X PARLEY ULTRABOOST DNA
                      </Typography>
                    </div>
                    <div className="button-wrapper">
                      <Button
                        style={{ backfaceVisibility: "hidden" }}
                        className={classes.learnButton}
                        variant="contained"
                        color="secondary"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div class="flip-card-back">
                    <div className="description-container">
                      <Typography variant="body1">
                        <span className="description-span">Charity:</span> Zero
                        Waste SG
                      </Typography>
                      <Typography variant="body1">
                        <span className="description-span">
                          About this item:{" "}
                        </span>
                        In 2015, adidas brought a prototype shoe to the United
                        Nations to show what could be achieved in the fight to
                        end plastic waste. These men's running shoes are made
                        with a seamless knit upper that's made with yarn spun
                        from plastic reclaimed from beaches and coastal
                        communities. Responsive cushioning returns energy to
                        your stride.
                      </Typography>

                      <Typography variant="body1">
                        <span className="description-span">Note: </span> You are
                        18! Be compassionate! ~ John ;)
                      </Typography>
                      <Button
                        style={{ backfaceVisibility: "hidden" }}
                        className={classes.backButton}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setIsCharityFlipped(!isCharityFlipped);
                        }}
                        disableElevation
                      >
                        <ClearIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
              className={classes.tabButton}
            >
              <Button
                variant={isCreatorView ? "contained" : "outlined"}
                onClick={() => {
                  setIsCreatorView(true);
                }}
              >
                FRIENDS
              </Button>
              <Button
                variant={!isCreatorView ? "contained" : "outlined"}
                onClick={() => {
                  setIsCreatorView(false);
                }}
              >
                CHARITY
              </Button>
            </ButtonGroup>
          )}
        </div>

        <div className={classes.interfaceContainer}>
          <div className={classes.buttonContainer}>
            <OptionButtons
              swipe={swipe}
              open={openChosenDialog}
              setOpen={setOpenChosenDialog}
              handleChosenClick={chooseButtonClicked}
              chosenGift={gifts[gifts.length - 1]}
            />
            <Button
              className={classes.earthButton}
              variant="outlined"
              startIcon={<PublicIcon />}
              onClick={() => {
                chooseCharityButtonClicked(dummySocialGift);
              }}
            >
              CHOOSE A CHARITABLE GIFT!
            </Button>
            <AcceptModal
              open={openCharityDialog}
              setOpen={setOpenCharityDialog}
              chosenGift={dummySocialGift}
            />
            {/* <Button
              onClick={async () => {
                await window.location.reload();
                setValue(2);
              }}
              style={{ position: "absolute", bottom: "20px", right: "20px" }}
            >
              {`RESET (MUST BE MADE IF YOU WANT TO PREVIEW AGAIN)`}
            </Button> */}
          </div>
          <div className={classes.termsContainer}>
            <AlertDialogSlide className={classes.termsButton} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Preview;
