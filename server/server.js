const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/login", async (req, res) => {
  let authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    process.env.SHOP,
    "/auth/callback",
    false
  );
  return res.redirect(authRoute);
});

app.get("/auth/callback", async (req, res) => {
  try {
    const session = await Shopify.Auth.validateAuthCallback(
      req,
      res,
      req.query
    ); // req.query must be cast to unkown and then AuthQuery in order to be accepted
    ACTIVE_SHOPIFY_SHOPS[process.env.SHOP] = session.scope;
    console.log(session.accessToken);
  } catch (error) {
    console.error(error); // in practice these should be handled more gracefully
  }
  return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`); // wherever you want your user to end up after OAuth completes
});

app.get("/products", async (req, res) => {
  const response = await fetch(
    "https://messoldtech-test.myshopify.com/admin/api/2022-07/products.json",
    {
      method: "GET",
      headers: {
        // the content type header value is usually auto-set
        // depending on the request body
        "Content-Type": "text/plain;charset=UTF-8",
        "X-Shopify-Access-Token": "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",
        // "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const data = await response.json();
  res.send(data);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
