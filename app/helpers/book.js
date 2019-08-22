import Joi from '@hapi/joi'


const validateBook  = (inputData)  =>{
    const schema  = Joi.object().keys({
        name:Joi.string().min(2).max(50).required(),
        authorId:Joi.number().required(),
        type:Joi.string().min(3).max(25),
        isbnCode:Joi.string().min(3).max(25).required(),
        numberInStock:Joi.number().required()
    });
    return Joi.validate(inputData, schema)
}




module.exports  = {
    validateBook
}
