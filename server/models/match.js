const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
    players: {
        type: Array,
        required: true
    },
    level: {
        type: String,
        enum: ['bronze', 'silver', 'gold'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now   
    }
})

module.exports = mongoose.model('match', matchSchema)