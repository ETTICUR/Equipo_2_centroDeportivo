const path = require('path');

let controller = {
   cart: (req, res) => {
    res.render('productCart', {title: 'Carrito Compras'});
  },

  detail: (req, res) => {
    res.render('productDetail', {title: 'Detalle Actividad'});
  },

  create: (req, res) => {
    res.render('productCreate', {title: 'Crear Actividad'});
  },

  edit: (req, res) => {
    res.render('productEdit', {title: 'Editar Actividad'});
  }

}

module.exports = controller;