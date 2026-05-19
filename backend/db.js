const mysql = require("mysql2/promise");

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mysql1612",
    database: "todo_db"
});

module.exports = conexion;