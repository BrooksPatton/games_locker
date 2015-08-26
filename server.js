// Static variable declarations
var PORT = process.env.PORT || 3000;

// npm requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// local requires
var gameRoutes = require('./routes/games');

// variable declarations
var app = express();

// callback function declarations


// function declarations


// main
mongoose.connect('mongodb://localhost:27017/games_locker');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/api', gameRoutes);

app.listen(PORT);
console.log('Insert game on port ' + PORT);