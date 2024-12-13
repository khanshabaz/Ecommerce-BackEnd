const express = require("express");

const productController = require("../Controller/Brand");
const router = express.Router();

router
  .post("/", productController.createBrand)
//   .get("/", productController.fetchAllProducts)
//   .get("/:id", productController.fetchProductBy)
//   .patch("/:id", productController.updateProduct)
//   .delete("/:id", productController.deleteProduct);

  exports.router=router