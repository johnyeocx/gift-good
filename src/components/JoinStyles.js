import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flexDirection: "column",
  },
  paper: {
    width: "300px",
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    position: "relative",
    top: "25px",
    height: "100%",
  },
  textFieldContainer: {
    maxWidth: "100%",
    marginBottom: "15px",
    // height: "20%",
  },
  title: {
    // color: "#33ECFF",
    top: "30%",
    fontSize: 22,
    textDecoration: "underline",
  },
  submitButton: {
    textDecoration: "none",
    // background: "#33ECFF",
  },
}));
