const express = require('express');
const clientController = require('../controllers/clientController');
const clientMiddleware = require('../middlewares/clientMiddleware');

const router = express.Router();

router.get('/clients/:userid', clientMiddleware.ValidatorUserid, clientController.selectAllController);
router.post('/clients', clientMiddleware.validatorCreate, clientController.createController);
router.delete('/clients/:id', clientMiddleware.ValidatorClientId, clientController.deleteController);
router.patch('/clients', clientMiddleware.validatorEdit, clientController.editController);

module.exports = router;