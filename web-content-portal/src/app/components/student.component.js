var app = angular.module('web-content-portal');

var studentCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('studentCtrl', studentCtrl);

app.component('studentComponent',{
  templateUrl:'../src/app/templates/student.html',
  controller: 'studentCtrl',
  controllerAs: 'vm'
});