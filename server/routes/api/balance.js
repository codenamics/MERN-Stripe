require('dotenv').load();
const express = require('express')
const router = express.Router()
const balanceController = require('../../controllers/balanceController')

router.get('/balance', balanceController.getBalance)

module.exports = router;