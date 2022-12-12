const db = require('../../database/models');
const Genero = require('../../database/models/Genero');

const apiUsersController = {
    list: async (req,res) => {
        try {
            let usuarios = await db.usuarios.findAll();
            let usuariosDetalle = [];
    
            usuarios.forEach(usuario => {
                usuariosDetalle.push({
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email,
                    detail: `/api/users/${usuario.id}`
                })
            })
    
            let response = {
                count: usuarios.length,
                users: usuariosDetalle
            }
            res.json(response);
            
        } catch (error) {
            console.log(error)
        }
    },

    detail: async (req,res) => {
        try {
            let id = req.params.id;
            let usuario = await db.usuarios.findByPk(id, { raw: true });
            let genre = await db.genero.findByPk(usuario.id_genero, {raw: true});

            let response = {
                id: usuario.id,
                nombre: usuario.nombre,
                apelido: usuario.apellido,
                id_genero: usuario.id_genero,
                edad: usuario.edad,
                email: usuario.email,
                imagen: `${usuario.fotoPerfil}`,
                genero: genre
            }
            res.json(response)
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = apiUsersController;