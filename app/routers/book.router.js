let express = require('express');
let router = express.Router();
 
const books = require('../controllers/book.controller.js');

router.post('/api/books/create', books.create);
//router.get('/api/books/all', books.retrieveAllEmployees);
//router.get('/api/books/onebyid/:id', books.getEmployeeById);
//router.get('/api/books/filteringbyage', books.filteringByAge);
//router.get('/api/books/pagination', books.pagination);
//router.get('/api/books/pagefiltersort', books.pagingfilteringsorting);
router.put('/api/books/update/:id', books.updateById);
router.delete('/api/books/delete/:id', books.deleteById);

module.exports = router;