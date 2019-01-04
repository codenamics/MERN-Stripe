const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

//  /users/register
//  Register user
router.post('/register', (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    email: "Email already exists"
                })
            } else {
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    admin: req.body.admin
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
})



module.exports = router;