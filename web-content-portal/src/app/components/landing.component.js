
var landingCtrl = function($http, $window, $scope, registerUser){
	var vm = this;

	vm.openRegisterModal = function(){
		console.log("Inside openRegisterModal function");
		var dlgElem = angular.element("#modalRegisterForm");
	      if (dlgElem) {
	         dlgElem.modal("show");
	      }
	}

	vm.registerMe = function () {
      console.log("do action on Modal sign up clicked--");
      getPosts();
   };

    var getPosts = function() {
    	console.log("Inside getPosts function ");
        registerUser.getPosts()
            .then(function (response) {
                // $scope.customers = response.data;
                $window.location.href = './dashboard.html';
            }, function (error) {
                $scope.message = 'Unable to register you: Please make sure you have entered all the required fields';
                var dlgElem = angular.element("#modalRegisterForm");
			    if (dlgElem) {
			       dlgElem.modal("hide");
			    }
            });
    }
}


app.controller('landingCtrl', landingCtrl);

app.factory('registerUser', ['$http', function($http){

	var urlBase = "https://jsonplaceholder.typicode.com";
	var userProfileFactory = {};

	userProfileFactory.getPosts = function(){
		return $http.get(urlBase + '/posts');
	}

	return userProfileFactory;
	
}]);

app.component('landingComponent',{
  templateUrl:'../app/templates/landing.html',
  controller: 'landingCtrl',
  controllerAs: 'vm'
});