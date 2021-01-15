const util = require('util');

const mysql = require('mysql');
require("dotenv").config();

const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});
//setting up connection.query to use promises instead of callbacks to allow us use async/await syntax.

connection.query = util.promisify(connection.query);

module.exports = connection;