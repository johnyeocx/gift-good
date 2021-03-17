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
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 10,
  },

  giftContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "75%",
    backgroundColor: "#474747",
  },
  urlContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "8px",
    height: "60%",
    width: "90%",
    borderWidth: "1px",
    borderColor: "#aaa",
    borderRadius: "3px",
    borderStyle: "solid",
    // marginBottom: "10px",
  },
  explanationContainer: {
    backgroundColor: "#242424",
    height: "25%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "10px",
  },
  explanationHeader: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "underline",
    height: "5%",
  },
  explanation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    color: "white",
    height: "50%",
    fontSize: "15px",
    textAlign: "center",
  },
  explanationTextContainer: {
    height: "50%",
  },
  charityContainer: {
    height: "15%",
    display: "flex",
    flexDirection: "column",
  },
  charityButton: {
    padding: 0,
    color: "#FF6F6F",
    marginBottom: "10px",
  },
  charityInput: {
    fontSize: "5px",
  },
  buttonContainer: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
  },
  chooseGiftContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    width: "100%",

    padding: "0 10px",
  },
  giftTitle: {
    color: "#fff",
    fontWeight: "500",
    width: "80%",
  },
}));
