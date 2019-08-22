import  conn from './conn'

async function runQuery(queryText){
	await conn.query(queryText)
		.then(res=>{
			console.log(res);
		})
		.catch(err =>{
			console.error(err);
		});
};


const customersTable =()=>{
	const textQuery= `CREATE TABLE IF NOT EXISTS customers (
	id SERIAL PRIMARY KEY NOT NULL,
	firstName VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	location VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	contact TEXT NOT NULL,
	creditCard TEXT 
	)`;
	runQuery(textQuery)

};
const booksTable =()=>{
	const textQuery= `CREATE TABLE IF NOT EXISTS books (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(50) NOT NULL,
	authorId INT NOT NULL,
	type VARCHAR(100) NOT NULL,
	isbnCode VARCHAR(100) UNIQUE NOT NULL,
	numberInStock TEXT NOT NULL
	)`;
	runQuery(textQuery)

};

const dropCustomersTable= ()=>{
	runQuery('DROP TABLE IF EXISTS customers')
}
const dropbooksTable= ()=>{
	runQuery('DROP TABLE IF EXISTS books')
}



module.exports = {
	customersTable,
	booksTable,
	dropCustomersTable,
	dropbooksTable
}

require('make-runnable')