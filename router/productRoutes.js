const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

//Multer
const uploadFile = require('../middlewares/products/multerProducts');

//Validaciones
const validacionesProducts = require('../middlewares/products/validacionesProducts');

//Rutas
router.get("/carrito", productController.cart);

router.get("/detalle/:id", productController.detail);
router.delete("/detalle/:id", productController.delete)

router.get("/recuperar", productController.deletedProducts)
router.post("/recuperar/:id", productController.productRecovery)

router.get("/crear", productController.create);
router.post("/crear", uploadFile.single('image'), validacionesProducts, productController.processCreate);

router.get("/:id/editar", productController.editView);
router.put("/:id/editar", uploadFile.single('image'), productController.editProduct);

module.exports = router;