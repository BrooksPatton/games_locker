// Static variable declarations


// npm requires
var mongoose = require('mongoose');

// local requires


// variable declarations
var GameSchema = new mongoose.Schema({
	name: String,
	genre: String,
	vendor: String,
	platform: String,
	userId: String
});

// callback function declarations


// function declarations


// main
module.exports = mongoose.model('Game', GameSchema);