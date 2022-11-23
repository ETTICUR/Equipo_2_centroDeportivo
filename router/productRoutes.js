const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Multer
const uploadFile = require("../middlewares/products/multerProducts");

//Validaciones
const validacionesProducts = require("../middlewares/products/validacionesProducts");
const authAdmin = require("../middlewares/users/authAdmin");
const authLogin = require("../middlewares/users/authLogin");

//Rutas
router.get("/carrito", authLogin, productController.cartView);
router.post("/carrito/terminarCompra", productController.terminarCompra)
router.post("/carrito/borrarItem/:id", productController.deleteItemCart)
router.post("/carrito/:id", productController.agregarItemACarrito)



router.get("/detalle/:id", productController.detail);
router.delete("/detalle/:id", productController.delete);

router.get("/recuperar", authAdmin, productController.deletedProducts);
router.post("/recuperar/:id", authAdmin, productController.productRecovery);

router.get("/crear", authAdmin, productController.create);
router.post(
  "/crear",
  [uploadFile.single("image"), validacionesProducts, authAdmin],
  productController.processCreate
);

router.get("/:id/editar", authAdmin, productController.editView);
router.put(
  "/:id/editar",
  [authAdmin,
  uploadFile.single("image"),
  validacionesProducts],
  productController.editProduct
);

module.exports = router;
