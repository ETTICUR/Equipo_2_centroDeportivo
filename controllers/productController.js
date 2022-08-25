let actividades = require("../actividades.json")

let controller = {
   cart: (req, res) => {
    res.render('productCart', {title: 'Carrito Compras'});
  },

  detail: (req, res) => {
    let idSeleccionado = Number(req.params.id)
    let actividadSeleccionada = actividades.find(e => e.id == idSeleccionado )  
      
    res.render('productDetail', {
      title: 'Detalle Actividad',
      actividad: actividadSeleccionada
    });
  },

  create: (req, res) => {
    res.render('productCreate', {title: 'Crear Actividad'});
  },

  edit: (req, res) => {
    res.render('productEdit', {title: 'Editar Actividad'});
  }

}

module.exports = controller;