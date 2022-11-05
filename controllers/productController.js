const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { setTimeout } = require("timers/promises");
let actividades = require("../data/actividades.json");
let actividadesBorradas = require("../data/actividadesBorradas.json");
const db = require("../database/models");

let controller = {
  /* --------------------------------------------
   VIEWS
   ----------------------------------------------*/

  cart: (req, res) => {
    res.render("productCart", {
      title: "Carrito Compras",
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  detail: async (req, res) => {
    try {
      const actividadSeleccionada = await db.productos.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { association: "productoCategoria" },
          { association: "morningShift" },
          { association: "afternoonShift" },
          { association: "nigthShift" },
        ],
        raw: true,
      });

      actividadSeleccionada.morningShift =
        actividadSeleccionada["morningShift.horaTurno"];
      actividadSeleccionada.afternoonShift =
        actividadSeleccionada["afternoonShift.horaTurno"];
      actividadSeleccionada.nigthShift =
        actividadSeleccionada["nigthShift.horaTurno"];

      res.render("productDetail", {
        title: "Detalle Actividad",
        actividad: actividadSeleccionada,
        personaLogueada: req.session.usuarioLogueado,
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: (req, res) => {
    res.render("productCreate", {
      title: "Crear Actividad",
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  editView: async (req, res) => {
    let idActividad = Number(req.params.id);

    try {
      const actividadSeleccionada = await db.productos.findOne({
        where: {
          id: idActividad,
        },
        include: [
          { association: "productoCategoria" },
          { association: "morningShift" },
          { association: "afternoonShift" },
          { association: "nigthShift" },
        ],
        raw: true,
      });

      actividadSeleccionada.morningShift =
        actividadSeleccionada["morningShift.horaTurno"];
      actividadSeleccionada.afternoonShift =
        actividadSeleccionada["afternoonShift.horaTurno"];
      actividadSeleccionada.nigthShift =
        actividadSeleccionada["nigthShift.horaTurno"];

      res.render("productEdit", {
        title: "Editar Actividad",
        actividad: actividadSeleccionada,
        personaLogueada: req.session.usuarioLogueado,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deletedProducts: async (req, res) => {
    try {
      const actividadesBorradas = await db.productoEliminado.findAll({
        include: [
          { association: "productoCategoria_eliminado" },
          { association: "morningShift_eliminado" },
          { association: "afternoonShift_eliminado" },
          { association: "nigthShift_eliminado" },
        ],
        raw: true,
      });

      res.render("productDeleted", {
        title: "Actividades Borradas",
        actividadesBorradas,
        personaLogueada: req.session.usuarioLogueado,
      });
    } catch (error) {
      console.log(error);
    }
  },

  /* --------------------------------------------
   PROCESS
   ----------------------------------------------*/

  processCreate: async (req, res) => {
    try {
      const resultadoValidaciones = validationResult(req);

      if (resultadoValidaciones.errors.length > 0) {
        res.render("productCreate", {
          title: "Crear Actividad",
          errors: resultadoValidaciones.mapped(),
          oldData: req.body,
          personaLogueada: req.session.usuarioLogueado,
        });
      } else {
        let nuevaActividad = {
          name: req.body.name,
          id_category: req.body.category,
          price: req.body.price,
          image: "/images/products/" + req.file.filename,
          description: req.body.description,
          id_morningShift: req.body.morningShift,
          id_afternoonShift: req.body.afternoonShift,
          id_nigthShift: req.body.nigthShift,
        };

        await db.productos.create(nuevaActividad);

        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },

  editProduct: async (req, res) => {
    try {
      let idSeleccionado = Number(req.params.id);

      let actividadAEditar = await db.productos.findByPk(idSeleccionado, {
        raw: true,
      });

      let imageActividadEditada;
      if (req.file == undefined) {
        imageActividadEditada = actividadAEditar.image;
      } else {
        imageActividadEditada = "/images/products/" + req.file.filename;
      }
      await db.productos.update(
        {
          name: req.body.name,
          id_category: req.body.category,
          price: req.body.price,
          image: imageActividadEditada,
          description: req.body.description,
          id_morningShift: req.body.morningShift,
          id_afternoonShift: req.body.afternoonShift,
          id_nigthShift: req.body.nigthShift,
        },
        {
          where: {
            id: idSeleccionado,
          },
        }
      );

      res.redirect(`/producto/detalle/${actividadAEditar.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      let idSeleccionado = Number(req.params.id);

      let actividadEliminada = await db.productos.findByPk(idSeleccionado);


      await db.productoEliminado.create(actividadEliminada.dataValues);

      await db.productos.destroy({
        where: {
          id: idSeleccionado,
        },
      });

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  productRecovery: async (req, res) => {
    try {
      let idSeleccionado = Number(req.params.id);

      let actividadARecuperar = await db.productoEliminado.findByPk(
        idSeleccionado
      );

      await db.productos.create(actividadARecuperar.dataValues);

      await db.productoEliminado.destroy({
        where: {
          id: idSeleccionado,
        },
      });

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
