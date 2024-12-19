const express = require("express");

const productController = require("../controller/Product");
const router = express.Router();

router
  .post("/", productController.createProduct)
  .get("/", productController.fetchAllProducts)
  .get("/:id", productController.fetchProductById)
  .patch("/:id", productController.updateProduct)
//   .delete("/:id", productController.deleteProduct);

  exports.router=router