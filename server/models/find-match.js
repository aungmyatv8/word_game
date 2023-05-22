const mongoose = require('mongoose')

const findMatchSchmea = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player"
    },
    level: {
        type: String,
        enum: ['bronze', 'sliver', 'gold'],
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true})

findMatchSchmea.index({createdAt: 1}, {expireAfterSeconds: 1000})

module.exports = mongoose.model("find-match", findMatchSchmea )