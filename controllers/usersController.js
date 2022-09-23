const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs");

let controller = {
    login: (req, res) => {
        res.render('login', { title: 'Login' });
    },

    processLogin: (req, res) => {
        const validacionesResultado = validationResult(req);

        if (validacionesResultado.errors.length > 0) {
            res.render('login', {
                title: 'Login',
                errors: validacionesResultado.mapped(),
                oldData: req.body
            })
        } else {
            let usuariosObjeto = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/user.json")));
            let corroborarUsuario = usuariosObjeto.find(usuarioActual => usuarioActual.email == req.body.email);

            if (corroborarUsuario) {
                let verificarPassword = bcryptjs.compareSync(req.body.password, corroborarUsuario.password);

                res.render("profile", {
                    title: 'Hola ' + corroborarUsuario.nombre,
                    user: corroborarUsuario
                })
            } else {
                res.render('login', {
                    title: 'Login', 
                    errors: {
                        password: {
                            msg: 'La contraseña es incorrecta'
                        }
                    },
                    oldData: req.body
                })
            }
        } else {
            res.render('login',{
                title: 'Login',
                errors: {
                    email:{
                      msg: 'El email ingresado no esta registrado'  
                    }
                }
            })
        }
        }

    },

    register: (req, res) => {
        res.render('register', { title: 'Registro' });

    },

    processRegister: (req, res) => {
        const validacionesResultado = validationResult(req);

        if (validacionesResultado.errors.length > 0) {
            res.render('register', {
                title: 'Registro',
                errors: validacionesResultado.mapped(),
                oldData: req.body
            })
        } else {
            let usuariosObjeto = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/user.json")));
            let corroborarUsuario = usuariosObjeto.find(usuarioActual => usuarioActual.email == req.body.email);

            if (!corroborarUsuario) {
                let nuevoUsuario = {
                    id: usuariosObjeto.length + 1,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    genero: req.body.genero,
                    edad: req.body.edad,
                    actividad: req.body.actividad,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
                    condiciones: req.body.condiciones,
                    fotoPerfil: "/images/users" + req.file.filename
                };

                if (bcryptjs.compareSync(req.body.password, nuevoUsuario.passwordConfirm)) {
                    usuariosObjeto.push(nuevoUsuario);

                    let usuariosObjetoJSON = JSON.stringify(usuariosObjeto, null, " ");

                    fs.writeFileSync(path.join(__dirname, "../data/user.json"), usuariosObjetoJSON);

                    res.redirect("login");

                } else {
                    res.render("register", {
                        title: "Registro",
                        errors: {
                            passwordConfirm: {
                                msg: "La contraseña ingresada no coincide"
                            }
                        },
                        oldData: req.body
                    })
                }

            } else {
                res.render("register", {
                    title: "Registro",
                    errors: {
                        email: {
                            msg: "Este mail ya se encuentra registrado"
                        }
                    },
                    oldData: req.body
                })
            }
        }
    },

    profile: (req, res) => {
        res.render('profile', {
            title: 'Perfil'
        });
    }
}

module.exports = controller;