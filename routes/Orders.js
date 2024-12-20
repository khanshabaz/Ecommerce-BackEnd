const express = require("express");

const orderController = require("../controller/Order");
const router = express.Router();

router
  .post("/", orderController.createOrder)
  .get("/:id", orderController.fetchOrderByUser)
  .patch("/:id", orderController.updateOrder)

  exports.router=router