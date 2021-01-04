const util = require('util');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"root",
    port:3306,
    user:'root',
    password:'carenalga3221682',
    database:'employees'
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});
//setting up connection.query to use promises instead of callbacks to allow us use async/await syntax.

connection.query = util.promisify(connection.query);

module.exports = connection;