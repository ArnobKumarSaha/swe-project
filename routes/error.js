var express = require('express');
var router = express.Router();

const errorController = require('../controllers/error');
router.get('*', errorController.get404);

module.exports = router;