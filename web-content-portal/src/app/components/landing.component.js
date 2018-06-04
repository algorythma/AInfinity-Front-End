var app = angular.module('web-content-portal');

var landingCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
    $scope.CONSTANTS = CONSTANTS;

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

            var errorDescription = createErrorMessages(error);
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

            var errorDescription = createErrorMessages(error);
            var dlgElem = angular.element("#modalRegisterForm .modal-body");
            var errorMessage = '<div class="alert alert-danger">' + errorDescription +' </div>';
            dlgElem.append(errorMessage);

        });
    }

    var httpPostForgotPasswordCall = function(request){

        console.log("Inside httpPostForgotPasswordCall function ");

        var dlgElem = angular.element("#modalForgot .modal-body");

        var errorMessage = '<div class="alert alert-danger">'+ CONSTANTS.INVALID_EMAIL + '</div>';

        $http(request).then(function (response) {
            var tokenData = response.data;
            var successFlag = tokenData.success;

            if(successFlag){
                errorMessage = '<div class="alert alert-success">' + CONSTANTS.FORGET_SUCCESS + '</div>';
            }
            dlgElem.append(errorMessage);
            
        }, function (error) {

            dlgElem.append(errorMessage);

        });

    }

    var createErrorMessages = function(errorObj){

        var errCode, errDesc;
            if(errorObj != null){

                switch (errorObj.data.error_code) {
                    case "1007" :
                        errDesc = CONSTANTS.INVALID_DOB;
                        break; 
                    case "1005" :
                        errDesc = CONSTANTS.USERNAME_EXISTS;
                        break; 
                    case "1003" :
                        errDesc = CONSTANTS.INVALID_USERNAME_PASSWORD;
                        break;
                    case "1008" :
                        errDesc = CONSTANTS.INVALID_EMAIL;
                        break; 
                    case "1001" :
                        errDesc = CONSTANTS.MISSING_PARAMETER;
                        break; 
                    case "5000" :
                        errDesc = CONSTANTS.INTERNAL_SERVER_ERROR;
                        break; 
                    case "1004" :
                        errDesc = CONSTANTS.SESSION_EXPIRED;
                        break; 
                    default: 
                        errDesc = CONSTANTS.REQUEST_FAILED;
            }

        }

        return errDesc;
    }

}

app.controller('landingCtrl', landingCtrl);

landingCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS"];

app.component('landingComponent',{
  templateUrl:'../src/app/templates/landing.html',
  controller: 'landingCtrl',
  controllerAs: 'vm'
});