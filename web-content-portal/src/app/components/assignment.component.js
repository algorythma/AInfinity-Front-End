var assignmentCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('assignmentCtrl', assignmentCtrl);


app.component('assignmentComponent',{
  templateUrl:'../app/templates/assignment.html',
  controller: 'assignmentCtrl',
  controllerAs: 'vm'
});