var classCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('classCtrl', classCtrl);

app.component('classComponent',{
  templateUrl:'../app/templates/class.html',
  controller: 'classCtrl',
  controllerAs: 'vm'
});