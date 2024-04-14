const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: "3307",
    database: 'banhang',
    password: 'baodeptrai199',
    connectionLimit: 10,
});

module.exports = pool;