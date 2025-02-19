const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/', userController.register); 
router.post('/login', userController.login); 

router.use(auth); 

router.get('/', userController.getAllUsers);

module.exports = router;