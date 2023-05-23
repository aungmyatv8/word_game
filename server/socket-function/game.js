const {get} = require('../socket');
const UserModel = require('../models/player');
const FindMatchModel = require('../models/find-match');
const { v4: uuidv4 } = require('uuid');

const Io = get().of('/match');


Io.on("connection", (socket) => {
    console.log("connection started")
    // socket.join("waiting room", console.log("join waiting room"))
    socket.on("disconnect", () => {
        // console.log("disconnecting");
        socket.conn.close();
      });

      // socket.on("join waiting room", (data) => {
      //   console.log("join waiting room", data)
      //   socket.join("waiting room", data)
    
      // })

      // socket.on("join_room", (data) => {
      //   socket.join(data);
      // });

      socket.on("find-match", async (data, callback) => {
        // console.log("user", data)
        socket.join("waiting room")
        
        try {
          const alreadyInFindMatch = await FindMatchModel.find({playerId: data._id});

          if(!alreadyInFindMatch.length) {
            await FindMatchModel.create({playerId: data._id, level: data.level})
          }
          

          const findOtherPlayers = await FindMatchModel.find({
            playerId: {
              $ne: data._id
            },
            level: data.level
          })

          if(findOtherPlayers.length) {
            const index = Math.floor(Math.random() * findOtherPlayers.length)
            var randomChoice = findOtherPlayers[index]
            var room = uuidv4()
            // console.log(data._id, randomChoice.playerId)
            // socket.emit("found match", {players: [data._id, randomChoice.playerId], room})
            // console.log(`s ${randomChoice.playerId.toString()} found match`)
            // socket.emit(`${randomChoice.playerId.toString()} found match`, room)
            // socket.emit(`found match`, room)

            socket.broadcast.to("waiting room").emit("found match", {room, players: [randomChoice.playerId.toString(), data._id]})
            return callback({
              status: "ok",
              data: {room, players: [randomChoice.playerId.toString(), data._id]}
            })
          
          }

          // socket.emit("found match", findOtherPlayers)
          

          // console.log("FindOtherPlayers", findOtherPlayers)
          // console.log("add", addToFindMatch)
          // return callback({
          //   status: "ok",
          //   data: addToFindMatch,
          // });
        }catch(e){
          console.error(e)
          // return callback({
          //   stauts: "fail",
          //   data: e
          // })
        }
        
      })
      

      socket.on("cancel-find-match", async(data, callback) => {
        // console.log("data", data)
        socket.leave("waiting room", (err) => {
          if(err) {
            console.log("levave error", err)
          }else{
            console.log("leave room")
          }
        })
        try {
           await FindMatchModel.findOneAndDelete({
            playerId: data
          })
          // console.log(cancelFindMatch)
          
          // if(cancelFindMatch) {}
          return callback({
            status: "ok"
          })
        }catch(e) {
          return callback({
            stauts: "fail",
            data: e
          })
        }
      })


    // find two player based on level
    // emit both player with match id
    // socket.on("find-match")
    
    
    // socket.on(`r`)

})

module.exports = Io;