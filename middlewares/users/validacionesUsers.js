const path = require('path');
const { body } = require('express-validator');

const validacionesUsers = [
    body('name').notEmpty().withMessage('El nombre usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre usuario es obligatorio'),

    body('image').custom((value, {req}) => {
        let file = req.file;
        let extensionesPermitidas = ['.png', '.jpg'];
        if(!file){
            throw new Error('Tienes que subir una imagen');
        }else{
            let extension = path.extname(file.originalname);
            if(!extensionesPermitidas.includes(extension)){
                throw new Error(`Las extenciones permitidas son: ${extensionesPermitidas}`);
            }
        }
        return true;
    })
];

module.exports = validacionesUsers;