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
    console.log("token is " + $cookies.get('token'));

    if ($cookies.get('email') !== undefined && $cookies.get('token') !== undefined) {
        $http.post('/api/checktokenservice', {
                token: $cookies.get('token'),
                email: $cookies.get('email')
            })
            .success(function(res, status) {
                if (res.status === 'OK') {
                    $location.path('/success');
                } else {
                    $location.path('/login');
                }

            })
            .error(function(data, status) {
                alert("Cannot connect to the server");
                $location.path('/login');
            });
    } else {
        console.log("no valid token");
        $location.path('/login');
    }

    $scope.submitlogin = function() {

        $cookies.put('email', null);
        $cookies.put('token', null);
        console.log("email is: " + $scope.email);
        console.log("password is: " + $scope.password);
        $http.post('/api/loginservice', {
                email: $scope.email,
                password: $scope.password
            })
            .success(function(res, status) {
                console.log(res.status);
                if (res.status === "OK") {
                    console.log(res);
                    $cookies.put('token', res.token);
                    $cookies.put('email', $scope.email);
                    console.log("email is " + $cookies.get('email'));
                    console.log("token is " + $cookies.get('token'));
                    console.log("GOING to Success");
                    alert('Login Success');
                    $location.path('/success');
                } else {
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
