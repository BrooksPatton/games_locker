// static variables


// npm requires
var mongoose = require('mongoose');

// local requires


// variable declarations
var TokenSchema = new mongoose.Schema({
	value: {type: String, required: true},
	userId: {type: String, required: true},
	clientId: {type: String, required: true}
});

// callback function declarations


// function declarations


// main
module.exports = mongoose.model('Token', TokenSchema);