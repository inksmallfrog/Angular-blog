'use strict';

var app = angular.module('blog', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {templateUrl: 'views/tpls/welcome.html', controller: 'WelcomeCtrl'})
		.otherwise({redirectTo: '/'});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);
