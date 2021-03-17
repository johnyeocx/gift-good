import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import useStyles from "./JoinStyles";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const classes = useStyles();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          width: "100vw",
          height: "20vh",
          top: "8px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            // color: "white",
            fontSize: "30px",
            letterSpacing: "10px",
            textAlign: "center",
          }}
          color="secondary"
        >
          GIFT GOOD
        </Typography>
        <Typography
          style={{
            fontWeight: "400",
            fontSize: "15px",
            color: "white",
            textAlign: "center",
          }}
        >
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
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            alignItems="center"
            alignContent="center"
            spacing={1}
            justify="space=between"
            className={classes.gridContainer}
          >
            <Grid
              item
              xs={0}
              alignSelf="stretch"
              className={classes.textFieldContainer}
            >
              <Typography
                variant="h6"
                color="secondary"
                className={classes.title}
              >
                JOIN ROOM
              </Typography>
            </Grid>

            <Grid
              item
              xs={1}
              alignSelf="stretch"
              className={classes.textFieldContainer}
            >
              <TextField
                color="secondary"
                variant="outlined"
                id="outlined-basic"
                label="Name"
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              >
                Hello
              </TextField>
            </Grid>
            {/* Room ID */}
            <Grid
              item
              xs={1}
              alignSelf="stretch"
              className={classes.textFieldContainer}
            >
              <TextField
                color="secondary"
                variant="outlined"
                id="outlined-basic"
                label="Room ID"
                onChange={(e) => setRoom(e.target.value)}
                autoComplete="off"
              >
                Hello
              </TextField>
            </Grid>
            <Grid
              item
              xs={1}
              alignSelf="stretch"
              className={classes.textFieldContainer}
            >
              <TextField
                color="secondary"
                variant="outlined"
                id="outlined-basic"
                label="Contribute"
                autoComplete="off"
              >
                Fund Amount
              </TextField>
            </Grid>
            <Grid
              item
              xs={1}
              alignSelf="stretch"
              className={classes.textFieldContainer}
            >
              <Link
                className={classes.submitButton}
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/room?name=${name}&room=${room}`}
              >
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  disableElevation
                >
                  JOIN
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default Join;
