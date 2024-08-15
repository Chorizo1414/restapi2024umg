let express = require('express');
let router = express.Router();
 
const employees = require('../controllers/employee.controller.js');

router.post('/api/employees/create', employees.create);
//router.get('/api/employees/all', employees.retrieveAllEmployees);
//router.get('/api/employees/onebyid/:id', employees.getEmployeeById);
//router.get('/api/employees/filteringbyage', employees.filteringByAge);
//router.get('/api/employees/pagination', employees.pagination);
//router.get('/api/employees/pagefiltersort', employees.pagingfilteringsorting);
router.put('/api/employees/update/:id', employees.updateById);
router.delete('/api/employees/delete/:id', employees.deleteById);

module.exports = router;