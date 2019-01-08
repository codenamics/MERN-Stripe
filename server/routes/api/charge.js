require("dotenv").load();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const Charge = require("../../models/Charge");
const nodemailer = require('nodemailer')

router.post("/pay", (req, res) => {
  const {
    price,
    token,
    email,
    name,
    phone,
    city,
    street,
    post_code,
    country,
  } = req.body;
  // stripe.customers
  //   .create({
  //     email,
  //     source: token
  //   })
  //   .then(customer =>
  stripe.charges.create({
      amount: price,
      currency: "usd",
      source: token
      // customer: customer.id,
      // receipt_email: email
    })
    // )
    .then(status => {
      console.log(status)
      const newData = new Charge({
        id: status.id,
        name,
        email,
        amount: price,
        phone,
        city,
        street,
        post_code: status.source.address_zip,
        country,
      })
      newData.save().then(charge => {
        res.json({
          charge
        })
      })


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
    .list()
    .then(charges => {
      const dataForSaving = charges.data.map(charge => {
        return {
          id: charge._id,
          amount: charge.amount
        };
      });
      Charge.insertMany(dataForSaving)
        .then(docs => {
          res.json(docs);
        })
        .catch(err => console.log(err));
    });
});

module.exports = router;