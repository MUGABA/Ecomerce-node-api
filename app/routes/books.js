import express from 'express'
const router = express.Router()

import bookManager from '../contrallers/book'
// registeing books
router.post('/',bookManager.createNewBook);
// getting all books
router.get('/', bookManager.fetchAllBooks);
// getting a perticular book
router.get('/:id', bookManager.fetchSpecificBook);

router.delete('/:id', bookManager.deleteBook);

module.exports = router