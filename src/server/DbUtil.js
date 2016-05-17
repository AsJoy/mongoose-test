'use strict';

var mongoose = require("mongoose");
var async = require("async");

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
	console.error("connection error");
});

async.series({
	one: function (cb) {
		db.on('open', function() {

			console.log("open success");
			cb(null);
		});	
	}
}, function (error, result) {
	var classSchema = mongoose.Schema({
		name: String,
		password: String,
		nickName: String,
		date: Date
	});

	classSchema.methods.speak = function () {
		console.log(this)
	}

	var Class = mongoose.model("class", classSchema);

	var cls = new Class({
		name: "hello",
		password: "admin",
		nickName: "xianqu",
		date: new Date()
	})
	
	cls.save(function (error, data) {
		if(error) return console.log(error);

		console.log(data.speak());	
	})

})

	
