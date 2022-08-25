const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/productCart", productController.cart);

router.get("/productDetail", productController.detail);

router.get("/productCreate", productController.create);

router.get("/productEdit", productController.edit);

module.exports = router;