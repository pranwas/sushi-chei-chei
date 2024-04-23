const express = require('express');

const { getAllOrder } = require('../controllers/order');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/').get(getAllOrder);

module.exports = router;