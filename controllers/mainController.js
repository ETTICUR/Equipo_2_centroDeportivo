const { render } = require('ejs');
const path = require('path');

let controller = {
    index: (req, res) => {
        res.render('index');
    }
}

module.exports = controller;