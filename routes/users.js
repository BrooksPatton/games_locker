// static variables


// npm requires
var express = require('express');

// local requires
var userController = require('../controllers/users');
var authController = require('../controllers/auth');

// variable declarations
var router = express.Router();

// callback function declarations


// function declarations


// main
router.route('/users')
.post(userController.createUser)
.get(authController.isAuthenticated, userController.getAllUsers);

router.route('/users/:user_id')
.get(authController.isAuthenticated, userController.getOneUser)
.put(authController.isAuthenticated, userController.updateUser)
.delete(authController.isAuthenticated, userController.deleteUser);

module.exports = router;