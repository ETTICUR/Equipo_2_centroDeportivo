const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/carrito", productController.cart);

router.get("/detalle/:id", productController.detail);
router.delete("/detalle/:id", productController.delete)

router.get("/recuperar", productController.deletedProducts)
router.post("/recuperar/:id", productController.productRecovery)

router.get("/crear", productController.create);
router.post("/crear", productController.processCreate);

router.get("/:id/editar", productController.editView);
router.post("/:id/editar", productController.editProduct);

module.exports = router;