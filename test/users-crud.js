// static variables


// npm requires
var supertest = require('supertest');
var chai = require('chai');
var _ = require('underscore');
var Chance = require('chance');

// local requires


// variable declarations
var should = chai.should();
var userApi = supertest('localhost:3000/api/users');
var user1;
var chance = new Chance();

// callback function declarations
var user = function(){
	return {
		username: chance.first(),
		password: chance.string()
	};
};

// function declarations


// main
chance.mixin({
	user: user
});

describe('Sending a POST to /api/users', function(){
	describe('should succeed', function(){
		it('in creating a new user', function(done){
			user1 = chance.user();

			userApi.post('/')
			.send(user1)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);

				res.body.message.should.be.equal('New user added!');
				res.body.data.username.should.be.equal(user1.username);
				res.body.data.password.should.be.equal('<sanitized>');

				user1._id = res.body.data._id;
				
				done();
			});
		});
	});
});

describe('Sending a GET to /api/users', function(){
	describe('should succeed', function(){
		it('in getting all users', function(done){
			userApi.get('/')
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				var user;
				
				if(err) return done(err);
				
				res.body.should.be.a('array');
				
				user = _.findWhere(res.body, {username: user1.username});
				
				user._id.should.be.a('string');
				user.username.should.be.equal(user1.username);
				user.password.should.be.equal('<sanitized>');
				
				done();
			});
		});
	});
});

describe('Sending a GET to /api/users/{user_id}', function(){
	describe('should succeed', function(){
		it('in getting one user', function(done){
			userApi.get('/' + user1._id)
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				var user = res.body;
				
				if(err) return done(err);
				if(!user) return done(new Error('user not found'));
				
				user._id.should.be.a('string');
				user.username.should.be.equal(user1.username);
				user.password.should.be.equal('<sanitized>');
				
				done();
			});
		});
	});
});

describe('Sending a PUT to /api/users/{user_id}', function(){
	describe('should succeed', function(){
		it('in updating a user', function(done){
			var oldUsername = user1.username;

			user1.username = chance.first();
			
			userApi.put('/' + user1._id)
			.auth(oldUsername, user1.password)
			.send(user1)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('user updated!');
				res.body.data._id.should.be.a('string');
				res.body.data.username.should.be.equal(user1.username);
				res.body.data.password.should.be.equal('<sanitized>');
				
				done();
			});
		});
	});
});

describe('Sending a DELETE to /api/users/{user_id}', function(){
	describe('should succeed', function(){
		it('in deleting a user', function(done){						
			userApi.del('/' + user1._id)
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('user deleted!');
				
				done();
			});
		});
	});
});