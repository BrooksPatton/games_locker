// Static variable declarations
var PORT = process.env.PORT || 3000;

// npm requires
var express = require('express');
var mongoose = require('mongoose');

// local requires


// variable declarations
var app = express();
var router = express.Router();

// callback function declarations
var indexRoute = function(req, res){
	res.json({
		message: 'You are running dangerously low on games to play!'
	});
};

// function declarations


// main
mongoose.connect('mongodb://localhost:27017/games_locker');

router.get('/', indexRoute);

app.use('/api', router);

app.listen(PORT);
console.log('Insert game on port ' + PORT);