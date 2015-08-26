// static variable declaration


// npm requires


// local requires
var User = require('../models/user');

// callback function declarations
var sanitizeUser = function(user){
	return {
		_id: user._id,
		username: user.username,
		password: '<sanitized>'
	};
};

// function declarations
var createUser = function(req, res){
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});
	
	user.save(function(err, user){
		if(err) return res.send(err);
		
		user.password = '<sanitized>';
		
		res.json({
			message: 'New user added!',
			data: user
		});
	});
};

var getAllUsers = function(req, res){
	User.find(function(err, users){
		var sanitizedUsers;
		
		if(err) return res.send(err);
		
		sanitizedUsers = users.map(sanitizeUser);
		
		res.json(sanitizedUsers);
	});
};

var getOneUser = function(req, res){
	User.findById(req.params.user_id, function(err, user){
		if(err) return res.send(err);
		
		user.password = '<sanitized>';
		
		res.json(user);
	});
};

var updateUser = function(req, res){
	User.findById(req.params.user_id, function(err, user){
		if(err) return res.send(err);
		if(!user) return res.send(new Error('user not found'));
		
		if(req.body.username !== user.username) user.username = req.body.username;
		if(req.body.password !== '<sanitized>') user.password = req.body.password;
		
		user.save(function(err, user){
			if(err) return res.send(err);
			
			user.password = '<sanitized>';
			
			res.json({
				message: 'user updated!',
				data: user
			});
		});
	});
};

var deleteUser = function(req, res){
	User.findByIdAndRemove(req.params.user_id, function(err){
		if(err) return res.send(err);
		
		res.json({message: 'user deleted!'});
	});
};

// main
module.exports = {
	createUser: createUser,
	getAllUsers: getAllUsers,
	getOneUser: getOneUser,
	updateUser: updateUser,
	deleteUser: deleteUser
};