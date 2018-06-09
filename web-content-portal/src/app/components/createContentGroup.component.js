var app = angular.module('web-content-portal');

var createContentGroupCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('createContentGroupCtrl', createContentGroupCtrl);

createContentGroupCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS"];

app.component('createContentGroupComponent',{
  templateUrl:'../src/app/templates/createContentGroup.html',
  controller: 'createContentGroupCtrl',
  controllerAs: 'vm'
});