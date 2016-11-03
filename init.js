var mongoose = require('mongoose');
var Catagory = require('./models/Catagory.js');
mongoose.connect('mongodb://localhost/blog', function(err){
	if(err){
		console.log('connection error', err);
	}
	else{
		console.log('connection successful');
	}
});
Catagory.create({name: "随手帐"}, function(err, catagory){
	if(err) console.log('create default catagory error', err);
	else {
		console.log("create default catagory 随手帐");
		console.log(catagory);
	}
});
