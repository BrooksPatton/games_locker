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
	game.userId = req.user._id;
	
	game.save(function(err, game){
		if(err) return res.send(err);
		
		res.json({
			message: 'Game added to the locker!',
			data: game 
		});
	});
};

var getAllGames = function(req, res){
	Game.find({userId: req.user._id}, function(err, games){
		if(err) return res.send(err);
		
		res.json(games);
	});
};

var getOneGame = function(req, res){
	Game.findOne({
		_id: req.params.game_id,
		userId: req.user._id
	}, function(err, game){
		if(err) return res.send(err);
		
		res.json(game);
	});
};

var updateGame = function(req, res){
	Game.findOne({
		_id: req.params.game_id,
		userId: req.user._id
	}, function(err, game){
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
	Game.remove({
		_id: req.params.game_id,
		userId: req.user._id
	}, function(err){
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