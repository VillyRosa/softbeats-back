const express = require('express');
const saleController = require('../controllers/salesController');
const saleMiddleware = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/sales/:userid', saleMiddleware.ValidatorUserid, saleController.selectAllController);
router.post('/sales', saleMiddleware.validatorCreate, saleController.createController);
router.delete('/sales/:id', saleMiddleware.ValidatorSaleId, saleController.deleteController);
router.patch('/sales', saleMiddleware.validatorEdit, saleController.editController);

module.exports = router;