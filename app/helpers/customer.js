import Joi from '@hapi/joi'

validateCustomer = (inputInfo)=>{
	const schema = Joi.object().key({
		firstName:Joi.string().min(3).max(50).required(),
		lastName:Joi.string().min(3).max(50).required(),
		locattion:Joi.string().required(),
		email:Joi.string().email().required(),
		password:Joi.string().min(8).max(10).required(),
		contact:Joi.string().min(8).required(),
		creditCard:Joi.string()
	})
	return Joi.validate(inputInfo,schema);
}

validateLogin = (inputInfo) =>{
	const schema = Joi.object().key({
		email:Joi.string().email().required(),
		password:Joi.string().min(8).max(10).required(),
	});
	return Joi.validate(inputInfo, schema)
}

module.exports = {
	validateCustomer,
	validateLogin
}


