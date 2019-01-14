require('dotenv').load();
const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const passport = require('passport')
//  /users/register
//  Register user
router.post('/register', userController.registerUser)

//  /users/login
//  Login user / Return Token
router.post('/login', userController.loginUser)

//  /users/current
//  Login user / Return Token
router.get('/current', passport.authenticate('jwt', {
    session: false
}), userController.getCurrentUser)

module.exports = router;