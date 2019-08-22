require('express-async-error')
import error from '../middleware/errors'
import errors from './error'
import customers from '../routes/customers'
import books from '../routes/books'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

module.exports=(app)=> { 
	app.use(express.json())
	app.use(helmet()) 
	app.use(express.urlencoded({ extended : true}))
	app.use('/api/customers',customers)
	app.use('/api/books', books)
	app.use(morgan('tiny'))
	app.use(error)// error for the routes 
	app.use(errors) // uncaught errors
}