const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/carrito", productController.cart);

router.get("/detalle", productController.detail);

router.get("/crear", productController.create);

router.get("/editar", productController.edit);

module.exports = router;