/*
* admin routing
*/
var Product = require('./../model/product/product');

var options = require('./options').options;

function route (app, xp) {
/*
********** ROUTING *******************
*/
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
		var id = req.params.id;		
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'edit'			
		});
		opt.id = id;
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
/*
*********** API ***************
*/
	// GET product api
	app.get('/admin/api/product/', function (req, res) {
		var conditions = {};
		var fields = {};
		var options = {};
		// find products
		Product.find(conditions, fields, options, function (products) {
			res.send(products);
		});
	});

	// GET product by id
	app.get('/admin/api/product/:id', function (req, res) {
		var id = req.params.id;
		Product.getById(id, function (p) {
			res.send(p);
		});
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

	// GET destroy product by id
	app.get('/admin/product/destroy/:id', function (req, res) {
		var id = req.params.id;
		if (id) {
			Product.destroy(id);
			res.send({code : 200});
		} else {
			res.send({code: 400, errorMsg : "id is invalid"});
		}
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