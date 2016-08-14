'use strict';

angular.module('myApp.success', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/success', {
    templateUrl: 'success/success.html',
    controller: 'successCtrl'
  });
}])

.controller('successCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location ) {
	console.log("in success controller");
	if($cookies.get('email')!==undefined && $cookies.get('token')!==undefined){
		$http.post('/api/checktokenservice',{
			token: $cookies.get('token'),
			email: $cookies.get('email')
		})
		.success(function(res, status){
			if(res.status==='OK'){
				$location.path('/success');
			}else{
				$location.path('/login');
			}
			
		})
		.error(function(data, status){
			alert('lost connection to the server');
			console.log("Cannot connect to the server");	
		});
	}else{
		console.log("no token");
		$location.path('/login');
	}
	
	$scope.submitlogout=function(){
		$cookies.put('email', null);
		$cookies.put('token', null);
		alert('Log out !!!');
		$location.path('/login');
	}
}]);