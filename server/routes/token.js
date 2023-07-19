const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
router.route("/dev").get(authController.getTokenDev);
router.route("/refreshtoken").post(authController.getRefreshToken);
module.exports = router;
