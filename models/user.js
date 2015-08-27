// static variable declaration


// npm requires
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// local requires


// variable declarations
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// callback function declarations
var preSave = function(callback){
	var user = this;
	
	if(!user.isModified('password')) return callback();
	
	bcrypt.genSalt(5, function(err, salt){
		if(err) return callback(err);
		
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return callback(err);
			
			user.password = hash;
			callback();
		});
	});
};

// function declarations


// main
UserSchema.pre('save', preSave);

UserSchema.methods.verifyPassword = function(password, cb){
	bcrypt.compare(password, this.password, cb);
};

module.exports = mongoose.model('User', UserSchema);