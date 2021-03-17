import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  chatContainer: {
    height: "100%",
  },
  sidebar: {
    background: "#FF7D7D",
    padding: "10px",
    alignItems: "center",
  },
  cover: {
    height: "100%",
    width: "100%",
    // objectFit: "cover",
  },
  giftDisplayContainer: {
    backgroundColor: "#343434",
    height: "70%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px",
    justifyContent: "space-around",

    overflow: "hidden",
  },
  creatorGiftContainer: {
    [theme.breakpoints.up("xs")]: {
      position: "relative",
      height: "400px",
      width: "320px",
      backgroundColor: "transparent",
      transition: "transform 1s",
      transformStyle: "preserve-3d",
      display: "flex",
      overflow: "hidden",
      flexWrap: "wrap",
    },
  },

  charityGiftContainer: {
    position: "relative",
    height: "400px",
    width: "320px",
    backgroundColor: "transparent",
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    flexWrap: "wrap",
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  confirmImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "250px",
    width: "100%",
  },
  confirmImagePaper: {
    backgroundColor: "white",
    borderRadius: "15px",
    height: "100%",
    width: "60%",
  },
  learnButton: {
    backgroundColor: "black",
  },
  backButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: " white",
    backgroundColor: "black",
  },

  giftNumber: {
    fontWeight: "700",
    textDecoration: "underline",
    fontSize: "15px",
    lineHeight: "1",
  },
  giftTitle: {
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "1",
  },

  interfaceContainer: {
    backgroundColor: "#222",
    height: "30%",
    padding: "20px",
    color: "#eee",
    display: "flex",
    flexDirection: "column",
  },
  termsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  earthButton: {
    background: "linear-gradient(45deg, #00CF55 30%, #67A8FF 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 0 rgba(103, 168, 255, .3)",
  },

  termsButton: {
    display: "flex",
  },
  tabButton: {
    position: "absolute",
    top: 10,
    right: 10,

    // backgroundColor: "red",
  },
}));
