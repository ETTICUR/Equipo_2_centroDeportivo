let actividades = require("../actividades.json")


let controller = {
    index: (req, res) => {
        res.render('index', {
            title: "Home",
            actividades
        })
    }
}

module.exports = controller;