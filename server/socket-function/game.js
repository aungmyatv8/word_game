const {get} = require('../socket');
const UserModel = require('../models/player');
const FindMatchModel = require('../models/find-match');
const PlayerModel = require('../models/player')
const { v4: uuidv4 } = require('uuid');

const Io = get().of('/match');

const decideLevel = (match) => {
  switch(match) {
    case match <= 10:
      return "bronze";
    case match <= 20:
      return "silver"
    case match <= 30:
      return "gold"    
    default: 
      return "gold"
  }
}


Io.on("connection", (socket) => {
    // console.log("connection started")
    // socket.join("waiting room", console.log("join waiting room"))
    socket.on("disconnect", () => {
        // console.log("disconnecting");
        socket.leave("waiting room")
        socket.conn.close();
      });

      socket.on("victory", async(id, callback) => {
        // winner id, loser id,
        try {
          const winner = await PlayerModel.findById(id);
          

          const winnerLevel = decideLevel(winner.win + 1)
          

          const updateWinner = await PlayerModel.findByIdAndUpdate(id, {
            matches: winner.matches + 1,
            win: winner.win + 1,
            level: winnerLevel
          })
         
          return callback({
            stauts: "ok"
          })
        
        }catch(e) {

        }
      })

      socket.on("eliminate", async(id, callback) => {
        try {
          const loser = await PlayerModel.findById(id);
          const loserLevel = decideLevel(loser.win)

          const updateLoser = await PlayerModel.findByIdAndUpdate(id, {
            matches: loser.matches + 1,
            loss: loser.loss + 1,
            level: loserLevel
          })

          console.log("loser", loserLevel, updateLoser)

          return callback({
            status: "ok"
          })

        }catch(e) {

        }
      })



      socket.on("join game room", async (data, callback) => {
        // data includes ids, room id
        socket.leave("waiting room")
        console.log("room", data)
        socket.join(data)

      })

      socket.on("send", async(data) => {
        console.log("recie", {
          playerId: data.user._id,
          name: data.user.name,
          picture: data.user.picture,
          lastWord: data.lastWord,
          word: data.word,
          room: data.room
        })
        socket.broadcast.to(data.room).emit("receive", {
          playerId: data.user._id,
          name: data.user.name,
          picture: data.user.picture,
          lastWord: data.lastWord,
          word: data.word
        })
      })


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

            await FindMatchModel.deleteMany({
              playerId: {$in: [data._id, randomChoice.playerId]}
            })

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
        socket.leave("waiting room")
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