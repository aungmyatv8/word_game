const {get} = require('../socket');

const Io = get().of('/match');


Io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        // console.log("disconnecting");
        socket.conn.close();
      });


    // find two player based on level
    // emit both player with match id
    socket.on("find-match")
    
    
    socket.on(`r`)

})

module.exports = Io;