const express = require("express");
const orderController = require("../controllers/order");
const router = express.Router();

router
  .route("/product/")
  .get(orderController.getProductInOrderByUSerID)
  .patch(orderController.updateProductInOrder)
  .post(orderController.insertProductToOrder)
  .delete(orderController.deleteProductInOrder);

router
  .route("/orderdetails/")
  .get(orderController.getOrderDetailsByOrderIDUserID);

router.route("/user/:UserID").get(orderController.getOrderByUserID);
// router.route("/:userID").get(orderController.getProductInCartByUSerID);

router.route("/test").post(orderController.updateStatusPayment);

module.exports = router;
