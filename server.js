require('dotenv').load();
const app = require("express")();
const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(require("body-parser").text());

app.post("/charge", (req, res) => {
    stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
    }).then(
        status => {
            res.json({
                status
            })
        }
    ).catch(err => res.send(err))

});
const port = process.env.PORT
app.listen(9000, () => console.log("Listening on port 9000"));