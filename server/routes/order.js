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
  .post(orderController.getOrderDetailsByOrderIDUserID);

router.route("/:UserID").get(orderController.getOrderByUserID);
// router.route("/:userID").get(orderController.getProductInCartByUSerID);
module.exports = router;
