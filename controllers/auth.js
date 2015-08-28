// static variable declarations


// npm requires
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

// local requires
var User = require('../models/user');
var Client = require('../models/client');

// variable declarations


// callback function declarations


// function declarations


// main
passport.use(new BasicStrategy(
	function(username, password, callback){
		User.findOne({username: username}, function(err, user){
			if(err) return callback(err);

			if(!user) return callback(null, false);

			user.verifyPassword(password, function(err, isMatch){
				if(err) return callback(err);

				if(!isMatch) return callback(null, false);

				callback(null, user);
			});
		});
	}));
	
passport.use('client-basic', new BasicStrategy(function(username, password, callback){
	Client.findOne({id: username}, function(err, client){
		if(err) return callback(err);
		
		if(!client) return callback(null, false);
		
		if(client.secret !== password) return callback(null, false);
		
		callback(null, client);
	});
}));

exports.isAuthenticated = passport.authenticate('basic', {session: false});