const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

//Multer
const uploadFile = require('../middlewares/users/multerUsers');

//Validaciones
const validacionesUsers = require('../middlewares/users/validacionesUsers');

//Rutas
router.get("/login", usersController.login);
router.post('/login',validacionesUsers.login, usersController.processLogin);

router.get("/register", usersController.register);
router.post('/register', [uploadFile.single('fotoPerfil'), validacionesUsers.register], usersController.processRegister);

router.get('/userEdit/:id', usersController.userEdit);
router.post('/userEdit/:id', uploadFile.single('fotoPerfil'), usersController.processUserEdit);

module.exports = router;