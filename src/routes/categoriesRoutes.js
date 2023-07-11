const express = require('express');
const categoryController = require('../controllers/categoriesController');
const categoryMiddleware = require('../middlewares/categoriesMiddleware');

const router = express.Router();

router.get('/categories/:userid', categoryMiddleware.ValidatorUserid, categoryController.selectAllController);
router.post('/categories', categoryMiddleware.validatorCreate, categoryController.createController);
router.delete('/categories/:id', categoryMiddleware.ValidatorCategoryId, categoryController.deleteController);
router.patch('/categories', categoryMiddleware.validatorEdit, categoryController.editController);

module.exports = router;