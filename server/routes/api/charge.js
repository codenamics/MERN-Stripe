require("dotenv").load();
const express = require("express");
const router = express.Router();
const chargeController = require('../../controllers/chargeController')


router.post("/pay", chargeController.createCharge);
router.get("/all", chargeController.getAllCharges);

module.exports = router;