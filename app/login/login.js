'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginCtrl'
	});
}])

.controller('loginCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	console.log("in login controller");
	
	console.log("token is "+$cookies.get('token'));
	if($cookies.get('token')!==null){
		$http.post('/api/checktokenservice',{
			token: $cookies.get('token'),
			username: $cookies.get('username')
		})
		.success(function(res, status){
			if(res.status==='OK'){
				$location.path('/success');
			}else{
				$location.path('/login');
			}
			
		})
		.error(function(data, status){
			$location.path('/login');
		});
	}else{
		$location.path('/login');
	}
	
	// console.log("delete token and token is "+$cookies.token);
	$scope.submitlogin = function() {
		$cookies.put('username', null);
		$cookies.put('token', null);
		console.log($scope.username);
		console.log($scope.password);
		$http.post('/api/loginservice', {
				username: $scope.username,
				password: $scope.password
			})
			.success(function(res, status) {
				console.log(res.status);
				if(res.status==="OK"){
					console.log(res);
					$cookies.put('token', res.token);
					$cookies.put('username',$scope.username);
					console.log("username is "+$cookies.get('username'));
					console.log("token is "+$cookies.get('token'));
					console.log("GOING to Success");
					$location.path('/success');
				}else{
					console.log(res.status);
				}
			})
			.error(function(data, status) {
				console.log("error");
			});
	}
	
}]);