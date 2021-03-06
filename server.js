// Static variable declarations
var PORT = process.env.PORT || 3000;

// npm requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var jade = require('jade');
var session = require('express-session');

// local requires
var gameRoutes = require('./routes/games');
var userRoutes = require('./routes/users');
var clientRoutes = require('./routes/client');
var oauth2Routes = require('./routes/oauth2');

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
app.use(passport.initialize());
app.use(session({
	secret: 'ryfulpj8&%*&^PLJGJLedhaendhernhd',
	saveUninitialized: true,
	resave: true
}));

app.set('view engine', 'jade');

app.use('/api', gameRoutes);
app.use('/api', userRoutes);
app.use('/api', clientRoutes);
app.use('/api', oauth2Routes);

app.listen(PORT);
console.log('Insert game on port ' + PORT);