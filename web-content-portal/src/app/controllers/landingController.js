'use strict';

app.controller("IndexController", function($scope){
	$scope.greeting ="Login me now";

	$scope.openRegistrationModal = function() {
		console.log("Modal clicked..");
		var dlgElem = angular.element("#modalRegisterForm");
	      if (dlgElem) {
	         dlgElem.modal("show");
	      }
	};

});


registerModalModule.controller("RegisterModalController", ["$scope", function ($scope) {

   $scope.registerMe = function () {
      console.log("do action on Modal");
   };
}]);


//ui.routing code
app.config(function($stateProvider) {

	var dashboardState = {
	    name: 'dashboard',
	    url: '/dashboard',
	    template: '<h3>hello Dashboard!</h3>'
  	}

  	$stateProvider.state(dashboardState);

});