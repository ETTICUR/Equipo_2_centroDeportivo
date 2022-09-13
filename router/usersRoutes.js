const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

//Multer
const uploadFile = require('../middlewares/users/multerUsers');

//Validaciones
const validacionesUsers = require('../middlewares/products/validacionesProducts');

router.get("/login", usersController.login);

router.get("/register", [uploadFile.single('image'), validacionesUsers], usersController.register);

module.exports = router;