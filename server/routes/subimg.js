const express = require("express");
const SubImageController = require("../controllers/Subimg");
const router = express.Router();
const authController = require("./../controllers/auth");
const StaticData = require("../utils/StaticData");

router
  .route("/:id")
  .get(SubImageController.getSubImages)
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    SubImageController.deleteSubImgById
  )
  .patch(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    SubImageController.updateSubImgById
  );

router
  .route("/")
  .get(SubImageController.getSubImages)
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    SubImageController.createNewSubImg
  );

// router.route("/byProduct/:id").get(SubImageController.getSubImgByProductId);
router
  .route("/image")
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    SubImageController.saveFileSubImage
  );
router
  .route("/image/:id")
  .get(SubImageController.getFileSubImage)
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    SubImageController.deleteFileSubImage,
    SubImageController.deleteSubImgById
  );

// router.route("/saveFileImage").post(SubImageController.saveFileImage);
module.exports = router;
