const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51H09PyDIUIYmt1jhFGpYqOZEGgQ34Fv9lvZzulW12gOXEYkig7gT5Lh17FbmtSabicYLA99srKfiSCYCGgfgEhHe00ABezVNZN"
);

// app config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("GOT A REQUEST OH SHIT");
  console.log(total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // 201 = Payment Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen
exports.api = functions.https.onRequest(app);
