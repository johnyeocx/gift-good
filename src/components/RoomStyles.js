import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  appBar: {
    height: "48px",
    backgroundColor: "#111",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  swipeableDrawerRoot: {
    flexGrow: 1,

    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  tabPanel: {
    height: "100%",
    width: `calc(100% - ${drawerWidth}px)`,
  },
  box: {
    height: "100%",
    width: "100%",
    padding: 0,
  },
  drawer: {
    width: drawerWidth,
    // flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  drawerHeader: {
    padding: "10px 20px",
    textAlign: "center",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    height: "90px",
  },
  tabContainer: {
    width: "100%",
    textAlign: "start",
  },
  title: {
    fontWeight: "400",
    fontSize: "15px",
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#000C30",
  },
  detailsContainer: {
    padding: "20px 30px",
  },
}));
