let actividades = require("../data/actividades.json")

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

  processCreate: (req, res) => {
    //res.send({body: req.body});
    res.redirect('/');
  },

  edit: (req,res) => {
    let idActividad = Number(req.params.id);
    let actividadSeleccionada = actividades.find(actividadActual => actividadActual.id == idActividad);

    res.render('productEdit', {
      title: 'Editar Actividad',
      actividad: actividadSeleccionada
    });
  }

}

module.exports = controller;