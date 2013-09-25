var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// product Schema
var product_schema = new Schema({
	'title' : String,
	'catalog' : String,
	'outline' : String,
	'image' : {
		'url' : String,
		'size' : Number
	},
	'config' : {
		'CPU' : {
			'name' : String,
			'id' : String
		},
		'RAM' : {
			'name' : String,
			'id' : String
		},
		'VGA' : {
			'name' : String,
			'id' : String
		},
		'other' : String		
	},
	'price' : {
		'number' : Number,
		'currency' : String
	},
	'sales' : {
		'type' : String,
		'amount' : String,
		'date' : {
			'from' : Date,
			'to' : Date
		}
	}
});

// validate

var Product = mongoose.model('Product', product_schema, 'product');

exports.Product = Product;