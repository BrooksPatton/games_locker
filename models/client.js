// static variable declarations


// npm requires
var mongoose = require('mongoose');
var uid = require('uid');

// local requires


// variable declarations
var ClientSchema = new mongoose.Schema({
	name: {type: String, unique: true, required: true},
	id: {
		type: String,
		required: true,
		default: function(){
			return uid(8);
		}
	},
	secret: {
		type: String,
		required: true,
		default: function(){
			return uid(24);
		}
	},
	userId: {type: String, required: true}
});

// callback function declarations


// function declarations


// main
module.exports = mongoose.model('Client', ClientSchema);