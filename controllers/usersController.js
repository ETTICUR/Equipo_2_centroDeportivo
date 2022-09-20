const path = require('path');
const fs = require('fs');
const {validationResult}= require('express-validator');

let controller = {
    login: (req, res) => {
        res.render('login', {title: 'Login'});
    },

    register: (req, res) => {
        res.render('register', {title: 'Registro'});

    },

    processRegister: (req, res) => {
        const validacionesResultado = validationResult(req);

        if (validacionesResultado.errors.length > 0){
            res.render('register')
        }
    },

    profile: (req,res) => {
        res.render('profile', {
            title: 'Perfil'
        });
    }
}

module.exports = controller;