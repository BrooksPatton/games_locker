// Static variable declarations
var PORT = process.env.PORT || 3000;

// npm requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// local requires
var Game = require('./models/games');

// variable declarations
var app = express();
var router = express.Router();
var gamesRoute = router.route('/games');

// callback function declarations
var indexRoute = function(req, res){
	res.json({
		message: 'You are running dangerously low on games to play!'
	});
};

var createGame = function(req, res){
	var game = new Game();
	
	game.name = req.body.name;
	game.genre = req.body.genre;
	game.vendor = req.body.vendor;
	game.platform = req.body.platform;
	
	game.save(function(err, game){
		if(err) return res.send(err);
		
		res.json({
			message: 'Game added to the locker!',
			data: game 
		});
	});
};

// function declarations


// main
mongoose.connect('mongodb://localhost:27017/games_locker');

app.use(bodyParser.urlencoded({
	extended: true
}));

router.get('/', indexRoute);

gamesRoute.post(createGame);

app.use('/api', router);

app.listen(PORT);
console.log('Insert game on port ' + PORT);