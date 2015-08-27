// static variable declarations


// npm requires


// local requires
var Client = require('../models/client');

// callback function declarations


// function declarations
var createClient = function(req, res){
	var client = new Client();

	client.name = req.body.name;
	client.id = req.body.id;
	client.secret = req.body.secret;
	client.userId = req.user._id;

	client.save(function(err, client){
		if(err) return res.send(err);

		res.json({
			message: 'Client added to the locker!',
			data: client
		});
	});
};

var getAllClients = function(req, res){
	Client.find({userId: req.user._id}, function(err, clients){
		if(err) return res.send(err);

		res.json(clients);
	});
};

var getOneClient = function(req, res){
	Client.findOne({
		_id: req.params.client_id,
		userId: req.user._id
	}, function(err, client){
		if(err) return res.send(err);

		res.json(client);
	});
};

var updateClient = function(req, res){
	Client.findOne({
		_id: req.params.client_id,
		userId: req.user._id
	}, function(err, client){
		if(err) return res.send(err);

		client.name = req.body.name;
		client.id = req.body.id;

		client.save(function(err, client){
			if(err) return res.send(err);

			res.json({
				message: 'Client has been updated!',
				data: client
			});
		});
	});
};

var deleteClient = function(req, res){
	Client.remove({
		_id: req.params.client_id,
		userId: req.user._id
	}, function(err){
		if(err) return res.send(err);

		res.json({message: 'Client deleted from locker!'});
	});
};

// main
module.exports = {
	createClient: createClient,
	getAllClients: getAllClients,
	getOneClient: getOneClient,
	updateClient: updateClient,
	deleteClient: deleteClient
};