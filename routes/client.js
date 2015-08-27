// static variable declarations


// npm requires
var express = require('express');

// local requires
var clientController = require('../controllers/client');
var authController = require('../controllers/auth');

// variable declarations
var router = express.Router();

// callback function declarations


// function declarations


// main
router.route('/clients')
.post(authController.isAuthenticated, clientController.createClient)
.get(authController.isAuthenticated, clientController.getAllClients);

router.route('/clients/:client_id')
.get(authController.isAuthenticated, clientController.getOneClient)
.put(authController.isAuthenticated, clientController.updateClient)
.delete(authController.isAuthenticated, clientController.deleteClient);

module.exports = router;