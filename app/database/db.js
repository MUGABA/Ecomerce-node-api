import pool from './conn'

pool.on('connect',()=>{
	console.log('connected to node_app database')
});


async function runQuery(q){
	await pool.query(q)
		.then((res)=>{
			console.log(res)
			pool.end()
		});
		.catch(err=>{
			console.log(err)
			pool.end()
		});
};
let queryText;
const createCustomersTable = () =>{
	queryText = `CREATE TABLE IF NOT EXISTS customers (
	id SERIAL PRIMARY KEY AUTOINCREMENT = TRUE,
	firstName VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	location VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	contact TEXT NOT NULL,
	creditCard TEXT 
	)`;
	runQuery(queryText);
};



const dropCustomersTable = () =>{
	runQuery('DROP TABLE IF EXISTS customers');
};

module.exports = {
	createCustomersTable,
	dropCustomersTable
}