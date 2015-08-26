// static variables


// npm requires
var express = require('express');

// local requires
var userController = require('../controllers/users');

// variable declarations
var router = express.Router();

// callback function declarations


// function declarations


// main
router.route('/users')
.post(userController.createUser)
.get(userController.getAllUsers);

router.route('/users/:user_id')
.get(userController.getOneUser)
.put(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;