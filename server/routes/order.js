const express = require("express");
const orderController = require("../controllers/order");
const router = express.Router();

router
  .route("/")
  .get(orderController.getProductInOrderByUSerID)
  .patch(orderController.updateProductInOrder)
  .post(orderController.insertProductToOrder)
  .delete(orderController.deleteProductInOrder);
// router.route("/:userID").get(orderController.getProductInCartByUSerID);
module.exports = router;
