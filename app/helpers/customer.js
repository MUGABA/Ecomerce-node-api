import Joi from '@hapi/joi'

const validateCustomer = (inputInfo)=>{
	const schema = Joi.object().keys({
		firstName:Joi.string().min(3).max(50).required(),
		lastName:Joi.string().min(3).max(50).required(),
		location:Joi.string().required(),
		email:Joi.string().email().required(),
		password:Joi.string().min(8).max(10).required(),
		contact:Joi.string().min(8).required(),
		creditCard:Joi.string()
	})
	return Joi.validate(inputInfo,schema);
}

const validateLogin = (inputInfo) =>{
	const schema = Joi.object().keys({
		email:Joi.string().email().required(),
		password:Joi.string().min(8).max(10).required(),
	});
	return Joi.validate(inputInfo, schema)
}

const validateUpdate = (inputInfo) =>{
	const schema = Joi.object().keys({
		contact:Joi.string().required(),
		creditCard:Joi.string().min(8).required()
	})
	return Joi.validate(inputInfo,schema);
}

module.exports = {
	validateCustomer,
	validateLogin,
	validateUpdate
}


