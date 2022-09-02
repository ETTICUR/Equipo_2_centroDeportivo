const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/carrito", productController.cart);

router.get("/detalle/:id", productController.detail);

router.get("/crear", productController.create);
router.post("/crear", productController.processCreate);

router.get("/:id/editar", productController.edit);

module.exports = router;