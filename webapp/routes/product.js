/*
* admin routing
*/
var Product = require('./../model/product/product');

var options = require('./options').options;

function route (app, xp) {
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
	// POST add product
	app.post('/admin/product/add', preAddProduct, function (req, res) {
		var p = Product.create(req.product);
		Product.add(p, function (err, success) {
			if (err) {
				res.send(false);
			} else {
				res.send(true);
			}
		});
	});	
};
// prepare parameter
var preAddProduct = function (req, res, next) {	
	var product = {
		'title' : req.body.title,
		'catalog' : req.body.catalog,
		'outline' : req.body.outline,
		'image' : {
			'url' : '',
			'size' : 0
		},
		'config' : {
			'CPU' : {
				'name' : req.body.CPU,
				'id' : ''
			},
			'RAM' : {
				'name' : req.body.RAM,
				'id' : ''
			},
			'VGA' : {
				'name' : req.body.VGA,
				'id' : ''
			},
			'HDD' : {
				'name' : req.body.HDD,
				'id' : ''
			},
			'other' : req.body.other		
		},
		'price' : {
			'number' : 0,
			'currency' : req.body.currency
		}
	};
	req.product = product;
	next();
};

exports.route = route;