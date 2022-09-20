const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

//Multer
const uploadFile = require('../middlewares/users/multerUsers');

//Validaciones
const validacionesUsers = require('../middlewares/users/validacionesUsers');

//Rutas
router.get("/login", usersController.login);

router.get("/register", usersController.register);
router.post('/register', [uploadFile.single('fotoPerfil'), validacionesUsers.register], usersController.processRegister);

router.get('/profile', usersController.profile);

module.exports = router;