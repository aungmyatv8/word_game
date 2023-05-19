const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    googleId: {
        type: Text,
        required: true,
    },
    level: {
        type: String,
        enum: ['bronze', 'sliver', 'gold'],
        default: "bronze"
    },
    win: {
        type: Number,
        default: 0,
    },
    loss: {
        type: Number,
        default: 0,
    },
    matches: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("player", playerSchema)