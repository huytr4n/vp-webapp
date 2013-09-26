/*
* admin routing
*/
var db = require('../model/db/connect');
var options = require('./options').options;

function route (app, xp) {
	// admin home page
	app.get('/admin', function (req, res) {
		var opt = options({
			'site' : 'private',
			'section' : 'admin',
			'page' : 'main'
		});
		// routing to admin page
		res.render('./admin/admin', opt);
	});
	// go to config db page
	app.get('/admin/db/', function (req, res) {
		var opt = options({
			'site' : 'private',
			'section' : 'db',
			'page' : 'view'
		});
		res.render('./admin/admin', opt);
	});
	// save config
	app.post('/admin/db/save', function (req, res) {
		db.saveConfig(req.body);
	})
	// api db config 
	app.get('/admin/api/db/', function (req, res) {
		db.getConfig(function (config) {
			try{
				config = JSON.parse(config);
			} catch (err) {
				console.log(err);
				config = {};
			}
			res.send(config);
		});
	});
};

exports.route = route;