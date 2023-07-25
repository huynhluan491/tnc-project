const express = require("express");
const paymentController = require("../Controllers/Payment");

const router = express.Router();

router
  .route("/")
  .get(paymentController.payment)
  .post(paymentController.payment);
