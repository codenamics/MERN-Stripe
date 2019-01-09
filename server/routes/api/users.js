require('dotenv').load();
const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')

//  /users/register
//  Register user
router.post('/register', userController.registerUser)

//  /users/login
//  Login user / Return Token
router.post('/login', userController.loginUser)

//  /users/current
//  Login user / Return Token
router.get('/current', userController.getCurrentUser)

module.exports = router;