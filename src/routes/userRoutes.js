const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();

router.post('/users/create', userMiddleware.validatorCreate, userController.create);
router.post('/users/login', userMiddleware.validatorLogin, userController.login);

module.exports = router;