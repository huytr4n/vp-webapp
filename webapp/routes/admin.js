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

	// admin add product page
	app.get('/admin/product/add', function (req, res) {
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'add'
		});
		res.render('./admin/admin', opt);
	});

	// admin edit product page
	app.get('/admin/product/edit/:id', function (req, res) {
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'edit'
		});
		res.render('./admin/admin', opt);
	});

	// admin manage product page
	app.get('/admin/product/', function (req, res) {
		// paging, delete, add results
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'view'
		});
		res.render('./admin/admin', opt);
	});
};

exports.route = route;