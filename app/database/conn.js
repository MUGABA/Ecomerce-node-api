const mysql = require('mysql')

const conn = mysql.createConnection({
	host:'localhost',
	user:'rashid',
	password:'Rashid@123',
	database:'node_app'
});

conn.connect()

conn.on('error', function(err) {
  console.log("[mysql error]",err);
});

module.exports = conn
