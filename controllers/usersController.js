const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { send } = require("process");
const db = require("../database/models");

let controller = {
  login: (req, res) => {
    res.render("login", {
      title: "Login",
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processLogin: async (req, res) => {
    try {
      const validacionesResultado = validationResult(req);

      if (validacionesResultado.errors.length > 0) {
        res.render("login", {
          title: "Login",
          errors: validacionesResultado.mapped(),
          oldData: req.body,
          personaLogueada: req.session.usuarioLogueado,
        });
      } else {
        const usuarioLogueado = await db.usuarios.findOne({
          where: { email: req.body.email },
          include: [
            { association: "genero" },
            { association: "productoCategoria_usuario" },
          ],
          raw: true,
        });

        if (await usuarioLogueado) {
          let verificarPassword = bcryptjs.compareSync(
            req.body.password,
            usuarioLogueado.password
          );

          if (verificarPassword) {
            delete usuarioLogueado.password &&
              delete usuarioLogueado.passwordConfirm;
            req.session.usuarioLogueado = usuarioLogueado;

            usuarioLogueado.actividad =
              usuarioLogueado["productoCategoria_usuario.name"];
            usuarioLogueado.genero = usuarioLogueado["genero.name"];

            if (req.body.recuerdame != undefined) {
              res.cookie("recuerdame", req.session.usuarioLogueado, {
                maxAge: 6000 * 30,
              });
            }

            res.render("profile", {
              title: "Hola " + usuarioLogueado.nombre,
              user: await usuarioLogueado,
              personaLogueada: req.session.usuarioLogueado,
            });
          } else {
            res.render("login", {
              title: "Login",
              errors: {
                password: {
                  msg: "La contraseña es incorrecta",
                },
              },
              oldData: req.body,
              personaLogueada: req.session.usuarioLogueado,
            });
          }
        } else {
          res.render("login", {
            title: "Login",
            errors: {
              email: {
                msg: "El email ingresado no esta registrado",
              },
            },
            personaLogueada: req.session.usuarioLogueado,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  profileView: (req, res) => {
    res.render("profile", {
      title: "Perfil",
      personaLogueada: req.session.usuarioLogueado,
      user: req.session.usuarioLogueado,
    });
  },

  register: async (req, res) => {
    try {
      const generos = await db.genero.findAll({ raw: true });
      const actividades = await db.productoCategoria.findAll({ raw: true });

      res.render("register", {
        title: "Registro",
        personaLogueada: req.session.usuarioLogueado,
        generos: await generos,
        actividades: await actividades,
      });
    } catch (error) {
      console.log(error);
    }
  },

  processRegister: async (req, res) => {
    try {
      const validacionesResultado = validationResult(req);

      const generos = await db.genero.findAll({ raw: true });
      const actividades = await db.productoCategoria.findAll({ raw: true });

      if (validacionesResultado.errors.length > 0) {
        res.render("register", {
          title: "Registro",
          errors: validacionesResultado.mapped(),
          oldData: req.body,
          personaLogueada: req.session.usuarioLogueado,
          generos: await generos,
          actividades: await actividades,
        });
      } else {
        const corroborarUsuario = await db.usuarios.findOne({
          where: {
            email: req.body.email,
          },
        });

        if (!corroborarUsuario) {
          let nuevoUsuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            id_genero: req.body.genero,
            edad: req.body.edad,
            id_actividad: req.body.actividad,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
            condiciones: req.body.condiciones,
            fotoPerfil: "/images/users/" + req.file.filename,
          };

          if (
            bcryptjs.compareSync(
              req.body.password,
              nuevoUsuario.passwordConfirm
            )
          ) {
            await db.usuarios.create(nuevoUsuario);

            res.redirect("login");
          } else {
            res.render("register", {
              title: "Registro",
              errors: {
                passwordConfirm: {
                  msg: "La contraseña ingresada no coincide",
                },
              },
              oldData: req.body,
              personaLogueada: req.session.usuarioLogueado,
              generos: await generos,
              actividades: await actividades,
            });
          }
        } else {
          res.render("register", {
            title: "Registro",
            errors: {
              email: {
                msg: "Este mail ya se encuentra registrado",
              },
            },
            oldData: req.body,
            personaLogueada: req.session.usuarioLogueado,
            generos: await generos,
            actividades: await actividades,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  userEdit: async (req, res) => {
    try {
      const idUser = req.params.id;

      const usuarioEditar = await db.usuarios.findByPk(idUser, { raw: true });
      const generos = await db.genero.findAll({ raw: true });
      const actividades = await db.productoCategoria.findAll({ raw: true });

      res.render("userEdit", {
        title: "Editar Perfil",
        user: await usuarioEditar,
        personaLogueada: req.session.usuarioLogueado,
        generos: await generos,
        actividades: await actividades,
      });
    } catch (error) {
      console.log(error);
    }
  },

  processUserEdit: async (req, res) => {
    try {
      const idUser = req.params.id;

      let usuarioEditar = await db.usuarios.findByPk(idUser, { raw: true });

      let imagenPerfil;
      if (req.file == undefined) {
        imagenPerfil = usuarioEditar.fotoPerfil;
      } else {
        imagenPerfil = "/images/users/" + req.file.filename;
      }

      await db.usuarios.update(
        {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          id_genero: req.body.genero,
          edad: req.body.edad,
          id_actividad: req.body.actividad,
          email: req.body.email,
          password: usuarioEditar.password,
          passwordConfirm: usuarioEditar.passwordConfirm,
          condiciones: usuarioEditar.condiciones,
          fotoPerfil: imagenPerfil,
        },
        {
          where: { id: idUser },
        }
      );

      const nuevoUsuario = await db.usuarios.findByPk(idUser, {
        raw: true,
        include: [
          { association: "genero" },
          { association: "productoCategoria_usuario" },
        ],
      });

      nuevoUsuario.actividad = nuevoUsuario["productoCategoria_usuario.name"];
      nuevoUsuario.genero = nuevoUsuario["genero.name"];

      req.session.usuarioLogueado = nuevoUsuario;

      res.render("profile", {
        title: "Hola " + nuevoUsuario.nombre,
        user: await nuevoUsuario,
        personaLogueada: req.session.usuarioLogueado,
      });
    } catch (error) {
      console.log(error);
    }
  },

  editPassword: async (req, res) => {
    try {
      const userId = req.params.id;

      let usuarioEditar = await db.usuarios.findByPk(userId, { raw: true });

      res.render("editPassword", {
        title: "Editar Contraseña",
        user: await usuarioEditar,
        personaLogueada: req.session.usuarioLogueado,
      });
    } catch (error) {
      console.log(error);
    }
  },

  processEditPassword: async (req, res) => {
    try {
      const userId = req.params.id;

      const usuarioEditar = await db.usuarios.findByPk(userId, { raw: true });

      const validacionesResultado = validationResult(req);

      if (validacionesResultado.errors.length > 0) {
        res.render("editPassword", {
          title: "Editar Contraseña",
          errors: validacionesResultado.mapped(),
          user: await usuarioEditar,
          personaLogueada: req.session.usuarioLogueado,
        });
      } else {
        const verificacionPasswordActual = bcryptjs.compareSync(
          req.body.passwordOld,
          usuarioEditar.password
        );

        if (!verificacionPasswordActual) {
          res.render("editPassword", {
            title: "Editar Contraseña",
            errors: {
              passwordOld: {
                msg: "Tu contraseña actual es incorrecta",
              },
            },
            user: await usuarioEditar,
            personaLogueada: req.session.usuarioLogueado,
          });
        } else {
          const verificacionNewPassword = bcryptjs.compareSync(
            req.body.password,
            usuarioEditar.password
          );

          if (verificacionNewPassword) {
            res.render("editPassword", {
              title: "Editar Contraseña",
              errors: {
                password: {
                  msg: "Tu nueva contraseña no debe coincidir con la anterior",
                },
              },
              user: await usuarioEditar,
              personaLogueada: req.session.usuarioLogueado,
            });
          } else {
            if (req.body.password == req.body.passwordConfirm) {
              const usuarioEditado = {
                nombre: usuarioEditar.nombre,
                apellido: usuarioEditar.apellido,
                genero: usuarioEditar.genero,
                edad: usuarioEditar.edad,
                actividad: usuarioEditar.actividad,
                email: usuarioEditar.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                passwordConfirm: bcryptjs.hashSync(
                  req.body.passwordConfirm,
                  10
                ),
                condiciones: usuarioEditar.condiciones,
                fotoPerfil: usuarioEditar.fotoPerfil,
              };

              await db.usuarios.update(usuarioEditado, {
                where: { id: userId },
              });

              res.redirect("/logout");
            } else {
              res.render("editPassword", {
                title: "Editar Contraseña",
                errors: {
                  passwordConfirm: {
                    msg: "La contraseña no coincide.",
                  },
                },
                user: await usuarioEditar,
                personaLogueada: req.session.usuarioLogueado,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  userDelete: async (req, res) => {
    try {
      const userId = req.params.id;

      await db.usuarios.destroy({
        where: { id: userId },
      });

      await req.session.destroy();
      await res.clearCookie("recuerdame");

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("recuerdame");
    res.redirect("/login");
  },
};

module.exports = controller;
