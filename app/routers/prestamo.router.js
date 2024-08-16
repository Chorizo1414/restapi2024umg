let express = require('express');
let router = express.Router();
 
const prestamos = require('../controllers/prestamo.controller.js');

router.post('/api/prestamos/create', prestamos.create);
router.get('/api/prestamos/:id', prestamos.getById);
router.put('/api/prestamos/update/:id', prestamos.updateById);
router.delete('/api/prestamos/delete/:id', prestamos.deleteById);

module.exports = router;
