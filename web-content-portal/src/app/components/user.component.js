var userCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('userCtrl', userCtrl);

headerCtrl.$inject = ["$http", "$window", "$scope", "localStorage"];

app.component('userComponent',{
  templateUrl:'../app/templates/user.html',
  controller: 'userCtrl',
  controllerAs: 'vm',
  bindings: { $router: '<' }
});