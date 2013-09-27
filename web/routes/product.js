/*
* admin routing
*/
var Product = require('./../model/product/product');

var options = require('./options').options;
var fs = require('fs');

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

	// POST add product
	app.post('/admin/product/add', preAddProduct, function (req, res) {
		var p = Product.create(req.product);
		Product.add(p, function (err, success) {			
			var result = "";
			if (err) {
				result = "false";
			} else {
				result = "true";
			}
			res.redirect("/admin/product/add?result=" + result);
		});
	});
	// GET add image for produt page
	app.get("/admin/product/image/upload/:id", function (req, res) {
		var id = req.params.id;
		// render view
		var opt = options({
			'site' : 'private',
			'section' : 'product',
			'page' : 'image-add'
		});
		// add id to param
		opt.id = id;
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
	// POST upload image
	app.post('/admin/product/image/upload/:id', function (req, res) {
		var id = req.params.id;
		// set upload path
		var writePath = "./public/product-images/"+id;
		// create folder if it's not existed
		if (!fs.lstatSync(writePath).isDirectory()) {
			fs.mkdirSync("./public/product-images/"+id);
		}	
		var newPath = writePath + "/" + req.files.image.name;
		upload(req.files.image, newPath);
		res.redirect("/admin/product");
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
// upload image
var upload = function (file, path) {
	fs.readFile(file.path, function (err, data) {		
		// write file
		fs.writeFile(path, data, function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log("upload file complete : " +path);
			}		
		});
	});
};

exports.route = route;