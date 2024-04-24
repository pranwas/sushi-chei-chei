const express = require('express');

const { getAllOrder, submitNewOrder, changeOrderStatus, getAllOrderByTableNumber, closeOrderByTableNumber } = require('../controllers/order');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/').get(getAllOrder).post(submitNewOrder);
router.route('/:id').put(changeOrderStatus);
router.route('/:table').get(getAllOrderByTableNumber);
router.route('/closeOrder/:table').post(closeOrderByTableNumber);

module.exports = router;