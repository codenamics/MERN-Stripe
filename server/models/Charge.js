const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChargeSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    amount: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Charge = mongoose.model('charge', ChargeSchema)