require('dotenv').load();
const app = require("express")();
const stripe = require("stripe")(process.env.SECRET_KEY);
const nodemailer = require('nodemailer')

app.use(require("body-parser").text());

app.post("/charge", (req, res) => {
    console.log(req.body)
    //{"token":"tok_1DnuwhFw7kwjoel1NsD2Qd1r","email":"lll"}
    stripe.charges.create({
        amount: 4000,
        currency: "usd",
        description: req.body.email,
        source: req.body.token
    }).then(
        status => {
            res.json({
                status
            })
            // isValid = status.ok

        }
    ).catch(err => res.send(err))

    let mail = req.body.email
    console.log(mail)
    //undefined
    // if (mail !== '' || mail !== undefined) {

    //     const output = `
    //   <h1>New Adverse Event reported!</h1>
    //   <ul style="list-style:none; margin: 0; padding: 0">

    //   </ul>
    //   <p>
    //   Adverse Event details: <br>
    //       ${mail}
    //   </p>
    //   `;
    //     let transporter = nodemailer.createTransport({
    //         host: process.env.SMTP,
    //         port: process.SMTP_PORT,
    //         secure: true, // true for 465, false for other ports
    //         auth: {
    //             user: process.env.AUTH_USER, // generated ethereal user
    //             pass: process.env.AUTH_PASS // generated ethereal password
    //         },
    //         tls: {
    //             rejectUnauthorized: false
    //         }
    //     });

    //     // setup email data with unicode symbols
    //     let mailOptions = {
    //         from: '"Adverse Event Pharma" <foo@example.com>', // sender address
    //         to: 'info@codenamics.pl',
    //         subject: `New AE has been reported for ${req.body.drug}`, // Subject line
    //         html: output // html body
    //     };

    //     // send mail with defined transport object
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log("Message sent: %s", info.messageId);
    //         // Preview only available when sending through an Ethereal account
    //         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //         res.status(200).json({
    //             msg: "Message has been sent"
    //         });
    //     });
    // }




});

const port = process.env.PORT
app.listen(3000, () => console.log("Listening on port 3000"));