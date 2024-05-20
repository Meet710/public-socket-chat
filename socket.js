const socketIo = require("socket.io");
const http = require("http");
const socketPort = 3001;
const socketServer = http.createServer();
const { IMAGE_DATA } = require("./utils/Imageobj");
const { fileEmitter } = require("./middleware/multer");
const fs = require('fs');
const path = require('path');

const io = socketIo(socketServer);
io.on("connection", (socket) => {
  socket.on("joinRoom", (roomName, username) => {
    socket.join(roomName);

    io.to(roomName).emit("joinRoom", `${username} joined the ${roomName} `);
    console.log(`${username} joined the ${roomName} `);
  });
  socket.on("sendMessage", (chatObject) => {
    try {
      if (chatObject.image) {
        // Listen for the "fileUploaded" event
         fileEmitter.once("fileUploaded", (filename) => {
           chatObject.image = filename
           console.log(filename)
         io.to(chatObject.room).emit("sendMessage", chatObject) 
        });
    }
       else {
        console.log("No image detected. Sending message:", chatObject);
        io.to(chatObject.room).emit("sendMessage", chatObject);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", function () {
    //if the user refreshes the page, he is still in the connected users list
    const socketid = socket.id;
    if (socketid != null) {
      socket.join(socketid);
    }
    console.log("user disconnected", socket.id);
  });
});

socketServer.listen(socketPort, () => {
  console.log(`Socket.io server is running on http://localhost:${socketPort}`);
});
