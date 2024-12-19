const express = require("express");

const userController = require("../controller/User");
const router = express.Router();

router
  .get("/:id", userController.fetchUserById)
  // .post("/login", authController.loginUser)

  exports.router=router