const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const router = require("./router");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello to Gift Good API");
});
dotenv.config();
const server = http.createServer(app);
const io = socketio(server, { cors: "*" });
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    }
    // console.log("error");

    callback();
  });

  socket.on("sendInformation", (information, callback) => {
    console.log(information);
    const user = getUser(socket.id);
    console.log(user);
    if (user) {
      socket.broadcast.to(user.room).emit("information", information);
    } else
      callback(
        "Username was taken. Please re-enter room with a different username"
      );
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      console.log(`removing ${user.name}`);
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
