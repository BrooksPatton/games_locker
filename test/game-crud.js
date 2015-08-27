// static variable declarations


// npm requires
var supertest = require('supertest');
var chai = require('chai');
var Chance = require('chance');
var _ = require('underscore');

// local requires


// variable declarations
var gameApi = supertest('localhost:3000/api/games');
var should = chai.should();
var game1;
var chance = new Chance();
var game2;
var user1;
var userApi = supertest('localhost:3000/api/users');

// callback function declarations
var game = function(){
	return {
		name: chance.name(),
		genre: chance.word(),
		vendor: chance.name(),
		platform: chance.word()
	}; 
};

var user = function(){
	return {
		username: chance.first(),
		password: chance.string()
	};
};

// function declarations


// main
chance.mixin({
	game: game,
	user: user
});

describe('Preparing for the game-crud tests by', function(){
	it('creating user1', function(done){
		user1 = chance.user();

		userApi.post('/')
		.send(user1)
		.expect(200, done);
	});
});

describe('Sending a POST to /api/games', function(){
	describe('should succeed', function(){
		it('in creating a game', function(done){
			var chanceGame = chance.game();
			
			gameApi.post('/')
			.auth(user1.username, user1.password)
			.send(chanceGame)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('Game added to the locker!');
				res.body.data.name.should.be.equal(chanceGame.name);
				res.body.data.genre.should.be.equal(chanceGame.genre);
				res.body.data.vendor.should.be.equal(chanceGame.vendor);
				res.body.data.platform.should.be.equal(chanceGame.platform);
				
				game1 = res.body.data;
				
				done();
			});
		});
		
		it('in creating a second game', function(done){
			var chanceGame = chance.game();
			
			gameApi.post('/')
			.auth(user1.username, user1.password)
			.send(chanceGame)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('Game added to the locker!');
				res.body.data.name.should.be.equal(chanceGame.name);
				res.body.data.genre.should.be.equal(chanceGame.genre);
				res.body.data.vendor.should.be.equal(chanceGame.vendor);
				res.body.data.platform.should.be.equal(chanceGame.platform);
				
				game2 = res.body.data;
				
				done();
			});
		});
	});
});

describe('Sending a GET to /api/games', function(){
	describe('should succeed', function(){
		it('in getting an array of all games', function(done){
			gameApi.get('/')
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.should.be.a('array');
				
				var game = _.findWhere(res.body, {name: game1.name});
				
				if(!game) return done(new Error('game not found'));
				
				game.name.should.be.equal(game1.name);
				game.genre.should.be.equal(game1.genre);
				game.vendor.should.be.equal(game1.vendor);
				game.platform.should.be.equal(game1.platform);
				
				done();
			});
		});
	});
});

describe('Sending a GET to /api/games/{game_id}', function(){
	describe('should succeed', function(){
		it('in gettin a single game', function(done){
			gameApi.get('/' + game1._id)
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				var game = res.body;
				
				if(!game) return done(new Error('game not found'));
				
				game.name.should.be.equal(game1.name);
				game.genre.should.be.equal(game1.genre);
				game.vendor.should.be.equal(game1.vendor);
				game.platform.should.be.equal(game1.platform);
				
				done();
			});
		});
	});
});

describe('Sending a PUT to /api/games/{game_id}', function(){
	describe('should succeed', function(){
		it('in updating a game', function(done){
			var update = _.clone(game1);
			
			update.name = chance.name();
			
			gameApi.put('/' + update._id)
			.auth(user1.username, user1.password)
			.send(update)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				var game = res.body;
				
				game.name.should.be.equal(update.name);
				game.name.should.not.be.equal(game1.name);
				game.genre.should.be.equal(update.genre);
				game.vendor.should.be.equal(update.vendor);
				game.platform.should.be.equal(update.platform);
				
				done();
			});
		});
	});
});

describe('Sending a DELETE to /api/games/{game_id}', function(){
	describe('should succeed', function(){
		it('in removing the game', function(done){
			gameApi.del('/' + game1._id)
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('Game has been removed from the locker!');
				
				done();
			});
		});
		
		it('in removing the second game', function(done){
			gameApi.del('/' + game2._id)
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('Game has been removed from the locker!');
				
				done();
			});
		});
	});
});