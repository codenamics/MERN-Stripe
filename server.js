require('dotenv').load();
const app = require("express")();
const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(require("body-parser").text());

app.post("/charge", (req, res) => {
    const isValid = ''
    stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
    }).then(
        status => {
            res.json({
                    status
                }),
                isValid = status.ok

        }
    ).catch(err => res.send(err))

    if (!Valid) {
        return res.status(400).json(errors);
    } else {
        const output = `
      <h1>New Adverse Event reported!</h1>
      <ul style="list-style:none; margin: 0; padding: 0">
          <li>Name: <h3>${req.body.name}</h3></li>
          <li>Lastname: <h3>${req.body.lastname}</h3></li>
          <li>Location: <h3>${req.body.location}</h3></li>
          <li>Phone: <h3>${req.body.phone}</h3></li>
          <li>Phone: <h3>${req.body.email}</h3></li>
          <li>Start Date: <h3>${req.body.start_date}</h3></li>
          <li>End Date: <h3>${req.body.end_date}</h3></li>
          <li>Drug: <h3>${req.body.drug}</h3> </li>
          <li>Batch number: <h3>${req.body.batch}</h3></li>
          <li>Adverse Event Outcome: <h3>${req.body.outcome}</h3></li>
      </ul>
      <p>
      Adverse Event details: <br>
          ${req.body.details}
      </p>
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
            from: '"Adverse Event Pharma" <foo@example.com>', // sender address
            to: "info@codenamics.pl",
            subject: `New AE has been reported for ${req.body.drug}`, // Subject line
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