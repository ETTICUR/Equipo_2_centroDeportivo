let actividades = require("../data/actividades.json")


let controller = {
    index: (req, res) => {
        
        
        res.render('index', {
            title: "Home",
            actividades,
            personaLogueada: req.session.usuarioLogueado,
            
            
            
        })
        
       
        
        
        
    }
    

}

module.exports = controller;