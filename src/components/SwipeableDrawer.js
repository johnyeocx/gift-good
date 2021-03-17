import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Typography,
  Tab,
  Tabs,
  Divider,
  List,
  ListItem,
} from "@material-ui/core";

import useStyles from "./RoomStyles";

export default function SwipeableTemporaryDrawer({
  users,
  room,
  handleChange,
  value,
  currencyFormatter,
  fundAmount,
}) {
  const classes = useStyles();

  const [isClicked, setIsClicked] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsClicked(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.swipeableDrawerRoot}
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
    </div>
  );

  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <IconButton onClick={toggleDrawer(true)} className={classes.menuButton}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isClicked}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{ paper: classes.drawerPaper }}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
