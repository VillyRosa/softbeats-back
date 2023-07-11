const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const dashboardMiddleware = require('../middlewares/dashboardMiddleware');

const router = express.Router();

router.get('/dashboard/:userid', dashboardMiddleware.ValidatorUserid, dashboardController.select);

module.exports = router;