'use strict';

angular.module('myApp.success', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/success', {
    templateUrl: 'success/success.html',
    controller: 'successCtrl'
  });
}])

.controller('successCtrl', [function() {
	
}]);