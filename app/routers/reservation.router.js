let express = require('express');
let router = express.Router();
 
const reservations = require('../controllers/reservation.controller.js');

router.post('/api/reservations/create', reservations.create);
//router.get('/api/reservations/all', reservations.retrieveAllReservations);
//router.get('/api/reservations/onebyid/:id', reservations.getEmployeeById);
//router.get('/api/reservations/filteringbyage', reservations.filteringByAge);
//router.get('/api/reservations/pagination', reservations.pagination);
//router.get('/api/reservations/pagefiltersort', reservations.pagingfilteringsorting);
router.put('/api/reservations/update/:id', reservations.updateById);
router.delete('/api/reservations/delete/:id', reservations.deleteById);

module.exports = router;