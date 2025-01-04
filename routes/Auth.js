const express = require("express");

const authController = require("../controller/Auth");
const router = express.Router();
const passport = require("passport");

router
  .post("/signup",authController.createUser)
  .post("/login",passport.authenticate('local'),  authController.loginUser)
  .get("/check",passport.authenticate('jwt'),  authController.checkAuth)
  .post("/reset-password-request", authController.reserPasswordRequest);

  exports.router=router