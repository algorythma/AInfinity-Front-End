var app = angular.module('web-content-portal');

var assignmentCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('assignmentCtrl', assignmentCtrl);

app.component('assignmentComponent',{
  templateUrl:'../src/app/templates/assignment.html',
  controller: 'assignmentCtrl',
  controllerAs: 'vm'
});