const sql = require("mysql");

let connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

module.exports = connection