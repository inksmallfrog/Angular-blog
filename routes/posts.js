var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Post.js');
var fs = require('fs');
/*Get posts list*/
router.get('/', function(req, res, next) {
	Post.find(function (err, posts){
		if(err) return next(err);
		res.json(posts);
	});
});
/*Post post*/
router.post('/', function(req, res, next){
	Post.create(req.body, function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});
/*Get post*/
router.get('/:id', function(req, res, next){
	Post.findById(req.params.id, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
});
router.put('/:id', function(req, res, next){
	Post.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
});
router.delete('/:id', function(req, res, next){
	Post.findByIdAndRemove(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
});

module.exports = router;
