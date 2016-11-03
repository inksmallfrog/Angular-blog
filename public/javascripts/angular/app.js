var myApp = angular.module('helloworld', ['ngResource', 'ui.router']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise('/');
	  var helloState = {
		      name: 'hello',
		      url: '/hello',
		      template: '<h3>hello world!</h3>'
		    }

	  var aboutState = {
		      name: 'about',
		      url: '/about',
		      template: '<h3>Its the UI-Router hello world app!</h3>'
		    }

	  $stateProvider.state(helloState);
	  $stateProvider.state(aboutState);
}]);
