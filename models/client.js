// static variable declarations


// npm requires
var mongoose = require('mongoose');

// local requires


// variable declarations
var ClientSchema = new mongoose.Schema({
	name: {type: String, unique: true, required: true},
	id: {type: String, required: true},
	secret: {type: String, required: true},
	userId: {type: String, required: true}
});

// callback function declarations


// function declarations


// main
module.exports = mongoose.model('Client', ClientSchema);