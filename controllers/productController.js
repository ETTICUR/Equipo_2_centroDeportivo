const fs = require("fs")
const path = require("path")
let actividades = require("../data/actividades.json")
let actividadesBorradas = require("../data/actividadesBorradas.json")


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
  },

  delete: (req, res) => {
    let idSeleccionado = Number(req.params.id)
    
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/actividades.json")))
    let eliminadas = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/actividadesBorradas.json")))

    let actividadesRestantes = data.filter(e => e.id !== idSeleccionado )
    let actividadEliminada = data.find(e => e.id == idSeleccionado )

    eliminadas.push(actividadEliminada)
    
    let actividadesRestantesJSON = JSON.stringify(actividadesRestantes)
    let actividadEliminadaJSON = JSON.stringify(eliminadas)

    fs.writeFileSync(path.join(__dirname, "../data/actividades.json"), actividadesRestantesJSON)
    fs.writeFileSync(path.join(__dirname, "../data/actividadesBorradas.json"), actividadEliminadaJSON)

    res.redirect("/")
  },

  deletedProducts: (req, res) => {

    res.render('productDeleted', {
      title: 'Actividades Borradas',
      actividadesBorradas
    });
  },

  productRecovery: (req, res) => {
    let idSeleccionado = Number(req.params.id)

    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/actividades.json")))
    let eliminadas = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/actividadesBorradas.json")))

    let recuperarActividad = eliminadas.find(e => e.id == idSeleccionado )
    let actividadesBorradasRestantes = eliminadas.filter(e => e.id !== idSeleccionado )

    data.push(recuperarActividad)

    let recuperarActividadJSON = JSON.stringify(data)
    let actividadesBorradasRestantesJSON = JSON.stringify(actividadesBorradasRestantes)

    fs.writeFileSync(path.join(__dirname, "../data/actividades.json"), recuperarActividadJSON)
    fs.writeFileSync(path.join(__dirname, "../data/actividadesBorradas.json"), actividadesBorradasRestantesJSON)

    res.redirect("/")
  }

}

module.exports = controller;