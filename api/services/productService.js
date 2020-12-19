const pool = require('../../config/gestionDB')

module.exports = {

    /*--Obtiene la lista de todos los productos--*/
    getProducts: callback => {
            pool.query(
                `SELECT * FROM ProductsAll`,
                [],
                (error, results, fields) => {
                    if(error){
                        return callback(error)
                    }
                    return callback(null, results)
                }
            )
    },

    /*--Obtiene la informacion de un producto--*/
    getProductsByProductId: (id, callback) => {
        pool.query(
            `SELECT jam_platillo.Id_platillo AS Codigo,jam_platillo.Platillo AS Nombre_Producto,
                    jam_platillo.Descripcion AS Descripcion, jam_platillo.Precio AS Precio,
                    jam_platillo.Imagen AS Imagen, jam_tienda.Razon_social_nombre_tienda AS Tienda
             FROM jam_platillo
             INNER JOIN jam_tienda
             ON jam_platillo.Id_tienda = jam_tienda.Id_tienda
             WHERE jam_platillo.Id_platillo = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    /*--Obtiene la descripcion de todos los productos--*/
    getProductsDescriptions: callback => {
        pool.query(
            `SELECT * FROM ProductsDescriptions`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    create: (data, callback) => {
        pool.query(
            `insert into prueba(nombre) values(?)`,
            [
                data.nombre
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    /*--Muestra los productos agrupados por tienda--*/
    getProductsPerStore: callback => {
            pool.query(
                `SELECT * FROM ProductsPerStore`,
                [],
                (error, results, fields) => {
                    if(error){
                        return callback(error)
                    }
                    return callback(null, results)
                }
            )
    }

}