
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "success!"
    });
});

// Endpoint to create a payment
app.post("/payment/create", async (req, res) => {
    const total = parseInt(req.query.total); 
        console.log("Request body:", req.query)

    if (total > 0) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "usd",
            })
            console.log("Payment Intent:", paymentIntent);
            res.status(201).json({
                clientSecret:paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).json({
                error: "Failed to create payment intent",
                details: error.message
            });
        }
    } else {
        res.status(403).json({
            message: "Total must be greater than 0"
        });
    }
});

// Export the API
// exports.api = onRequest(app);

// Export the API
app.listen(5000,(err)=>{
    if(err)throw err
    console.log("amazon server runing on port :5000,http://localhost:5000")
})
// {
//   "clientSecret": "pi_3Q3dBhGY3aW5Q1iu2JhZ8fB1_secret_kGdq6OPXrkU8w0FMA8YPfIVU7"
// }