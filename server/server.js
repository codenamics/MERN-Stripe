require('dotenv').load();
const app = require("express")();
const bodyParser = require('body-parser')
const passport = require('passport')
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
// app.use('/customers', customers)


const port = process.env.PORT
app.listen(4000, () => console.log("Listening on port 4000"));