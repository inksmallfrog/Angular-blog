'use strict';

blog_admin
	.controller('menuCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
		$scope.menuState = {
			post: false
		};
		$scope.showPostMenuList = function(){
			$scope.menuState.post = true;
		};
		$scope.showPostCatagories = function(){
			$rootScope.$broadcast("showPostCatagories");
		}
	}])
	.controller('postCtrl', ['$scope', function($scope){
		$scope.catagories_show = false;
		$scope.tags_show = false;
		$scope.list_title = "全部";
		$scope.post_content = "0";
		$scope.getPost = function(content){
			$scope.post_content = content;
		}
		$scope.$on("showPostCatagories", function(){
			$scope.catagories_show = true;
		})
		$scope.toCatagory = function(catagory){
			$scope.catagories_show && ($scope.catagories_show = false);
			$scope.list_title = "笔记本：" + catagory;
		}
	}]);
