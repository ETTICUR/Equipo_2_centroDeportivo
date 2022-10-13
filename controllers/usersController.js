const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { send } = require("process");

let controller = {

  login: (req, res) => {
    res.render("login", {
      title: "Login",
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processLogin: (req, res) => {
    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("login", {
        title: "Login",
        errors: validacionesResultado.mapped(),
        oldData: req.body,
        personaLogueada: req.session.usuarioLogueado,
      });
    } else {
      let usuariosObjeto = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../data/user.json"))
      );
      let usuarioLogueado = usuariosObjeto.find(
        (usuarioActual) => usuarioActual.email == req.body.email
      );

      if (usuarioLogueado) {
        let verificarPassword = bcryptjs.compareSync(
          req.body.password,
          usuarioLogueado.password
        );

        if (verificarPassword) {
          delete usuarioLogueado.password &&
            delete usuarioLogueado.passwordConfirm;
          req.session.usuarioLogueado = usuarioLogueado;

          res.render("profile", {
            title: "Hola " + usuarioLogueado.nombre,
            user: usuarioLogueado,
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
  },

  profileView: (req, res) => {
    res.render("profile", {
      title: "Perfil",
      personaLogueada: req.session.usuarioLogueado,
      user: req.session.usuarioLogueado,
    });
  },

  register: (req, res) => {
    res.render("register", {
      title: "Registro",
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processRegister: (req, res) => {
    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("register", {
        title: "Registro",
        errors: validacionesResultado.mapped(),
        oldData: req.body,
        personaLogueada: req.session.usuarioLogueado
      });
    } else {
      let usuariosObjeto = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../data/user.json"))
      );
      let corroborarUsuario = usuariosObjeto.find(
        (usuarioActual) => usuarioActual.email == req.body.email
      );

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
          fotoPerfil: "/images/users/" + req.file.filename,
        };

        if (
          bcryptjs.compareSync(req.body.password, nuevoUsuario.passwordConfirm)
        ) {
          usuariosObjeto.push(nuevoUsuario);

          let usuariosObjetoJSON = JSON.stringify(usuariosObjeto, null, " ");

          fs.writeFileSync(
            path.join(__dirname, "../data/user.json"),
            usuariosObjetoJSON
          );

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
            personaLogueada: req.session.usuarioLogueado
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
          personaLogueada: req.session.usuarioLogueado
        });
      }
    }
  },

  userEdit: (req, res) => {
    const idUser = Number(req.params.id);
    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/user.json"))
    );

    let usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == idUser
    );

    res.render("userEdit", {
      title: "Editar Perfil",
      user: usuarioEditar,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processUserEdit: (req, res) => {
    const idUser = Number(req.params.id);
    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/user.json"))
    );
    let usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != idUser
    );
    let usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == idUser
    );

    let imagenPerfil;
    if (req.file == undefined) {
      imagenPerfil = usuarioEditar.fotoPerfil;
    } else {
      imagenPerfil = "/images/users/" + req.file.filename;
    }

    let usuarioEditado = {
      id: usuarioEditar.id,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      genero: req.body.genero,
      edad: req.body.edad,
      actividad: req.body.actividad,
      email: req.body.email,
      password: usuarioEditar.password,
      passwordConfirm: usuarioEditar.passwordConfirm,
      condiciones: usuarioEditar.condiciones,
      fotoPerfil: imagenPerfil,
    };

    usuariosRestantes.push(usuarioEditado);

    let usuariosObjetoJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(
      path.join(__dirname, "../data/user.json"),
      usuariosObjetoJSON
    );

    res.render("profile", {
      title: "Hola " + usuarioEditado.nombre,
      user: usuarioEditado,
    });
  },

  editPassword: (req, res) => {
    const userId = Number(req.params.id);

    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/user.json"))
    );
    const usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == userId
    );

    res.render("editPassword", {
      title: "Editar Contraseña",
      user: usuarioEditar,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processEditPassword: (req, res) => {
    const userId = Number(req.params.id);

    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/user.json"))
    );
    const usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != userId
    );
    const usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == userId
    );

    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("editPassword", {
        title: "Editar Contraseña",
        errors: validacionesResultado.mapped(),
        user: usuarioEditar,
        personaLogueada: req.session.usuarioLogueado
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
          user: usuarioEditar,
          personaLogueada: req.session.usuarioLogueado
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
            user: usuarioEditar,
            personaLogueada: req.session.usuarioLogueado
          });
        } else {
          if (req.body.password == req.body.passwordConfirm) {
            const usuarioEditado = {
              id: usuarioEditar.id,
              nombre: usuarioEditar.nombre,
              apellido: usuarioEditar.apellido,
              genero: usuarioEditar.genero,
              edad: usuarioEditar.edad,
              actividad: usuarioEditar.actividad,
              email: usuarioEditar.email,
              password: bcryptjs.hashSync(req.body.password, 10),
              passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
              condiciones: usuarioEditar.condiciones,
              fotoPerfil: usuarioEditar.fotoPerfil,
            };

            usuariosRestantes.push(usuarioEditado);

            let usuariosObjetoJSON = JSON.stringify(
              usuariosRestantes,
              null,
              " "
            );

            fs.writeFileSync(
              path.join(__dirname, "../data/user.json"),
              usuariosObjetoJSON
            );

            res.redirect("/logout");
          } else {
            res.render("editPassword", {
              title: "Editar Contraseña",
              errors: {
                passwordConfirm: {
                  msg: "La contraseña no coincide.",
                },
              },
              user: usuarioEditar,
              personaLogueada: req.session.usuarioLogueado
            });
          }
        }
      }
    }
  },

  userDelete: (req, res) => {
    const userId = Number(req.params.id);

    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/user.json"))
    );
    const usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != userId
    );

    const usuariosObjetoJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(
      path.join(__dirname, "../data/user.json"),
      usuariosObjetoJSON
    );

    res.redirect("/");
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/login");
    
  },
};

module.exports = controller;
