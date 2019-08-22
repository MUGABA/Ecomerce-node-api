import _ from 'lodash'
import BookModel from '../database/bookQueries'
import validate from '../helpers/book'

const createNewBook = async (req,res) =>{
	const book = 
		_.pick(req.body,['name','authorId',
			'type','isbnCode','numberInStock']);

	const {error} = validate.validateBook(book);
	if(error)return res.status(400).send({message:error.details[0].message});

	const results = await BookModel.checkBook(book.isbnCode);
	if(results.length ===1)
		return res.status(409).send({
			status:res.statusCode,
			message:'Book already exists try! Login'
		});
	const data = await BookModel.addBook(book);
	return res.status(201).send({
		status:res.statusCode,
		message:'book registered successfully',
		info:data
	})
};
const fetchSpecificBook = async (req,res) =>{
	const book = await BookModel.getSpecificBook(parseInt(req.params.id));
	if(book.length===0)
		return res.status(404).send({
			status:res.statusCode,
			message:'The book your looking for is not registered yet'
		})
	return res.status(200).send({
		status:res.statusCode,
		message:'The customer your looking for is...',
		data: book
	});

}
const fetchAllBooks = async (req,res)=>{
	const getAll = await BookModel.getAllBooks()
	if(getAll)
		return res.status(200).send({
			status:res.status,
			data:getAll
		})
	return res.status(404).send({
		status:res.statusCode,
		message:'No Books registered yet'
	})
}
const deleteBook = async (req,res) =>{
	const book = await BookModel.getSpecificBook(parseInt(req.params.id));
	if(book.length===0)
		return res.status(404).send({
			status:res.statusCode,
			message:'book your lokking for is not registered yet'
		})
	await BookModel.removeBook(parseInt(req.params.id));
	return res.status(200).send({
		status:res.statusCode,
		message:'You successfully deleted your this book'
	})

}



module.exports ={
	createNewBook,
	fetchAllBooks,
	fetchSpecificBook,
	deleteBook
}