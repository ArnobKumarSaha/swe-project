var express = require('express');
var router = express.Router();
const eventController = require('../controllers/events');
const jwtChecker = require('../utils/auth0Checker');


router.get('/:id', jwtChecker , eventController.getSingleEvent);

router.get('/', eventController.getAllEvents);



module.exports = router;
