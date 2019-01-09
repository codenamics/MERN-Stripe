require('dotenv').load();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/User')

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


//  /users/register
//  Register user
exports.registerUser = (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const {
        email,
        password,
        admin
    } = req.body
    User.findOne({
            email
        })
        .then((user) => {
            if (user) {
                errors.email = "Email already exists"
                return res.status(400).json(
                    errors
                )
            } else {
                const newUser = new User({
                    email,
                    password,
                    admin
                })
                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser
                            .save()
                            .then(user => {
                                res.json(user)
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
}

//  /users/login
//  Login user / Return Token
exports.loginUser = (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const {
        email,
        password
    } = req.body

    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: "User not found"
                })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const {
                            id,
                            admin
                        } = user
                        const payload = {
                            id,
                            admin
                        }
                        jwt.sign(payload, process.env.SECRET_OR_KEY, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        return res.status(400).json({
                            password: "Invalid Password or Email"
                        })
                    }
                })
        })
}

//  /users/current
//  Login user / Return Token
exports.getCurrentUser = passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        id,
        admin,
        email
    } = req.user
    res.json({
        id,
        email,
        admin
    })
}