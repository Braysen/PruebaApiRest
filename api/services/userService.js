const pool = require('../../config/gestionDB')

module.exports = {
    create: (data, callback) => {
            pool.query(
                `insert into users(userName, email, password) values(?, ?, ?)`,
                [
                    data.userName,
                    data.email,
                    data.password
                ],
                (error, results, fields) => {
                    if(error){
                        return callback(error)
                    }
                    return callback(null, results)
                }
            )
    },

    getUsers: callback => {
            pool.query(
                `SELECT  jam_usuario_cliente.Id_usuario_cliente AS Codigo, jam_usuario_cliente.Nombre AS Nombre,
                jam_usuario_cliente.Apellido_paterno AS Paterno, jam_usuario_cliente.Apellido_materno AS Materno,
                jam_usuario_cliente.DNI AS Dni, jam_usuario_cliente.Correo AS Correo, jam_usuario_cliente.Telefono AS Telefono,
                jam_usuario_cliente.Genero AS Genero, jam_usuario_cliente.Fecha_registro AS FechaRegistro
            FROM jam_usuario_cliente`,
                [],
                (error, results, fields) => {
                    if(error){
                        return callback(error)
                    }
                    return callback(null, results)
                }
            )
    },

    getUserByUserId: (id, callback) => {
        pool.query(
            `SELECT  jam_usuario_cliente.Id_usuario_cliente AS Codigo, jam_usuario_cliente.Nombre AS Nombre,
            jam_usuario_cliente.Apellido_paterno AS Paterno, jam_usuario_cliente.Apellido_materno AS Materno,
            jam_usuario_cliente.DNI AS Dni, jam_usuario_cliente.Correo AS Correo, jam_usuario_cliente.Telefono AS Telefono,
            jam_usuario_cliente.Genero AS Genero
        FROM jam_usuario_cliente WHERE jam_usuario_cliente.Id_usuario_cliente = ?`,
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

    updateUser: (data,id, callback) => {
        pool.query(
            `UPDATE jam_usuario_cliente SET Nombre = ?, Apellido_paterno = ?, Apellido_materno = ?, DNI = ?, Correo = ?, Telefono = ?, Genero = ? WHERE Id_usuario_cliente = ?`,
            [
                data.Nombre,
                data.Paterno,
                data.Materno,
                data.Dni,
                data.Correo,
                data.Telefono,
                data.Genero,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    deleteUser: (data, callback) => {
        pool.query(
            `delete from users where id = ?`,
            [
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    getUserByUserEmail: (email, callback) => {
        pool.query(
            `select * from users where email = ?`,
            [
                email
            ],
            (error, results, fields) => {
                if(error){
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    }
}
