const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChargeSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
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
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    post_code: {
        type: String
    },
    country: {
        type: String
    },
})

module.exports = Charge = mongoose.model('charge', ChargeSchema)