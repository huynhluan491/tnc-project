const express = require("express");
const paymentController = require("../Controllers/Payment");
const authController = require("../Controllers/Auth");
const router = express.Router();
const StaticData = require("../Utils/StaticData");
const vnPayController = require("../Controllers/vnPay");

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

router.get("/create_payment_url", vnPayController.create_payment_url);

router.get("/vnpay_return", vnPayController.vnpay_return);

router.get("/vnpay_ipn", vnPayController.vnpay_ipn);

module.exports = router;
