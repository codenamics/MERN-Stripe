require("dotenv").load();
const express = require("express");
const router = express.Router();
const chargeController = require('../../controllers/chargeController')
const passport = require('passport')

router.post("/pay", chargeController.createCharge);
router.get('/all', passport.authenticate('jwt', {
    session: false
}), chargeController.getAllCharges)

module.exports = router;