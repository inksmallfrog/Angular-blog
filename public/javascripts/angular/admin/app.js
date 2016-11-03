'use strict';

var blog_admin = angular.module('blog_admin', ['ui.router']);
blog_admin.config(function($stateProvider){
	$stateProvider
		.state("index", {
			url: "",
			templateUrl: "views/tpls/admin/index.html"
		})
		.state("post", {
			url: "",
			templateUrl: "views/tpls/admin/post.html",
			controller: "postCtrl"
		});
});

