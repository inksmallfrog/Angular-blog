'use strict';

blog_admin
	.factory('Posts', ['$resource', function($resource){
		return $resource('/posts/:id', null, {
			update: { method: 'PUT' }
		});
	}])
	.factory('Catagories', ['$resource', function($resource){
		return $resource('/catagories/:id', null, {
			update: { method: 'PUT' }
		});
	}])
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
	.controller('postCtrl', ['$scope', 'Posts', 'Catagories', function($scope, Posts, Catagories){
		$scope.posts_attr_list_show = {
			catagories: false,
			tags: false,
			time: false
		}

		$scope.list_title = "全部";
		$scope.catagories = Catagories.query(function(){
			$scope.current_catagory = $scope.catagories.filter(function(item){
											console.log(item);
											return item.name == "随手帐";
										})[0];
		});
		$scope.posts = Posts.query();

		$scope.title = "";
		$scope.tags = "";
		$scope.content = "";
		$scope.submitPost = function(){
			var post = new Posts({title: $scope.title, catagory: $scope.current_catagory, tags: $scope.tags, content: $scope.content});
			post.$save(function(){
				$scope.posts.push(post);
			});
		}

		$scope.getPost = function(content){
			$scope.post_content = content;
		}

		$scope.$on("showPostCatagories", function(){
			$scope.posts_attr_list_show_catagories = true;
		})

		$scope.toCatagory = function(catagory){
			$scope.posts_attr_list_show.catagories && ($scope.posts_attr_list_show.catagories = false);
			$scope.list_title = "笔记本：" + catagory;
		}
	}]);
