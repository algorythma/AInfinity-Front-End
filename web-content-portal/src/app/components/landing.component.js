
var landingCtrl = function($http, $window, $scope, localStorage, modalFactory){
	var vm = this;

	vm.openModal = function(modalType){
		console.log("Inside openRegisterModal function modalType =" + modalType);
		modalFactory.openModal(modalType);
	}

	vm.registerMe = function () {
		console.log("do action on Modal sign up clicked--");
		var signUpJson ={
			"email": vm.registerEmail,
			"first_name": vm.registerFirstName,
			"last_name": vm.registerLastName,
			"password": vm.registerPassword,
			"user_attributes": {
				"dob": vm.registerDob
			}
		};
		var request = {
            method: 'POST',
            url: 'http://192.168.71.10:10010/api/aiuam/v1/users/signup',
            headers: {
			   'Content-Type': 'application/json'
			 },
            data: signUpJson
        };
        
		httpPostSignUpCall(request);
    
    };

    vm.loginMe = function(){
	   	console.log("do action on Modal login clicked--");
	   	var loginJson ={
			"username": vm.loginUsername,
			"password": vm.loginPassword,
		};
		var request = {
            method: 'POST',
            url: 'http://192.168.71.10:10010/api/aiuam/v1/users/login',
            headers: {
			   'Content-Type': 'application/json',
			 },
            data: loginJson
        };

	   	httpPostLoginCall(request);
	}

    var httpPostLoginCall = function(request) {

    	console.log("Inside httpPostCall function ");

        $http(request).then(function (response) {
            var tokenData = response.data;
            var obj = {
                "access_token" : tokenData.access_token,
                "expires_in" : tokenData.expires_in,
                "refresh_token" : tokenData.refresh_token,
                "expires_time" : localStorage.convertSecondsToDateTime(tokenData.expires_in),
                "uid" : tokenData.uid
            };

            if(localStorage.setAccessAndRefreshToken(obj)){
                $window.location.href = './dashboard.html';
            }


        }, function (error) {
            $scope.message = 'Unable to register you: Please make sure you have entered all the required fields';

            var dlgElem = angular.element("#modalLoginForm .modal-body");
            var errorMessage = '<div class="alert alert-danger">Please enter correct username / password. </div>';
            dlgElem.append(errorMessage);

		    // if (dlgElem) {
		    //    dlgElem.modal("hide");
		    // }
        });
    }

    var httpPostSignUpCall = function(request) {

        console.log("Inside httpPostCall function ");
        var dlgElem = angular.element("#modalRegisterForm");
        $http(request).then(function (response) {
            if (dlgElem) {
               dlgElem.modal("hide");
            }
        }, function (error) {
            
            // $scope.message = 'Unable to register you: Please make sure you have entered all the required fields';

            var dlgElem = angular.element("#modalRegisterForm .modal-body");
            var errorMessage = '<div class="alert alert-danger">Unable to sign up. Please make sure you have entered correct details. </div>';
            dlgElem.append(errorMessage);

            // if (dlgElem) {
            //    dlgElem.modal("hide");
            // }
        });
    }

}


app.controller('landingCtrl', landingCtrl);

landingCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory"];

app.component('landingComponent',{
  templateUrl:'../app/templates/landing.html',
  controller: 'landingCtrl',
  controllerAs: 'vm'
});