var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Post.js');
var fs = require('fs');
Date.prototype.format=function(fmt) {         
	    var o = {         
			    "M+" : this.getMonth()+1, //月份         
			    "d+" : this.getDate(), //日         
			    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
			    "H+" : this.getHours(), //小时         
			    "m+" : this.getMinutes(), //分         
			    "s+" : this.getSeconds(), //秒         
			    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
			    "S" : this.getMilliseconds() //毫秒         
			    };         
	    var week = {         
			    "0" : "/u65e5",         
			    "1" : "/u4e00",         
			    "2" : "/u4e8c",         
			    "3" : "/u4e09",         
			    "4" : "/u56db",         
			    "5" : "/u4e94",         
			    "6" : "/u516d"        
			    };         
	    if(/(y+)/.test(fmt)){         
			        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
			    }         
	    if(/(E+)/.test(fmt)){         
			        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
			    }         
	    for(var k in o){         
			        if(new RegExp("("+ k +")").test(fmt)){         
						            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
						        }         
			    }         
	    return fmt;         
}       
/*Get posts list*/
router.get('/', function(req, res, next) {
	Post.find(function (err, posts){
		if(err) return next(err);
		res.json(posts);
	});
});
/*Post post*/
router.post('/', function(req, res, next){
	var post_info = req.body;
	var title = post_info.title;
	var date = (new Date()).format('yyyy-MM-dd');
	var content_path = "./public/posts/"+ date + "_" + post_info.title + '.md';
	var i = 1;
	while(fs.exists(content_path)){
		post_info.title = title + "_" + i;
		content_path = "./public/posts/"+ date + "_" + post_info.title + '.md';
		i += 1;
	}
	var content =  "---\n"
				 + "title:" + post_info.title + "\n"
				 + "catagory:" + post_info.catagory.name + "\n"
				 + "tags:" + post_info.tags + "\n"
				 + "---\n"
				 + post_info.content;
	fs.writeFile(content_path, content, function(err){
		if(err){
			console.error("write file error", err);
			res.json({});
			return;
		}
	});

	post_info.catagory_id = post_info.catagory._id;
	delete post_info.content;
	delete post_info.catagory;
	post_info.content_path = content_path;
	
	post_info.tags = post_info.tags.replace(/\s+/g,"").split(',');

	Post.create(post_info, function(err, post) {
		console.log(post_info);
		if(err) {
			console.log(err);
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

module.exports = router;
