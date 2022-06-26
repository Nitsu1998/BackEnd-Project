const express = require("express");
const { Server: IOServer } = require("socket.io");
const app = express();
const port = 8080;
const productsArray = [
  {
    id: 1,
    title: "Elden Ring",
    price: 50,
    img: "https://static.bandainamcoent.eu/high/elden-ring/elden-ring/00-page-setup/elden-ring-new-header-mobile.jpg",
  },
  {
    id: 2,
    title: "Death Stranding",
    price: 35,
    img: "https://cdn.akamai.steamstatic.com/steam/apps/1850570/header.jpg?t=1649438096",
  },
  {
    id: 3,
    title: "Resident Evil Village",
    price: 20,
    img: "https://www.residentevil.com/village/assets/images/common/share.png",
  },
  {
    id: 4,
    title: "Dead By Daylight",
    price: "51",
    img: "https://i.blogs.es/49d0b4/270520-dead-daylight-preview/1366_2000.jpeg",
  },
];
const messagesArray = [];

const expressServer = app.listen(port, (error) => {
  if (!error) {
    console.log(`Server started on port ${port}`);
  } else {
    console.log(`Error: ${error}`);
  }
});

const io = new IOServer(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit("server:allProducts", productsArray);
  socket.emit("server:allMessages", messagesArray);

  socket.on("client:product", (product) => {
    productsArray.push(product);
    io.emit("server:allProducts", productsArray);
  });

  socket.on("client:message", (messageInfo) => {
    messagesArray.push(messageInfo);
    io.emit("server:allMessages", messagesArray);
  });
});
