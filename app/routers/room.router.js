let express = require('express');
let router = express.Router();
 
const rooms = require('../controllers/room.controller.js');

router.post('/api/rooms/create', rooms.create);
//router.get('/api/employees/all', employees.retrieveAllEmployees);
//router.get('/api/employees/onebyid/:id', employees.getEmployeeById);
//router.get('/api/employees/filteringbyage', employees.filteringByAge);
//router.get('/api/employees/pagination', employees.pagination);
//router.get('/api/employees/pagefiltersort', employees.pagingfilteringsorting);
router.put('/api/rooms/update/:id', rooms.updateById);
router.delete('/api/rooms/delete/:id', rooms.deleteById);

module.exports = router;