import React, { useEffect, useState } from "react";

import {
  Typography,
  Tab,
  Tabs,
  Box,
  Divider,
  List,
  ListItem,
  Button,
  Drawer,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";

import queryString from "query-string";
import { io } from "socket.io-client";
import useStyles from "./RoomStyles";
import { useTheme } from "@material-ui/core/styles";

import Chat from "./Room/Chat/Chat";
import Gift from "./Room/Gift/Gift";
import Preview from "./Room/Preview/Preview";
import SwipeableTemporaryDrawer from "./SwipeableDrawer";

let socket;
const tabTitle = ["CHAT", "CUSTOMIZE", "PREVIEW"];

const Room = ({ location }) => {
  const ENDPOINT = "https://gift-good.herokuapp.com/";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [openGiftDialogOne, setOpenGiftDialogOne] = useState(false);
  const [openGiftDialogTwo, setOpenGiftDialogTwo] = useState(false);
  const [openGiftDialogThree, setOpenGiftDialogThree] = useState(false);
  const [openGiftDialogFour, setOpenGiftDialogFour] = useState(false);
  const [openGiftDialogFive, setOpenGiftDialogFive] = useState(false);
  const [information, setInformation] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  });
  const [fundAmount, setFundAmount] = useState(100);
  const [previewData, setPreviewData] = useState([]);
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = useState(0);
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

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        window.location.href = "https://gift-good.netlify.app/";
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("information", (information) => {
      console.log("received");
      setInformation(information);
    });
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} className={classes.box}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sendMessage = (message) => {
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const handleGiftSelectButton = (giftNumber, gift) => {
    const tmp = information;
    for (let i = 1; i < 6; i++) {
      console.log("test");
      if (information[i].title) {
        if (information[i].title === gift.title && i !== giftNumber) {
          alert("already chose this gift");
          return;
        }
      }
    }
    tmp[giftNumber] = gift;
    setInformation(tmp);

    setOpenGiftDialogOne(false);
    setOpenGiftDialogTwo(false);
    setOpenGiftDialogThree(false);
    setOpenGiftDialogFour(false);
    setOpenGiftDialogFive(false);

    socket.emit("sendInformation", information, (error) => {
      console.log(error);
      alert(error);
      window.location.href = "https://gift-good.netlify.app/";
    });
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={classes.root}>
      {!isXSWidth ? (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.drawerHeader}>
            <Typography className={classes.title}>
              IN COLLABORATION WITH <br />
              <span
                style={{
                  textDecoration: "underline",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                GIFT-IT-FORWARD
              </span>
            </Typography>
          </div>
          <Divider />
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                className={classes.tabContainer}
              >
                <Tab label="Chat" />
                <Tab label="Customize" className={classes.tab} />
                <Tab label="Preview" className={classes.tab} />
              </Tabs>
            </ListItem>
          </List>
          <Divider />
          <List className={classes.detailsContainer}>
            <Typography
              style={{ fontWeight: "bold", fontSize: "17px" }}
              color="secondary"
            >
              Room ID:{" "}
            </Typography>
            <Typography style={{ fontWeight: "300", fontSize: "17px" }}>
              {room}
            </Typography>
            <br />
            <Typography
              style={{ fontWeight: "bold", fontSize: "17px" }}
              color="secondary"
            >
              Members:{" "}
            </Typography>
            {users
              ? users.map((user, index) => {
                  return (
                    <Typography style={{ fontWeight: "300", fontSize: "17px" }}>
                      {`${index + 1}. ${user.name}`}
                    </Typography>
                  );
                })
              : null}
            <br />
            <Typography
              style={{ fontWeight: "bold", fontSize: "17px" }}
              color="secondary"
            >
              Fund Amount:{" "}
            </Typography>
            <Typography>{currencyFormatter.format(fundAmount)}</Typography>
          </List>
          <Divider />
          <Button style={{ marginTop: "10px" }} startIcon={<ShareIcon />}>
            SHARE THIS ROOM!
          </Button>
        </Drawer>
      ) : (
        <div className={classes.appBar}>
          <SwipeableTemporaryDrawer
            users={users}
            room={room}
            handleChange={handleChange}
            value={value}
            currencyFormatter={currencyFormatter}
            fundAmount={fundAmount}
          />
          <Typography
            variant="h6"
            style={{
              fontSize: "18px",
              marginLeft: "10px",
            }}
            color="secondary"
          >
            {tabTitle[value]}
          </Typography>
        </div>
      )}

      <TabPanel
        value={value}
        index={0}
        className={classes.tabPanel}
        style={isXSWidth ? { width: "100%" } : {}}
      >
        <Chat
          name={name}
          users={users}
          room={room}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        className={classes.tabPanel}
        style={isXSWidth ? { width: "100%" } : {}}
      >
        <Gift
          name={name}
          users={users}
          room={room}
          information={information}
          setInformation={setInformation}
          setValue={setValue}
          previewData={previewData}
          setPreviewData={setPreviewData}
          handleGiftSelectButton={handleGiftSelectButton}
          openGiftDialogOne={openGiftDialogOne}
          setOpenGiftDialogOne={setOpenGiftDialogOne}
          openGiftDialogTwo={openGiftDialogTwo}
          setOpenGiftDialogTwo={setOpenGiftDialogTwo}
          openGiftDialogThree={openGiftDialogThree}
          setOpenGiftDialogThree={setOpenGiftDialogThree}
          openGiftDialogFour={openGiftDialogFour}
          setOpenGiftDialogFour={setOpenGiftDialogFour}
          Four
          openGiftDialogFive={openGiftDialogFive}
          setOpenGiftDialogFive={setOpenGiftDialogFive}
        />
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        className={classes.tabPanel}
        style={isXSWidth ? { width: "100%" } : {}}
      >
        <Preview
          information={information}
          name={name}
          room={room}
          users={users}
          previewData={previewData}
          setPreviewData={setPreviewData}
          setValue={setValue}
        />
      </TabPanel>
    </div>
  );
};

export default Room;
