const express = require("express");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");

const router = express.Router();

// Protect all routes after this middleware
router.use(userController.protect);

router.post("/uploadProduct/:id", productController.uploadProduct);
router
  .route("/products-within/:distance/center/:latlng/unit/:unit")
  .get(productController.productAroundUser);
// /tour-within?distance=233&center=-40,45&unit=mi

module.exports = router;
