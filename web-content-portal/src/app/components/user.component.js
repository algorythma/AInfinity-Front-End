var app = angular.module('web-content-portal');

var userCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next, previous) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('userCtrl', userCtrl);

userCtrl.$inject = ["$http", "$window", "$scope", "localStorage"];

app.component('userComponent',{
  templateUrl:'../src/app/templates/user.html',
  controller: 'userCtrl',
  controllerAs: 'vm',
  bindings: { $router: '<' }
});