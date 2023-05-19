const socket = require("socket.io");

let io;
var whitelist = [
  "http://localhost:3000",
];

module.exports = {
  init: (server) => {
    io = socket(server, {
      cookie: true,
      credentials: true,
      transports: ["websocket", "polling"],
      allowEIO3: true,
      cors: {
        origin: whitelist,
        // origin: "*",
        // methods: ["GET", "POST"],

        credentials: true,
      },
    });
    // io = require("socket.io");

    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  },
};
