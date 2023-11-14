const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.SERVER_PORT || 3000;

const customerRoute = require("./route/CustomerRoute");
const userRoute = require("../api/route/UserRoute");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/customer_crud").then(() => {
  app.listen(3000, () => {
    console.log(`api staterd and running onnport ${port}`);
  });
});

// app.use("/", (req, resp, next) => {
//   resp.send(`<h1>WORKING</h1>`);
// });

app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/users", userRoute);
