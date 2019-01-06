const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChargeSchema = new Schema({
    amount: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Charge = mongoose.model('charge', ChargeSchema)