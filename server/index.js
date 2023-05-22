const express = require('express')
const app = express();
const socket = require('./socket')
const PORT = process.env.PORT || 4000;
const server = require("http").createServer(app);
const mongoose = require('mongoose')
const cors = require('cors')
const Route = require('./routes/index')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

socket.init(server);

require('./socket-function/game')

app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

mongoose.connect("mongodb+srv://aungmyintmyat:veomas123@cluster0.18eromm.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },)
.then(_ => console.log("mongodb connected"))
.catch(err => console.error(err))

// app.get("/test", (_, res) => res.json({message: "hello"}))

// io.on("connection", (socket) => {
//     console.log("main connnection");
//   });
app.use("/", Route)


server.listen(PORT, () => {
    console.log("Server started");
  });