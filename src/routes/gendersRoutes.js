const express = require('express');
const genderController = require('../controllers/gendersController');
const genderMiddleware = require('../middlewares/gendersMiddleware');

const router = express.Router();

router.get('/genders/:userid', genderMiddleware.ValidatorUserid, genderController.selectAllController);
router.post('/genders', genderMiddleware.validatorCreate, genderController.createController);
router.delete('/genders/:id', genderMiddleware.ValidatorGenderId, genderController.deleteController);
router.patch('/genders', genderMiddleware.validatorEdit, genderController.editController);

module.exports = router;