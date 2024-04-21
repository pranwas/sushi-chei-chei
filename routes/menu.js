const express = require('express');

const { getMenu, createMenu, createTag, getMenuByCategory } = require('../controllers/menu');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getMenu).post(createMenu);
router.route('/:category').get(getMenuByCategory);
// router.route('/tags').post(createTag);
module.exports = router;