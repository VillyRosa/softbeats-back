const express = require('express');
const clientController = require('../controllers/clientController');
const clientMiddleware = require('../middlewares/clientMiddleware');

const router = express.Router();

router.get('/clients', clientMiddleware.ValidatorUserid, clientController.selectAllController);
router.post('/clients', clientMiddleware.validatorCreate, clientController.createController);

module.exports = router;