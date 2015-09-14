'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginCtrl'
	});
}])

.controller('loginCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location ) {
	console.log("in login controller");
	console.log("token is "+$cookies.get('token'));
	
	if($cookies.get('username')!==undefined && $cookies.get('token')!==undefined){
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
			alert("Cannot connect to the server");
			$location.path('/login');
		});
	}else{
		console.log("no valid token");
		$location.path('/login');
	}
	
	$scope.submitlogin = function() {

		$cookies.put('username', null);
		$cookies.put('token', null);
		console.log("username is: "+$scope.username);
		console.log("password is: "+$scope.password);
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
					alert('Login Success');
					$location.path('/success');
				}else{
					alert('Login Fail');
				}
			})
			.error(function(data, status) {
				alert('Cannot connect to the server');
				console.log("Cannot connect to the server");
				$location.path('/login');
			});
	}
	
	
}]);