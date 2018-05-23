'use strict';

var app = angular.module('web-content-portal', ["registerModalModule"]);

app.controller("IndexController", function($scope){
	$scope.greeting ="Login me now";

	$scope.openRegistrationModal = function() {
		console.log("Modal clicked..");
		var dlgElem = angular.element("#modalRegisterForm");
	      if (dlgElem) {
	         dlgElem.modal("show");
	      }
	};

});

var registerModalModule = angular.module("registerModalModule", []);
registerModalModule.controller("RegisterModalController", ["$scope", function ($scope) {

   $scope.registerMe = function () {
      console.log("do action on Modal");
   };
}]);