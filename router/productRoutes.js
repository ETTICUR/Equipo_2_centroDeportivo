const express = require("express");
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, '../public/images');
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let fileName = Date.now() + '_actividad' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const uploadFile = multer({storage});

router.get("/carrito", productController.cart);

router.get("/detalle/:id", productController.detail);
router.delete("/detalle/:id", productController.delete)

router.get("/recuperar", productController.deletedProducts)
router.post("/recuperar/:id", productController.productRecovery)

router.get("/crear", productController.create);
router.post("/crear", uploadFile.single('image'), productController.processCreate);

router.get("/:id/editar", productController.editView);
router.put("/:id/editar", productController.editProduct);

module.exports = router;