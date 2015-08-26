// static variable declarations


// npm requires
var express = require('express');

// local requires
var gamesController = require('../controllers/games');

// variable declarations
var router = express.Router();

// callback function declarations


// function declarations


// main
router.route('/games')
.post(gamesController.createGame)
.get(gamesController.getAllGames);

router.route('/games/:game_id')
.get(gamesController.getOneGame)
.put(gamesController.updateGame)
.delete(gamesController.deleteGame);

module.exports = router;