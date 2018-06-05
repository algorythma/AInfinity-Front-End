var app = angular.module('web-content-portal');

var createassignmentCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('createassignmentCtrl', createassignmentCtrl);

createassignmentCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS"];

app.component('createassignmentComponent',{
  templateUrl:'../src/app/templates/createassignment.html',
  controller: 'createassignmentCtrl',
  controllerAs: 'vm'
});