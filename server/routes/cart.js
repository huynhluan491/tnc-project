const express = require("express");
const cartController = require("../controllers/Cart");
const router = express.Router();

router
  .route("/")
  .get(cartController.getProductInOrderByUSerID)
  .patch(cartController.updateProductInOrder)
  .post(cartController.insertProductToOrder)
  .delete(cartController.deleteProductInOrder);
// router.route("/:userID").get(cartController.getProductInCartByUSerID);
module.exports = router;
