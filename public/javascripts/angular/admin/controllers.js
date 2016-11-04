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
		$scope.list_title = "全部";
		$scope.current_post = null;
		$scope.catagories = Catagories.query(function(){
			$scope.current_catagory = $scope.catagories.filter(function(item){
											return item.name == "随手帐";
										})[0];
		});
		$scope.posts = Posts.query(function(){
			$scope.showDefault();
		});
		$scope.showDefault = function(){
			if($scope.posts.length) $scope.showPost($scope.posts[0]);
			else $scope.newPost();
		}
		$scope.showPost = function(post){
			if($scope.current_post && $scope.current_post.is_new){
				//显示提示信息
				$scope.posts.splice(0, 1);
			}
			$scope.edit_mode && ($scope.edit_mode = false);
			$scope.current_post = post;
		}
		$scope.deletePost = function(post){
			var posts = $scope.posts;
			Posts.remove({id: post._id}, function(){
				var length = posts.length;
				var i = 0;
				for(;i<length; ++i){
					if(posts[i]._id == post._id) break;
				}
				$scope.posts.splice(i, 1);
				if(post._id == $scope.current_post._id){
					$scope.showDefault();
				}
			});
		}

		$scope.edit_mode = false;
		$scope.modified = false;
		$scope.newPost = function(){
			$scope.current_post = new Posts({title: "新文章", catagory: {_id: $scope.current_catagory._id, name: $scope.current_catagory.name}, tags: "", content: ""});
			$scope.current_post.is_new = true;
			$scope.posts.unshift($scope.current_post);
			$scope.edit_mode = true;
		}
		$scope.editPost = function(){
			$scope.edit_mode = true;
		}

		$scope.submitPost = function(){
			if(!$scope.current_post._id){
				$scope.current_post.$save(function(){
				});
			}
			else{
				Posts.update({id: $scope.current_post._id}, $scope.current_post);
			}
			$scope.edit_mode = false;
		}
		


		$scope.$on("showPostCatagories", function(){
			$scope.posts_attr_list_show_catagories = true;
		})

		$scope.toCatagory = function(catagory){
			$scope.posts_attr_list_show.catagories && ($scope.posts_attr_list_show.catagories = false);
			$scope.list_title = "笔记本：" + catagory;
		}
	}]);
