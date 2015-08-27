// static variable declarations


// npm requires
var express = require('express');

// local requires
var gamesController = require('../controllers/games');
var authController = require('../controllers/auth');

// variable declarations
var router = express.Router();

// callback function declarations


// function declarations


// main
router.route('/games')
.post(authController.isAuthenticated, gamesController.createGame)
.get(authController.isAuthenticated, gamesController.getAllGames);

router.route('/games/:game_id')
.get(authController.isAuthenticated, gamesController.getOneGame)
.put(authController.isAuthenticated, gamesController.updateGame)
.delete(authController.isAuthenticated, gamesController.deleteGame);

module.exports = router;