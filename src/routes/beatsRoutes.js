const express = require('express');
const beatController = require('../controllers/beatsController');
const beatMiddleware = require('../middlewares/beatsMiddleware');

const router = express.Router();

router.get('/beats/:userid', beatMiddleware.ValidatorUserid, beatController.selectAllController);
// router.get('/beats/:userid/:beatid', beatMiddleware.ValidatorUserid, beatController.selectAllController);
// router.post('/beats', beatMiddleware.validatorCreate, beatController.createController);
// router.delete('/beats/:id', beatMiddleware.ValidatorCategoryId, beatController.deleteController);
// router.patch('/beats', beatMiddleware.validatorEdit, beatController.editController);

module.exports = router;