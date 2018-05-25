'use strict';

var app = angular.module('web-content-portal', ['registerModalModule', 'ngComponentRouter']);

app.controller("IndexController", ["$scope",'$window', function($scope){
	$scope.greeting ="Login me now";

	$scope.openRegistrationModal = function() {
		console.log("Modal clicked..");
		var dlgElem = angular.element("#modalRegisterForm");
	      if (dlgElem) {
	         dlgElem.modal("show");
	      }
	};

}]);

//Create RegisterUser Module Instance
var registerModalModule = angular.module("registerModalModule", []);

registerModalModule.controller("RegisterModalController", ["$scope", '$window', 'UserProfileFactory', function ($scope, $window, UserProfileFactory) {

   $scope.registerMe = function () {
      console.log("do action on Modal");
      getPosts();
   };

   function getPosts() {
        UserProfileFactory.getPosts()
            .then(function (response) {
                // $scope.customers = response.data;
                $window.location.href = './dashboard.html';
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

}]);

app.factory('UserProfileFactory', function($http){

	var urlBase = "http://jsonplaceholder.typicode.com";
	var userProfileFactory = {};
	console.log("Inside factory");

	userProfileFactory.getPosts = function(){
		console.log("Inside factory getPosts()");
		return $http.get(urlBase + '/posts');
	}

	return userProfileFactory;
	
});

//Dashboard  Controller
// app.controller('DashboardController', function($scope) {
//     $scope.message = 'Everyone come and see how good I look!';
// });


app.value('$routerRootComponent','dashboard');
app.component('dashboard',{
  template:'<header-component></header-component><ng-outlet></ng-outlet>',
  $routeConfig:[
    // {path:'/',component:'homeComponent',name:'Home'}
  ]
});


//Handle server error messages globally..
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q,$rootScope) {
        return {
            'responseError': function (responseError) {
                $rootScope.message = responseError.data.message;
                return $q.reject(responseError);
            }
        };
    });
}]);