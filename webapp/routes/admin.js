/*
* admin routing
*/

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
};

exports.route = route;