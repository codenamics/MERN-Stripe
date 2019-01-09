require('dotenv').load();
const stripe = require("stripe")(process.env.SECRET_KEY);

exports.getBalance = (req, res) => {
    stripe.balance.retrieve()
        .then(balance => console.log(balance))
}