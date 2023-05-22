const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
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