require('dotenv').load();
const express = require('express')
const router = express.Router()
const stripe = require("stripe")(process.env.SECRET_KEY);

router.get('/balance', (req, res) => {
    stripe.balance.retrieve()
        .then(balance => console.log(balance))
})

module.exports = router;