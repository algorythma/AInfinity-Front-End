var userCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

}

app.controller('userCtrl', userCtrl);

app.component('userComponent',{
  templateUrl:'../app/templates/user.html',
  controller: 'userCtrl',
  controllerAs: 'vm'
});