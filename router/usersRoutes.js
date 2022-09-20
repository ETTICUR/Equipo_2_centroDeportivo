const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

//Multer
const uploadFile = require('../middlewares/users/multerUsers');

//Validaciones
const validacionesUsersRegister = require('../middlewares/users/validacionesUsers');

//Rutas
router.get("/login", usersController.login);

router.get("/register", usersController.register);
router.post('/register', [uploadFile.single('fotoPerfil'), validacionesUsersRegister], usersController.processRegister);

module.exports = router;