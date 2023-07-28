const express = require("express");
const paymentController = require("../Controllers/Payment");
const authController = require("../Controllers/Auth");
const router = express.Router();
const StaticData = require("../Utils/StaticData");
// role admin can access
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    paymentController.getAllPayment
  )
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role)
    // paymentController.paymentpaymentController.updatePayment
  );

// role user can access
// router
//   .route("/paid")
//   .get(paymentController.payment)
//   .post(paymentController.paymentpaymentController.payment);
module.exports = router;
