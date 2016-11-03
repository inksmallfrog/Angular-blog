var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Catagory = require('../models/Catagory.js');

/* GET catagories list. */
router.get('/', function(req, res, next) {
	Catagory.find(function(err, catagories){
		if(err) return next(err);
		res.json(catagoies);
	});
});

module.exports = router;
