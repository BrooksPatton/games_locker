// static variable definitions


// npm requires


// local requires
var Game = require('../models/games');

// variable declarations


// callback function declarations


// function declarations
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

var getAllGames = function(req, res){
	Game.find(function(err, games){
		if(err) return res.send(err);
		
		res.json(games);
	});
};

var getOneGame = function(req, res){
	Game.findById(req.params.game_id, function(err, game){
		if(err) return res.send(err);
		
		res.json(game);
	});
};

var updateGame = function(req, res){
	Game.findById(req.params.game_id, function(err, game){
		if(err) return res.send(err);
		
		game.name = req.body.name;
		game.genre = req.body.genre;
		game.vendor = req.body.vendor;
		game.platform = req.body.platform;
		
		game.save(function(err, game){
			if(err) return res.send(err);
			
			res.json(game);
		});
	});
};

var deleteGame = function(req, res){
	Game.findByIdAndRemove(req.params.game_id, function(err){
		if(err) return res.send(err);
		
		res.json({message: 'Game has been removed from the locker!'});
	});
};

// main
module.exports = {
	createGame: createGame,
	getAllGames: getAllGames,
	getOneGame: getOneGame,
	updateGame: updateGame,
	deleteGame: deleteGame
};