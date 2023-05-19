const mongoose = require('mongoose')

const findMatchSchmea = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player"
    },
    startedTime: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 300000,
    }
})

module.exports = mongoose.model("find-match", findMatchSchmea )