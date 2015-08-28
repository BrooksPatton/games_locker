// static variables


// npm requires
var express = require('express');

// local requires
var oauth2Controller = require('../controllers/oauth2');
var authController = require('../controllers/auth');

// variable declarations
var router = express.Router();

// callback function declarations


// function declarations


// main
router.route('/oauth2/authorize')
.get(authController.isAuthenticated, oauth2Controller.authorization)
.post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
.post(authController.isClientAuthenticated, oauth2Controller.token);

module.exports = router;