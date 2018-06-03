var app = angular.module('web-content-portal');

var homeCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next, previous) {
		console.log("Inside routerOnActivate ");
	}

}

app.controller('homeCtrl', homeCtrl);

app.component('homeComponent',{
  template: '',
  controller: 'homeCtrl',
  controllerAs: 'vm',
  bindings: { $router: '<' }
});