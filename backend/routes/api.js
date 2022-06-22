const express = require('express');
const router = express.Router();
const hoodieController = require('../controllers/hoodie-controller');

router.get(hoodieController.showAllHoodie);

module.exports = router;