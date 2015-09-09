'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginCtrl'
	});
}])

.controller('loginCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	console.log("in login controller");
	$cookies.put('username', null);
	$cookies.put('token', null);
	console.log("token is "+$cookies.get('token'));
	// console.log("delete token and token is "+$cookies.token);
	$scope.submitlogin = function() {
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
					console.log("token is "+$cookies.get('token'));
					console.log("username is "+$cookies.get('username'));
				}else{
					console.log(res.status);
				}
			})
			.error(function(data, status) {
				console.log("error");
			});
	}
	
}]);