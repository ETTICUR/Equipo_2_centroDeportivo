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

  cartView: (req, res) => {
    res.render("productCart", {
      title: "Carrito Compras",
      personaLogueada: req.session.usuarioLogueado,
      cart: req.session.carrito
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

  create: async (req, res) => {
    try {
      
      const categorias = await db.productoCategoria.findAll({ raw: true });
      const turnoManiana = await db.morningShift.findAll({ raw: true });
      const turnoTarde = await db.afternoonShift.findAll({ raw: true });
      const turnoNoche = await db.nigthShift.findAll({ raw: true });

      res.render("productCreate", {
        title: "Crear Actividad",
        categorias: categorias,
        turnoManiana: turnoManiana,
        turnoTarde: turnoTarde,
        turnoNoche: turnoNoche,
        personaLogueada: req.session.usuarioLogueado,
      });
    } catch (error) {
      console.log(error)
    }
  },

  editView: async (req, res) => {
    let idActividad = Number(req.params.id);

    try {

      const categorias = await db.productoCategoria.findAll({ raw: true });
      const turnoManiana = await db.morningShift.findAll({ raw: true });
      const turnoTarde = await db.afternoonShift.findAll({ raw: true });
      const turnoNoche = await db.nigthShift.findAll({ raw: true });

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
        categorias: categorias,
        turnoManiana: turnoManiana,
        turnoTarde: turnoTarde,
        turnoNoche: turnoNoche,
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

      const categorias = await db.productoCategoria.findAll({ raw: true });
      const turnoManiana = await db.morningShift.findAll({ raw: true });
      const turnoTarde = await db.afternoonShift.findAll({ raw: true });
      const turnoNoche = await db.nigthShift.findAll({ raw: true });

      if (resultadoValidaciones.errors.length > 0) {
        res.render("productCreate", {
          title: "Crear Actividad",
          errors: resultadoValidaciones.mapped(),
          categorias: categorias,
          turnoManiana: turnoManiana,
          turnoTarde: turnoTarde,
          turnoNoche: turnoNoche,
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

      const resultadoValidaciones = validationResult(req);

      if(resultadoValidaciones.errors.length > 0){
        let idActividad = Number(req.params.id);

        const categorias = await db.productoCategoria.findAll({ raw: true });
        const turnoManiana = await db.morningShift.findAll({ raw: true });
        const turnoTarde = await db.afternoonShift.findAll({ raw: true });
        const turnoNoche = await db.nigthShift.findAll({ raw: true });
  
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
          errors: resultadoValidaciones.mapped(),
          categorias: categorias,
          turnoManiana: turnoManiana,
          turnoTarde: turnoTarde,
          turnoNoche: turnoNoche,
          personaLogueada: req.session.usuarioLogueado,
        });
      } else {
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
      }
      
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

  agregarItemACarrito: async (req, res) => {
    try {
      const itemAgregar = await db.productos.findOne({
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

      let itemReducido = {
        id: itemAgregar.id,
        name: itemAgregar.name,
        qty: req.body.qty,
        price: Number(itemAgregar.price) * Number(req.body.qty),
        image: itemAgregar.image,
      };

      let carritoSession = req.session.carrito;

      let pos = -1;

      for (let i = 0; i < carritoSession.length; i++) {
        if (carritoSession[i].id == itemReducido.id) {
          pos = i;
          break;
        }
      }

      if (pos == -1) {
        carritoSession.push(itemReducido);
      } else {

        let itemActualizado = {
          id: carritoSession[pos].id,
          name: carritoSession[pos].name,
          qty: Number(carritoSession[pos].qty) + Number(req.body.qty),
          price: Number(carritoSession[pos].price) + (Number(await itemAgregar.price) * Number(req.body.qty)),
          image: carritoSession[pos].image,
        };

        carritoSession[pos] = itemActualizado;
      }


      res.redirect("/producto/carrito");
    } catch (error) {
      console.log(error);
    }
  },

  deleteItemCart: async (req, res) => {
    try {
      let carritoSession = req.session.carrito;
      let itemABorrar = req.params.id;

      let carritoActualizado = []

      for (let i = 0; i < carritoSession.length; i++) {
        if(carritoSession[i].id != itemABorrar){
          carritoActualizado.push(carritoSession[i])
        }
      }

      req.session.carrito = carritoActualizado;

    } catch (error) {
      console.log(error);
    }

    res.render("productCart", {
      title: "Carrito Compras",
      personaLogueada: req.session.usuarioLogueado,
      cart: req.session.carrito
    });
  },

  terminarCompra: async (req, res)=>{
    try {
      let carritoSession = req.session.carrito

      let jsonCart = {
        carrito: JSON.stringify(carritoSession),
      };

      console.log(jsonCart);

      if(carritoSession.length > 0){
        await db.ventas.create(jsonCart)
      }

      req.session.carrito = []

      res.redirect("/")
      
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = controller;
