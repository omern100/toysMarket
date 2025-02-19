const express = require('express');
const router = express.Router();
const toyController = require('../controllers/toyController');
const auth = require('../middlewares/auth');

router.get('/', toyController.getAllToys);
router.get('/search', toyController.searchToys);
router.get('/category/:catname', toyController.getToysByCategory);
router.get('/prices', toyController.getToysByPriceRange); 
router.get('/single/:id', toyController.getSingleToy); 
router.get('/count', toyController.getToysCount); 

router.use(auth); 

router.post('/', toyController.createToy); 
router.put('/:id', toyController.updateToy); 
router.delete('/:id', toyController.deleteToy); 

module.exports = router;