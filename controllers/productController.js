const fs = require("fs")
const path = require("path")
const { setTimeout } = require("timers/promises")
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
    let actividadesObjeto = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/actividades.json')));

    let nuevaActividad = {
      id: actividadesObjeto.length + 1,
      name: req.body.name,
      image: '/images/' + req.file.filename,
      price: req.body.price,
      category: req.body.category,
      morningShift: req.body.morningShift,
      afternoonShift: req.body.afternoonShift,
      nightShift: req.body.nightShift,
      description: req.body.description
    };

    actividadesObjeto.push(nuevaActividad);

    let actividadesObjetoJSON = JSON.stringify(actividadesObjeto, null, " ");

    fs.writeFileSync(path.join(__dirname, '../data/actividades.json'), actividadesObjetoJSON);

    res.redirect('/');
  },

  editView: (req,res) => {
    let idActividad = Number(req.params.id);
    let actividadSeleccionada = actividades.find(actividadActual => actividadActual.id == idActividad);

    res.render('productEdit', {
      title: 'Editar Actividad',
      actividad: actividadSeleccionada
    });
  },

  editProduct: (req, res) => {
    let idSeleccionado = Number(req.params.id)

    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/actividades.json")))

    let actividadesRestantes = data.filter(e => e.id != idSeleccionado )
    let actividadAEditar = data.find(e => e.id == idSeleccionado )

    let imageActividadEditada;
    if(req.file == undefined){
      imageActividadEditada = actividadAEditar.image;
    }else{
      imageActividadEditada = '/images/'+ req.file.filename;
    }

    let actividadEditada = {
      id: idSeleccionado,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: imageActividadEditada,
      description: req.body.description,
      morningShift: req.body.morningShift,
      afternoonShift: req.body.afternoonShift,
      nightShift: req.body.nightShift
    }

    actividadesRestantes.push(actividadEditada)

    let actividadesRestantesJSON = JSON.stringify(actividadesRestantes, null, " ")

    fs.writeFileSync(path.join(__dirname, "../data/actividades.json"), actividadesRestantesJSON)

    res.redirect(`/producto/detalle/${actividadAEditar.id}`)
  },


  delete: (req, res) => {
    let idSeleccionado = Number(req.params.id)
    
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/actividades.json")))
    let eliminadas = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/actividadesBorradas.json")))

    let actividadesRestantes = data.filter(e => e.id !== idSeleccionado )
    let actividadEliminada = data.find(e => e.id == idSeleccionado )

    eliminadas.push(actividadEliminada)
    
    let actividadesRestantesJSON = JSON.stringify(actividadesRestantes, null, " ")
    let actividadEliminadaJSON = JSON.stringify(eliminadas, null, " ")

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

    let recuperarActividadJSON = JSON.stringify(data, null, " ")
    let actividadesBorradasRestantesJSON = JSON.stringify(actividadesBorradasRestantes, null, " ")

    fs.writeFileSync(path.join(__dirname, "../data/actividades.json"), recuperarActividadJSON)
    fs.writeFileSync(path.join(__dirname, "../data/actividadesBorradas.json"), actividadesBorradasRestantesJSON)

    res.redirect("/")
  }

}

module.exports = controller;