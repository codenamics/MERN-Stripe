require('dotenv').load();
const app = require("express")();
const stripe = require("stripe")(process.env.SECRET_KEY);
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.post("/charge", (req, res) => {
    const {
        price,
        token,
        email
    } = req.body
    stripe.charges.create({
        amount: price,
        currency: "usd",
        source: token
    }).then(
        status => {
            res.json({
                status
            })
            // isValid = status.ok

        }
    ).catch(err => res.send(err))

    if (email !== '' || email !== undefined) {

        const output = `
      <h1>You just purchase plan ${price}</h1>
      
      `;
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP,
            port: process.SMTP_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.AUTH_USER, // generated ethereal user
                pass: process.env.AUTH_PASS // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"NewHorizon"', // sender address
            to: email,
            subject: `New stack for ${price}`, // Subject line
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            res.status(200).json({
                msg: "Message has been sent"
            });
        });
    }




});

const port = process.env.PORT
app.listen(3000, () => console.log("Listening on port 3000"));