'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'registerCtrl'
    });
}])

.controller('registerCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    console.log("in register controller");
    if($cookies.get('email')!==undefined && $cookies.get('token')!==undefined){
        $http.post('/api/checktokenservice',{
            token: $cookies.get('token'),
            email: $cookies.get('email')
        })
        .success(function(res, status){
            if(res.status==='OK'){
                $location.path('/success');
            }else{
                $location.path('/register');
            }
            
        })
        .error(function(data, status){
            alert('lost connection to the server');
            console.log("Cannot connect to the server");    
        });
    }else{
        console.log("no token");
        $location.path('/register');
    }
    $scope.clear = function() {
        $scope.firstname = '';
        $scope.lastname = '';
        $scope.address = '';
        $scope.email = '';
        $scope.telNo = '';
        $scope.idCardNo = '';
        $scope.birthDay = '';
        $scope.password = '';
        $scope.verifyPass = '';
        console.log("click clear");
    }
    $scope.cancel = function() {
        $location.path('/login');
    }
    $scope.submit = function() {
        if ($scope.email !== '' && $scope.email != undefined) {
            if ($scope.email.split('@')[1] == null) {
                alert('Wrong email, please try again!');
            } else {
                if ($scope.telNo !== '' && $scope.telNo != undefined) {
                    if ($scope.telNo.toString().length != 10) {
                        alert('Wrong telephone number, please try again!');
                        // console.log('Hello: 2');
                    }
                } else if ($scope.idCardNo !== '' && $scope.idCardNo != undefined) {
                    if ($scope.idCardNo.toString().length != 10) {
                        alert('Wrong ID card number, please try again!');
                        // console.log('Hello: 3');
                    }
                } else if ($scope.password !== '' && $scope.password != undefined) {
                    if ($scope.password.toString().length < 8) {
                        alert('Password is too short, please try again!');
                        // console.log('Hello: 4');
                    } else if ($scope.password !== $scope.verifyPass) {
                        alert('Password not match. Please try again.');
                        // console.log('Hello: 5');
                    } else {
                        if ($scope.password == $scope.verifyPass) {
                            // console.log('Hello: 6');
                            // console.log($scope.password);
                            var hash = CryptoJS.SHA3($scope.password, {
                                outputLength: 256
                            });
                            var passwordHashed = hash.toString(CryptoJS.enc.Base64);
                            // console.log(passwordHashed);
                            $http.post('/api/register', {
                                            username: $scope.username,
                                            password: $scope.password
                                        })
                                        .success(function(res, status) {
                                            console.log(res.status);
                                            if (res.status === "OK") {
                                                console.log(res);
                                                $cookies.put('token', res.token);
                                                $cookies.put('username', $scope.username);
                                                console.log("username is " + $cookies.get('username'));
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
                           
                        } else {
                            alert('The password is requrie');
                            // console.log('Hello: 8');

                        }

                    }

                } else {
                    alert('The email is require');
                    // console.log('Hello: 7');


                }
            }
        }
    }
}]);
