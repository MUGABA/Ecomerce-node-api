require('express-async-error')
const _ = require('lodash')
import CustomerModel from '../database/customerQueries'
import validate from '../helpers/customer'



const createNewCustomer = async (req,res) =>{

	
	const customer = 
		_.pick(req.body,['firstName','lastName',
			'location','email','password','contact','creditCard']);

	const {error} = validate.validateCustomer(customer);
	if(error)return res.status(400).send({message:error.details[0].message});

	const results = await CustomerModel.checkCustomer(customer.email);
	if(results.length ===1)
		return res.status(409).send({
			status:res.statusCode,
			message:'Customer already exists try! Login'
		});
	const data = await CustomerModel.addCustomer(customer);
	return res.status(201).send({
		status:res.statusCode,
		message:'Account created successfully',
		info:data
	})

};

const signInCustomer = async (req, res) =>{

	const loginInfo = _.pick(req.body, ['email','password']);

	const {error} = validate.validateLogin(loginInfo);
	if(error)return res.status(400).send({message:error.details[0].message});

	const checkCustomer = await CustomerModel.loginCustomer(loginInfo.email, loginInfo.password);
	try{
		if(checkCustomer)
		return res.status(200).send({
				status:res.statusCode,
				message:'You successfully logged in!'
			});
	}
	catch{
		return res.status(400).send({
			status:res.statusCode,
			message:'Wrong Email or Password'
		});
	}
}

const fetchAllCustomers = async (req,res)=>{
	const getAll = await CustomerModel.getAllCustomers()
	if(getAll)
		return res.status(200).send({
			status:res.status,
			data:getAll
		})
}

const deleteCustomer = async (req,res) =>{
	const customer = await CustomerModel.getSpecificCustomer(parseInt(req.params.id));
	if(customer.length===0)
		return res.status(404).send({
			status:res.statusCode,
			message:'Customer your lokking for is not registered yet'
		})
	await CustomerModel.removeCustomer(parseInt(req.params.id));
	return res.status(200).send({
		status:res.statusCode,
		message:'You successfully deleted your account'
	})

}

const updateCustomerInfo = async (req,res) =>{
	const customerId = req.params.id;
	const inputInfo = _.pick(req.body,['contact', 'creditCard']);

	const checkCustomer = await CustomerModel.getSpecificCustomer(req.params.id);
	if(checkCustomer.length===0)return res.status(404).send({
			status:res.statusCode,
			message:'Customer of that id is not available'
		})

	const {error} = validate.validateUpdate(inputInfo);
	if(error)
		return res.status(400).send({message:error.details[0].message});

	const updateInfo = await CustomerModel
		.updateCustomer(inputInfo.contact, inputInfo.creditCard, customerId);
	if(!updateInfo)return res.status(404).send({
		status:res.statusCode,
		message:'The rows you try to update do not exist'
	})
	return res.status(200).send({
		status:res.statusCode,
		message:'You succcessfully updated the contact and the creditCard info'
	})
}
const fetchSpecificCustomer = async (req,res) =>{
	const customer = await CustomerModel.getSpecificCustomer(parseInt(req.params.id));
	if(customer.length===0)
		return res.status(404).send({
			status:res.statusCode,
			message:'Customer your lokking for is not registered yet'
		})
	return res.status(200).send({
		status:res.statusCode,
		message:'The customer your looking for is...',
		data: customer
	});

}




	


module.exports ={
	createNewCustomer,
	signInCustomer,
	fetchAllCustomers,
	deleteCustomer,
	updateCustomerInfo,
	fetchSpecificCustomer
}




