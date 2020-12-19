const pool = require('../../config/gestionDB')

module.exports = {

    /*--Obtiene los puntos de entrega por propietario de producto--*/
    getDeliveryPointsPerProduct: (ownerName, callback) => {
        pool.query(
            `SELECT jam_sedes.Id_sedes AS CodigoSede, jam_tienda.Propietario AS Empresa,
                    jam_sedes.Latitud AS Latitud, jam_sedes.Longitud AS Longitud
             FROM jam_tienda
             INNER JOIN jam_sedes
             ON jam_tienda.Id_tienda = jam_sedes.Id_tienda
             WHERE jam_tienda.Propietario = ? AND jam_sedes.Estado = 1;`,
            [
                ownerName
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    }

}