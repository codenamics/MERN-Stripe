require('dotenv').load();
const app = require("express")();
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const passport = require('passport')

const stripe = require("stripe")(process.env.SECRET_KEY);
const mongoose = require('mongoose')

//Routes
const users = require('./routes/api/users')
const charge = require('./routes/api/charge')
const balance = require('./routes/api/balance')
const customers = require('./routes/api/customers')

//MongoDB Atlas connection
mongoose.connect(process.env.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

//Passport
app.use(passport.initialize())
require('./config/passport')(passport)

//Use routes
app.use('/users', users)
app.use('/charge', charge)
app.use('/balance', balance)
app.use('/customers', customers)


// app.post("/charge", (req, res) => {
//     const {
//         price,
//         token,
//         email
//     } = req.body

//     stripe.customers.create({
//             email,
//             source: token
//         })
//         .then(customer => stripe.charges.create({
//             amount: price,
//             description: email,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: email
//         }))
//         .then(status => {
//             res.json({
//                 status
//             })
//         }).catch(err => res.send(err))

//     if (email !== '' || email !== undefined) {

//         const output = `
//       <h1>You just purchase plan ${price}</h1>
//       `;
//         let transporter = nodemailer.createTransport({
//             host: process.env.SMTP,
//             port: process.SMTP_PORT,
//             secure: true,
//             auth: {
//                 user: process.env.AUTH_USER,
//                 pass: process.env.AUTH_PASS
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });

//         let mailOptions = {
//             from: '"NewHorizon"',
//             to: email,
//             subject: `New stack for ${price}`,
//             html: output
//         };
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             res.status(200).json({
//                 msg: "Message has been sent"
//             });
//         });
//     }
// });


// app.get('/customers', (req, res) => {
//     stripe.customers.list({
//         limit: 3
//     }, ).then(customers => console.log(customers))
// })


// app.get('/charges', (req, res) => {
//     stripe.charges.list({
//         limit: 3
//     }).then(charges => {
//         console.log(charges)
//     })
// })


// app.get('/balance', (req, res) => {
//     stripe.balance.retrieve()
//         .then(balance => console.log(balance))
// })



const port = process.env.PORT
app.listen(4000, () => console.log("Listening on port 4000"));