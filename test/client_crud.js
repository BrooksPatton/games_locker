// static variable declarations


// npm requires
var supertest = require('supertest');
var chai = require('chai');
var Chance = require('chance');
var _ = require('underscore');

// local requires


// variable declarations
var clientApi = supertest('localhost:3000/api/clients');
var should = chai.should();
var client1;
var chance = new Chance();
var user1;
var userApi = supertest('localhost:3000/api/users');

// callback function declarations
var client = function(){
	return {
		name: chance.name()
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
	client: client,
	user: user
});

describe('Preparing for the Client-crud tests by', function(){
	it('creating user1', function(done){
		user1 = chance.user();

		userApi.post('/')
		.send(user1)
		.expect(200)
		.end(function(err, res){
			if(err) return done(err);

			user1._id = res.body.data._id;

			done();
		});
	});
});

describe('Sending a POST to /api/clients', function(){
	describe('should succeed', function(){
		it('in creating a client', function(done){
			var chanceClient = chance.client();
			
			clientApi.post('/')
			.auth(user1.username, user1.password)
			.send(chanceClient)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('Client added to the locker!');
				res.body.data.name.should.be.equal(chanceClient.name);
				res.body.data.id.should.be.a('string');
				res.body.data.secret.should.be.a('string');
				res.body.data.userId.should.be.equal(user1._id);
				
				client1 = res.body.data;
				
				done();
			});
		});
	});
});

describe('Sending a GET to /api/Clients', function(){
	describe('should succeed', function(){
		it('in getting an array of all Clients', function(done){
			clientApi.get('/')
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.should.be.a('array');
				
				var client = _.findWhere(res.body, {name: client1.name});
				
				if(!client) return done(new Error('Client not found'));
				
				client.name.should.be.equal(client1.name);
				client.id.should.be.equal(client1.id);
				client.secret.should.be.equal(client1.secret);
				client.userId.should.be.equal(user1._id);
				
				done();
			});
		});
	});
});

describe('Sending a GET to /api/clients/{client_id}', function(){
	describe('should succeed', function(){
		it('in gettin a single client', function(done){
			clientApi.get('/' + client1._id)
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				var client = res.body;
				
				if(!client) return done(new Error('client not found'));
				
				client.name.should.be.equal(client1.name);
				client.id.should.be.equal(client1.id);
				client.secret.should.be.equal(client1.secret);
				client.userId.should.be.equal(user1._id);
				
				done();
			});
		});
	});
});

describe('Sending a PUT to /api/clients/{client_id}', function(){
	describe('should succeed', function(){
		it('in updating a client', function(done){
			var update = _.clone(client1);
			
			update.name = chance.name();
			
			clientApi.put('/' + update._id)
			.auth(user1.username, user1.password)
			.send(update)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				var client = res.body.data;
				
				client.name.should.be.equal(update.name);
				client.name.should.not.be.equal(client1.name);
				client.id.should.be.equal(update.id);
				client.secret.should.be.equal(update.secret);
				client.userId.should.be.equal(user1._id);

				client1 = res.body.data;
				
				done();
			});
		});
	});
});

describe('Sending a DELETE to /api/clients/{client_id}', function(){
	describe('should succeed', function(){
		it('in removing the client', function(done){
			clientApi.del('/' + client1._id)
			.auth(user1.username, user1.password)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				
				res.body.message.should.be.equal('Client deleted from locker!');
				
				done();
			});
		});
	});
});

describe('Cleaning up after the client crud tests by', function(){
	it('removing user1', function(done){
		userApi.del('/' + user1._id)
		.auth(user1.username, user1.password)
		.expect(200, done);
	});
});