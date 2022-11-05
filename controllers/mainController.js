const db = require('../database/models');

let controller = {
    index: async (req, res) => {

        try {
            const actividades = await db.productos.findAll({raw:true});

            res.render('index', {
                title: "Home",
                actividades: await actividades,
                personaLogueada: req.session.usuarioLogueado,   
            })
        }

        catch (error){
            console.log(error)
        }
            
    }
}

module.exports = controller;