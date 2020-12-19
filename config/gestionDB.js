const mysql = require("mysql")
require("dotenv").config()

const pool = mysql.createConnection({
    port: process.env.PORT_DB,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10
})

pool.connect(function (err){
    if(err){
        console.log("ERROR: No se puede acceder a la base de datos !!!");
    }else{
        console.log("DataBase connect");
    }
})

module.exports = pool