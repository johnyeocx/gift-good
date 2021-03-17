import React, { useState, useEffect } from "react";
import { Typography, Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Messages from "./Messages";
import Input from "./Input/Input";

function Chat({
  name,
  room,
  users,
  messages,
  message,
  setMessage,
  setMessages,
  sendMessage,
}) {
  const useStyles = makeStyles((theme) => ({
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
    chatUI: {
      background: "#FFE3E3",
    },

    messageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#1A1A1D",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#FFFFFF",
      borderRadius: "8px",
      height: "90%",
      width: "90%",
    },
  }));

  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      className={classes.chatContainer}
      alignItems="stretch"
    >
      {/* Chat Interface */}
      <Grid item xs={12} className={classes.chatUI}>
        <div className={classes.messageContainer}>
          <div className={classes.container}>
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
          {/* <TextContainer users={users} /> */}
        </div>
      </Grid>
    </Grid>
  );
}

export default Chat;
