require("dotenv").load();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const Charge = require("../../models/Charge");
router.post("/pay", (req, res) => {
  const { price, token, email } = req.body;

  stripe.customers
    .create({
      email,
      source: token
    })
    .then(customer =>
      stripe.charges.create({
        amount: price,
        description: email,
        currency: "usd",
        customer: customer.id,
        receipt_email: email
      })
    )
    .then(status => {
      res.json({
        status
      });
    })
    .catch(err => res.send(err));

  if (email !== "" || email !== undefined) {
    const output = `
      <h1>You just purchase plan ${price}</h1>
      `;
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP,
      port: process.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: '"NewHorizon"',
      to: email,
      subject: `New stack for ${price}`,
      html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.status(200).json({
        msg: "Message has been sent"
      });
    });
  }
});

router.get("/all", (req, res) => {
  stripe.charges
    .list({
      limit: 3
    })
    .then(charges => {
      let promises = charges.data.map(charge => {
        let newData = new Charge({ amount: charge.amount });
        return newData.save();
      });
      return Promise.all(promises);
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.error(err);
    });
});

module.exports = router;
