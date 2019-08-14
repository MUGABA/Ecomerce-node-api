var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'matt',
    password: 'password',
    database: 'my_database'
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
module.exports = pool

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'matt',
    password: 'password',
    database: 'my_database'
})

pool.query('SELECT * FROM users', function (err, result, fields) {
    if (err) throw new Error(err)
})

mysql -u root