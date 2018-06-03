var app = angular.module('web-content-portal');

var landingCtrl = function($http, $window, $scope, localStorage, modalFactory){
	var vm = this;

    vm.closeModal = function(){
        var dlgElem = angular.element(".modal");
        if (dlgElem) {
            dlgElem.modal("hide");
        }
    }

    vm.openForgotModal = function(){
        vm.closeModal();
        vm.openModal('modalForgot');
    }

	vm.openModal = function(modalType){
		console.log("Inside openRegisterModal function modalType =" + modalType);
		modalFactory.openModal(modalType);
	}

	vm.registerMe = function () {
		console.log("do action on Modal sign up clicked--");

        var dlgElem = angular.element("#modalRegisterForm .modal-body .alert");
        if(dlgElem){
            dlgElem.detach();
        }

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

        var dlgElem = angular.element("#modalLoginForm .modal-body .alert");
        if(dlgElem){
            dlgElem.detach();
        }

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

    vm.forgotPassword = function(){
        console.log("do action on Forgot password click--");

        var dlgElem = angular.element("#modalForgot .modal-body .alert");
        if(dlgElem){
            dlgElem.detach();
        }

        var forgotJson ={
            "email": vm.forgotUserEnail
        };
        var request = {
            method: 'POST',
            url: 'http://192.168.71.10:10010/api/aiuam/v1/users/forget-password',
            headers: {
               'Content-Type': 'application/json',
             },
            data: forgotJson

        };

        httpPostForgotPasswordCall(request);
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

		    var errorDescription = error.data.description;

            var dlgElem = angular.element("#modalLoginForm .modal-body");
            var errorMessage = '<div class="alert alert-danger">' +errorDescription +' </div>';
            dlgElem.append(errorMessage);
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
            var errorDescription = error.data.description;

            var dlgElem = angular.element("#modalRegisterForm .modal-body");
            var errorMessage = '<div class="alert alert-danger">' +errorDescription +' </div>';
            dlgElem.append(errorMessage);

        });
    }

    var httpPostForgotPasswordCall = function(request){

        console.log("Inside httpPostForgotPasswordCall function ");

        var dlgElem = angular.element("#modalForgot .modal-body");

        var errorMessage = '<div class="alert alert-danger">Please enter valid email address. </div>';

        $http(request).then(function (response) {
            var tokenData = response.data;
            var successFlag = tokenData.success;
            console.log("Success value=", tokenData.success);
            // show success message to user

            if(successFlag){
                errorMessage = '<div class="alert alert-success">Please check your email to reset your password.</div>';
            }
            dlgElem.append(errorMessage);
            
        }, function (error) {

            dlgElem.append(errorMessage);

        });

    }

}

app.controller('landingCtrl', landingCtrl);

landingCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory"];

app.component('landingComponent',{
  templateUrl:'../src/app/templates/landing.html',
  controller: 'landingCtrl',
  controllerAs: 'vm'
});