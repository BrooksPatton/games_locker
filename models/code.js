// static variables


// npm requires
var mongoose = require('mongoose');

// local requires


// variable declarations
var CodeSchema = new mongoose.Schema({
	value: {type: String, required: true},
	redirectUri: {type: String, required: true},
	userId: {type: String, required: true},
	clientId: {type: String, required: true}
});

// callback function declarations


// function declarations


// main
module.exports = mongoose.model('Code', CodeSchema);