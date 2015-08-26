// static variables


// npm requires
var supertest = require('supertest');
var chai = require('chai');
var _ = require('underscore');

// local requires


// variable declarations
var should = chai.should();
var userApi = supertest('localhost:3000/api/users');
var user1;

// callback function declarations


// function declarations


// main
describe('Sending a POST to /api/users', function(){
	describe('should succeed', function(){
		it('in creating a new user', function(done){
			userApi.post('/')
			.send({
				username: 'brooks',
				password: 'a'
			})
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('New user added!');
				res.body.data.username.should.be.equal('brooks');
				res.body.data.password.should.be.equal('<sanitized>');
				
				user1 = res.body.data;
				
				done();
			});
		});
	});
});

describe('Sending a GET to /api/users', function(){
	describe('should succeed', function(){
		it('in getting all users', function(done){
			userApi.get('/')
			.expect(200)
			.end(function(err, res){
				var user;
				
				if(err) return done(err);
				
				res.body.should.be.a('array');
				
				user = res.body[0];
				
				user._id.should.be.equal(user1._id);
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
			.expect(200)
			.end(function(err, res){
				var user = res.body;
				
				if(err) return done(err);
				if(!user) return done(new Error('user not found'));
				
				user._id.should.be.equal(user1._id);
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
			var user = _.clone(user1);
			
			user.password = 'newPassword';
			
			userApi.put('/' + user._id)
			.send(user)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('user updated!');
				res.body.data._id.should.be.equal(user1._id);
				res.body.data.username.should.be.equal(user1.username);
				res.body.data.password.should.be.equal('<sanitized>');
				
				user1 = res.body.data;
				
				done();
			});
		});
	});
});

describe('Sending a DELETE to /api/users/{user_id}', function(){
	describe('should succeed', function(){
		it('in deleting a user', function(done){						
			userApi.del('/' + user1._id)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('user deleted!');
				
				done();
			});
		});
	});
});