var mysql = require('mysql');
module.exports.connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "dev", //Your username
    password: "^312ag420QbG", //Your password
    database: "Bamazon",
    debug: false
});