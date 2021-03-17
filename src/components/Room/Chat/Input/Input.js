import React, { useState } from "react";

import "./Input.css";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Input = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  console.log(message);
  const useStyles = makeStyles((theme) => ({
    input: {
      border: "none",
      borderRadius: 0,
      width: "80%",
      fontSize: "1em",
      height: "100%",
      color: "black",
      padding: "0px",
    },
    muiInput: {
      height: "100%",
    },
    multilineColor: {
      color: "red",
    },
    button: {
      backgroundColor: "#444",
      borderRadius: 0,
      display: "inline-block",
      border: "none",
      width: "20%",
      height: "100%",
    },
  }));
  const classes = useStyles();
  const keyPress = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      sendMessage(message);
      // put the login here
    }
  };

  return (
    <form className="form">
      <TextField
        className={classes.input}
        classes={{
          input: classes.muiInput,
        }}
        variant="outlined"
        color="secondary"
        placeholder="Type your message..."
        InputProps={{
          className: classes.multilineColor,
        }}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={keyPress}
      />
      <Button
        color="secondary"
        className={classes.button}
        onClick={() => {
          sendMessage(message);
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default Input;
