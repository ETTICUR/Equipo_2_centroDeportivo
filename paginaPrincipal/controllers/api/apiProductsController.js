const db = require('../../database/models');

const apiProductsControllers = {
    list: async (req, res) => {
        try {           
            let products = await db.productos.findAll();
    
            let aerobico = 0;
            let combinado = 0;
            let relax = 0;
            let fuerza = 0;
            let recuperacion = 0;
    
            products.forEach(product => {
                if(product.id_category === 1){
                    aerobico++
                }else if(product.id_category === 2){
                    combinado++
                }else if(product.id_category === 3){
                    relax++
                }else if(product.id_category === 4){
                    fuerza++
                }else{
                    recuperacion++
                }
            });
    
            let arrayCantCategoria = [
                {
                    Nombre: 'Aeróbico',
                    Cantidad: aerobico
                },
                {
                    Nombre: 'Combinado',
                    Cantidad: combinado
                },
                {
                    Nombre: 'Rélax',
                    Cantidad: relax
                },
                {
                    Nombre: 'Fuerza',
                    Cantidad: fuerza
                },
                {
                    Nombre: 'Recuperación',
                    Cantidad: recuperacion
                }
            ]
    
            let productDetalle = []
    
            products.forEach(producto => {
                productDetalle.push({
                    id: producto.id,
                    name: producto.name,
                    description: producto.description,
                    detail: `/api/products/${producto.id}`,
                    image: producto.image
                })
            });
    
    
            let response = {
                count: products.length,
                countByCategory: arrayCantCategoria,
                products: productDetalle
            };
    
            res.json(response)

        } catch (error) {
            console.log(error)
        }
    },

    detail: async (req,res) => {
        try {
            const id = Number(req.params.id);

            let producto = await db.productos.findByPk(id, {raw: true});
            let categoria = await db.productoCategoria.findByPk(producto.id_category, { raw:true });
            let turnoManana = await db.morningShift.findByPk(producto.id_morningShift, { raw:true });
            let turnoTarde = await db.afternoonShift.findByPk(producto.id_afternoonShift, { raw:true });
            let turnoNoche = await db.nigthShift.findByPk(producto.id_nigthShift, { raw:true });

            let response = {
                products: producto,
                category: categoria,
                morningShift: turnoManana,
                afternoonShift: turnoTarde,
                nigthShift: turnoNoche
            }

            res.json(response);

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = apiProductsControllers;