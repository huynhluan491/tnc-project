const express = require("express");
const productController = require("../Controllers/Product");
const authController = require("../Controllers/auth");
const StaticData = require("../utils/StaticData");
const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    productController.createNewProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    productController.deleteMultipleProductById
  );

router.route("/search").post(productController.getProducts);

router
  .route("/productnonpagination")
  .get(productController.getProductNonPaginate);

router
  .route("/:id")
  .get(productController.getProductById)
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    productController.deleteById
  )
  .patch(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    productController.updateProductById
  );

router
  .route("/image")
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    productController.saveFileProductImage
  );
router.route("/image/:imageName").get(productController.getFileProductImage);

// router.route("/saveFileImage").post(productController.saveFileImage);
module.exports = router;
