const express = require("express");
const authController = require("../Controllers/auth");
const userController = require("../Controllers/User");
const StaticData = require("../utils/StaticData");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/logout").get(authController.logout);
// router.param("id", userController.checkID);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(
    // authController.protect,
    // authController.restrictTo(StaticData.AUTH.Role),
    userController.updateUserById
  )
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    userController.deleteUserById
  );
//.get(userController.getUser)

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    userController.getUsers
  )
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    userController.addUser
  )
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role),
    userController.deleteMultipleUserById //param id=1,id=2,...
  );

router.route("/byname/:username").post(userController.getUserByUserName);

module.exports = router;
