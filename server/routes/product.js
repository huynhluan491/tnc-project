const express = require("express");
const productController = require("../controllers/Product");
const authController = require("./../controllers/auth");
const StaticData = require("../utils/StaticData");
const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
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
