require('express-async-error')
import express from 'express'
const router = express.Router()

import customerManager from '../contrallers/customer';


// route to register a customer
router.post('/',
	customerManager.createNewCustomer);
// route to login customer
router.post('/login', customerManager.signInCustomer);

router.get('/', customerManager.fetchAllCustomers);

router.delete('/:id', customerManager.deleteCustomer);

router.put('/:id', customerManager.updateCustomerInfo);

router.get('/:id', customerManager.fetchSpecificCustomer);




module.exports = router