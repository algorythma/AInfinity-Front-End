/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('web-content-portal', ['ngComponentRouter']);

app.value('$routerRootComponent','landing');
app.component('landing',{
  template:'<landing-component></landing-component><ng-outlet></ng-outlet>',
  $routeConfig:[
    // {path:'/',component:'homeComponent',name:'Home'}
  ]
});


app.value('$routerRootComponent','dashboard');
app.component('dashboard',{
  template:'<header-component></header-component><ng-outlet></ng-outlet>',
  $routeConfig:[
    {path:'/', component:'homeComponent', name:'Home'},
    {path:'/students', component:'studentComponent', name:'Student'},
    {path:'/class', component:'classComponent', name:'Class'},
    {path:'/assignments', component:'assignmentComponent', name:'Assignment'},
    {path:'/assignments/create', component:'createassignmentComponent', name:'Createsssignment'}
  ]
});


//Handle server error messages globally..
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q,$rootScope) {
        return {
            'responseError': function (responseError) {
                $rootScope.message = responseError.data.message;
                return $q.reject(responseError);
            }
        };
    });

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

}]);

app.factory("localStorage", function($window, $rootScope) {
    return {
        setAccessAndRefreshToken: function(val) {
          $window.localStorage && $window.localStorage.setItem('my-storage', JSON.stringify(val));
          return this;
        },
        getAccessAndRefreshToken: function() {
          return JSON.parse($window.localStorage && $window.localStorage.getItem('my-storage'));
        },

        clearLocalStorageKey: function(){
          $window.localStorage.removeItem("my-storage");
          return this;
        },

        convertSecondsToDateTime: function(totalSeconds) {

          console.log("Inside convertSecondsToDateTime = " + totalSeconds);

          var hours   = Math.floor(totalSeconds / 3600);
          var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
          var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
          // round seconds
          seconds = Math.round(seconds * 100) / 100

          var now = new Date();
          var later = new Date();
          later.setHours(now.getHours()+hours);
          later.setMinutes(now.getMinutes()+minutes);
          //later.setSeconds(now.getSeconds()+seconds);

          later = later.getDate() + "-" + (later.getMonth()+1) + "-" + later.getFullYear() +  " " + later.getHours() + "-" + (later.getMinutes());
          return later;
        }

    };
});

app.factory("modalFactory", function($window, $rootScope){

  return{

      openModal: function(modalType){

        console.log("Inside openModal function modalType =" + modalType);
        var dlgElem;
        switch (modalType) {
            case "modalLoginForm" :
                dlgElem = angular.element("#modalLoginForm");
                break; 
            case "modalRegisterForm" :
                dlgElem = angular.element("#modalRegisterForm");
                break; 
            case "forceLogoutModal" :
                dlgElem = angular.element("#forceLogoutModal");
                break;
            case "modalForgot" :
                dlgElem = angular.element("#modalForgot");
                break; 
            default: 
                dlgElem = angular.element("#forceLogoutModal");
        }
        
        if (dlgElem) {
            dlgElem.modal("show");
        }
    }

  };

});




/***/ }),

/***/ "./src/app/assets/static/constants.js":
/*!********************************************!*\
  !*** ./src/app/assets/static/constants.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

app.constant('CONSTANTS',{

	SIGN_UP	: 'Sign Up',
	SIGN_IN : 'Sign In',
	MASTER : 'Lets be Master...',
	NEW_ASSIGNMENT : 'New Assignment',



	INVALID_EMAIL : 'Please enter valid email address',
	FORGET_SUCCESS : 'Please check your email to reset your password.',
	INVALID_DOB : 'DOB must be in mm-dd-yyyy format.',
	USERNAME_EXISTS : 'Username already exists.',
	INVALID_USERNAME_PASSWORD : 'Invalid Username/Password.',
	MISSING_PARAMETER : 'Missing required parameter in the request. Please try again.',
	INTERNAL_SERVER_ERROR : 'Internal server error. Please try again later.',
	SESSION_EXPIRED : 'Your session is expired. Please logout and login.',
	REQUEST_FAILED : 'Request failed. Please try again.'
});


/***/ }),

/***/ "./src/app/components/assignment.component.js":
/*!****************************************************!*\
  !*** ./src/app/components/assignment.component.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var assignmentCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('assignmentCtrl', assignmentCtrl);

app.component('assignmentComponent',{
  templateUrl:'../src/app/templates/assignment.html',
  controller: 'assignmentCtrl',
  controllerAs: 'vm'
});

/***/ }),

/***/ "./src/app/components/class.component.js":
/*!***********************************************!*\
  !*** ./src/app/components/class.component.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var classCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('classCtrl', classCtrl);

app.component('classComponent',{
  templateUrl:'../src/app/templates/class.html',
  controller: 'classCtrl',
  controllerAs: 'vm'
});

/***/ }),

/***/ "./src/app/components/createassignment.component.js":
/*!**********************************************************!*\
  !*** ./src/app/components/createassignment.component.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var createassignmentCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('createassignmentCtrl', createassignmentCtrl);

createassignmentCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS"];

app.component('createassignmentComponent',{
  templateUrl:'../src/app/templates/createassignment.html',
  controller: 'createassignmentCtrl',
  controllerAs: 'vm'
});

/***/ }),

/***/ "./src/app/components/header.component.js":
/*!************************************************!*\
  !*** ./src/app/components/header.component.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var app = angular.module('web-content-portal');

var headerCtrl = function($http, $window, $scope, localStorage, modalFactory){
	var vm = this;

	var obj = localStorage.getAccessAndRefreshToken();

	var expiryDateTime = obj.expires_time;

	vm.updateUserInfo = function(){

		console.log("Inside updateUserInfo");

        obj = localStorage.getAccessAndRefreshToken();
        expiryDateTime = obj.expires_time;

		var userJson ={
			"first_name": "A17",
			"last_name": "b17",
			"user_attributes": {
				"dob": "22-04-1987"
			}
		};
		var request = {
            method: 'PUT',
            url: 'http://192.168.71.10:10010/api/aiuam/v1/users/'+ obj.uid,
            headers: {
			   'Content-Type': 'application/json',
			   'Authorization': 'Bearer ' + obj.access_token
			 },
            data: userJson
        };

        if(isUserAuthenticated(vm.updateUserInfo)){
        	httpPutUpdateUserCall(request);
        }

    };

    //convert DateTime (dd-mm-yyyy hh-mm) to javascript DateTIme
    //Ex: 16-11-2015 16:05
    var toJSDate = function( dateTime ) {

        var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

        var date = dateTime[0].split("-");
        var time = dateTime[1].split("-");

        //(year, month, day, hours, minutes, seconds, milliseconds)
        //subtract 1 from month because Jan is 0 and Dec is 11
        return new Date(date[2], (date[1]-1), date[0], time[0], time[1], 0, 0);

    }

    //Check to see if the DateTime is in the future
    //param: dateTime must be a JS Date Object
    //return True if DateTime is after Now
    //return False if DateTIme is before Now
    function futureDateTime( dateTime ) {
        var now = new Date();
        var future = false;
        // console.log("Now date is =", now);
        // console.log("Expiry date is =", dateTime);

        if( Date.parse(now) < Date.parse(dateTime) ) {
            future = true;
        }
        
        return future;
    }

    var isUserAuthenticated = function(parentAPI){

    	console.log("Inside isUserAuthenticated expiryDateTime =" , expiryDateTime);

        var isValid = futureDateTime(toJSDate(expiryDateTime));

        console.log("isValid =", isValid);

    	if(isValid){
    		console.log('Access token is valid');
    		return true;
    	}else{
    		console.log('Invalid access token - Hit Refresh token API');
    		prepareRefreshTokenAPI(parentAPI);
    	}
		
	}

    var httpPutUpdateUserCall = function(request) {

    	console.log("Inside httpPutUpdateUserCall function ");

        $http(request).then(function (response) {

        }, function (error) {
          
        });
    }

    var prepareRefreshTokenAPI = function(parentAPI){

    	var refreshJson ={
			"refresh-token": obj.refresh_token
			}
		
		var request = {
            method: 'POST',
            url: 'http://192.168.71.10:10010/api/aiuam/v1/users/'+ obj.uid + '/token/refresh',
            headers: {
			   'Content-Type': 'application/json'
			 },
            data: refreshJson
        };

        httpPostRefreshTokenCall(request, parentAPI);
    }


    var httpPostRefreshTokenCall = function(request, parentAPI) {

    	console.log("Inside httpPostRefreshTokenCall function ");

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
            	console.log("Access and refresh token refreshed in local storage.");
            	vm.updateUserInfo();
            }else{
                //handle the case when local storage is unsuccessful..
                // show error message to user to redo the operation..
            }

        }, function (error) {
            console.log("Error from 1st API call =", error);
            modalFactory.openModal('forceLogoutModal');
            // Force logout user and take to the login page.
        });
    }

    vm.forceLogout = function(){
        if(localStorage.clearLocalStorageKey()){
            $window.location.href = './index.html';
        }
    }

    $( '#topheader .navbar-nav a' ).on( 'click', function () {
        $( '#topheader .navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
        $( this ).parent( 'li' ).addClass( 'active' );
    });

}


app.controller('headerCtrl', headerCtrl);

headerCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory"];

app.component('headerComponent',{
  templateUrl:'../src/app/templates/header.html',
  controller: 'headerCtrl',
  controllerAs: 'vm'
});


/***/ }),

/***/ "./src/app/components/home.component.js":
/*!**********************************************!*\
  !*** ./src/app/components/home.component.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var homeCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next, previous) {
		console.log("Inside routerOnActivate ");
	}

}

app.controller('homeCtrl', homeCtrl);

app.component('homeComponent',{
  template: '',
  controller: 'homeCtrl',
  controllerAs: 'vm',
  bindings: { $router: '<' }
});

/***/ }),

/***/ "./src/app/components/landing.component.js":
/*!*************************************************!*\
  !*** ./src/app/components/landing.component.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var landingCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
    $scope.CONSTANTS = CONSTANTS;

    // $('.datepicker').datepicker({
    //     format: 'mm/dd/yyyy',
    //     startDate: '-3d'
    // });

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

/***/ }),

/***/ "./src/app/components/student.component.js":
/*!*************************************************!*\
  !*** ./src/app/components/student.component.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/app/components/user.component.js":
/*!**********************************************!*\
  !*** ./src/app/components/user.component.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var userCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	this.$routerOnActivate = function(next, previous) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('userCtrl', userCtrl);

userCtrl.$inject = ["$http", "$window", "$scope", "localStorage"];

app.component('userComponent',{
  templateUrl:'../src/app/templates/user.html',
  controller: 'userCtrl',
  controllerAs: 'vm',
  bindings: { $router: '<' }
});

/***/ }),

/***/ 0:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./app.js ./src/app/assets/static/constants.js ./src/app/components/landing.component.js ./src/app/components/header.component.js ./src/app/components/home.component.js ./src/app/components/student.component.js ./src/app/components/class.component.js ./src/app/components/assignment.component.js ./src/app/components/user.component.js ./src/app/components/createassignment.component.js ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./app.js */"./app.js");
__webpack_require__(/*! ./src/app/assets/static/constants.js */"./src/app/assets/static/constants.js");
__webpack_require__(/*! ./src/app/components/landing.component.js */"./src/app/components/landing.component.js");
__webpack_require__(/*! ./src/app/components/header.component.js */"./src/app/components/header.component.js");
__webpack_require__(/*! ./src/app/components/home.component.js */"./src/app/components/home.component.js");
__webpack_require__(/*! ./src/app/components/student.component.js */"./src/app/components/student.component.js");
__webpack_require__(/*! ./src/app/components/class.component.js */"./src/app/components/class.component.js");
__webpack_require__(/*! ./src/app/components/assignment.component.js */"./src/app/components/assignment.component.js");
__webpack_require__(/*! ./src/app/components/user.component.js */"./src/app/components/user.component.js");
module.exports = __webpack_require__(/*! ./src/app/components/createassignment.component.js */"./src/app/components/createassignment.component.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYXNzZXRzL3N0YXRpYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2Fzc2lnbm1lbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9jbGFzcy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2NyZWF0ZWFzc2lnbm1lbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbGFuZGluZy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL3N0dWRlbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy91c2VyLmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25FQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxpREFBaUQ7QUFDdEQsS0FBSywrREFBK0Q7QUFDcEUsS0FBSyx3REFBd0Q7QUFDN0QsS0FBSyx3RUFBd0U7QUFDN0UsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNsSEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNwQkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDakJEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2pCRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7Ozs7QUNuQkQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFNBQVM7O0FBRVQsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzVLRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDLEU7Ozs7Ozs7Ozs7O0FDbEJEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUMvTkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDakJEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUMsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcsIFsnbmdDb21wb25lbnRSb3V0ZXInXSk7XG5cbmFwcC52YWx1ZSgnJHJvdXRlclJvb3RDb21wb25lbnQnLCdsYW5kaW5nJyk7XG5hcHAuY29tcG9uZW50KCdsYW5kaW5nJyx7XG4gIHRlbXBsYXRlOic8bGFuZGluZy1jb21wb25lbnQ+PC9sYW5kaW5nLWNvbXBvbmVudD48bmctb3V0bGV0Pjwvbmctb3V0bGV0PicsXG4gICRyb3V0ZUNvbmZpZzpbXG4gICAgLy8ge3BhdGg6Jy8nLGNvbXBvbmVudDonaG9tZUNvbXBvbmVudCcsbmFtZTonSG9tZSd9XG4gIF1cbn0pO1xuXG5cbmFwcC52YWx1ZSgnJHJvdXRlclJvb3RDb21wb25lbnQnLCdkYXNoYm9hcmQnKTtcbmFwcC5jb21wb25lbnQoJ2Rhc2hib2FyZCcse1xuICB0ZW1wbGF0ZTonPGhlYWRlci1jb21wb25lbnQ+PC9oZWFkZXItY29tcG9uZW50PjxuZy1vdXRsZXQ+PC9uZy1vdXRsZXQ+JyxcbiAgJHJvdXRlQ29uZmlnOltcbiAgICB7cGF0aDonLycsIGNvbXBvbmVudDonaG9tZUNvbXBvbmVudCcsIG5hbWU6J0hvbWUnfSxcbiAgICB7cGF0aDonL3N0dWRlbnRzJywgY29tcG9uZW50OidzdHVkZW50Q29tcG9uZW50JywgbmFtZTonU3R1ZGVudCd9LFxuICAgIHtwYXRoOicvY2xhc3MnLCBjb21wb25lbnQ6J2NsYXNzQ29tcG9uZW50JywgbmFtZTonQ2xhc3MnfSxcbiAgICB7cGF0aDonL2Fzc2lnbm1lbnRzJywgY29tcG9uZW50Oidhc3NpZ25tZW50Q29tcG9uZW50JywgbmFtZTonQXNzaWdubWVudCd9LFxuICAgIHtwYXRoOicvYXNzaWdubWVudHMvY3JlYXRlJywgY29tcG9uZW50OidjcmVhdGVhc3NpZ25tZW50Q29tcG9uZW50JywgbmFtZTonQ3JlYXRlc3NzaWdubWVudCd9XG4gIF1cbn0pO1xuXG5cbi8vSGFuZGxlIHNlcnZlciBlcnJvciBtZXNzYWdlcyBnbG9iYWxseS4uXG5hcHAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChmdW5jdGlvbiAoJHEsJHJvb3RTY29wZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Jlc3BvbnNlRXJyb3InOiBmdW5jdGlvbiAocmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUubWVzc2FnZSA9IHJlc3BvbnNlRXJyb3IuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2VFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbiA9IHt9O1xuICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucG9zdCA9IHt9O1xuICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucHV0ID0ge307XG4gICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wYXRjaCA9IHt9O1xuXG59XSk7XG5cbmFwcC5mYWN0b3J5KFwibG9jYWxTdG9yYWdlXCIsIGZ1bmN0aW9uKCR3aW5kb3csICRyb290U2NvcGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRBY2Nlc3NBbmRSZWZyZXNoVG9rZW46IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICR3aW5kb3cubG9jYWxTdG9yYWdlICYmICR3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ215LXN0b3JhZ2UnLCBKU09OLnN0cmluZ2lmeSh2YWwpKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSgkd2luZG93LmxvY2FsU3RvcmFnZSAmJiAkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdteS1zdG9yYWdlJykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyTG9jYWxTdG9yYWdlS2V5OiBmdW5jdGlvbigpe1xuICAgICAgICAgICR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJteS1zdG9yYWdlXCIpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbnZlcnRTZWNvbmRzVG9EYXRlVGltZTogZnVuY3Rpb24odG90YWxTZWNvbmRzKSB7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBjb252ZXJ0U2Vjb25kc1RvRGF0ZVRpbWUgPSBcIiArIHRvdGFsU2Vjb25kcyk7XG5cbiAgICAgICAgICB2YXIgaG91cnMgICA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XG4gICAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgICAgICAgdmFyIHNlY29uZHMgPSB0b3RhbFNlY29uZHMgLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuICAgICAgICAgIC8vIHJvdW5kIHNlY29uZHNcbiAgICAgICAgICBzZWNvbmRzID0gTWF0aC5yb3VuZChzZWNvbmRzICogMTAwKSAvIDEwMFxuXG4gICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgdmFyIGxhdGVyID0gbmV3IERhdGUoKTtcbiAgICAgICAgICBsYXRlci5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKStob3Vycyk7XG4gICAgICAgICAgbGF0ZXIuc2V0TWludXRlcyhub3cuZ2V0TWludXRlcygpK21pbnV0ZXMpO1xuICAgICAgICAgIC8vbGF0ZXIuc2V0U2Vjb25kcyhub3cuZ2V0U2Vjb25kcygpK3NlY29uZHMpO1xuXG4gICAgICAgICAgbGF0ZXIgPSBsYXRlci5nZXREYXRlKCkgKyBcIi1cIiArIChsYXRlci5nZXRNb250aCgpKzEpICsgXCItXCIgKyBsYXRlci5nZXRGdWxsWWVhcigpICsgIFwiIFwiICsgbGF0ZXIuZ2V0SG91cnMoKSArIFwiLVwiICsgKGxhdGVyLmdldE1pbnV0ZXMoKSk7XG4gICAgICAgICAgcmV0dXJuIGxhdGVyO1xuICAgICAgICB9XG5cbiAgICB9O1xufSk7XG5cbmFwcC5mYWN0b3J5KFwibW9kYWxGYWN0b3J5XCIsIGZ1bmN0aW9uKCR3aW5kb3csICRyb290U2NvcGUpe1xuXG4gIHJldHVybntcblxuICAgICAgb3Blbk1vZGFsOiBmdW5jdGlvbihtb2RhbFR5cGUpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIG9wZW5Nb2RhbCBmdW5jdGlvbiBtb2RhbFR5cGUgPVwiICsgbW9kYWxUeXBlKTtcbiAgICAgICAgdmFyIGRsZ0VsZW07XG4gICAgICAgIHN3aXRjaCAobW9kYWxUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibW9kYWxMb2dpbkZvcm1cIiA6XG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbExvZ2luRm9ybVwiKTtcbiAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBjYXNlIFwibW9kYWxSZWdpc3RlckZvcm1cIiA6XG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbFJlZ2lzdGVyRm9ybVwiKTtcbiAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBjYXNlIFwiZm9yY2VMb2dvdXRNb2RhbFwiIDpcbiAgICAgICAgICAgICAgICBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI2ZvcmNlTG9nb3V0TW9kYWxcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibW9kYWxGb3Jnb3RcIiA6XG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbEZvcmdvdFwiKTtcbiAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICAgICAgICBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI2ZvcmNlTG9nb3V0TW9kYWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChkbGdFbGVtKSB7XG4gICAgICAgICAgICBkbGdFbGVtLm1vZGFsKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICB9O1xuXG59KTtcblxuXG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG5hcHAuY29uc3RhbnQoJ0NPTlNUQU5UUycse1xuXG5cdFNJR05fVVBcdDogJ1NpZ24gVXAnLFxuXHRTSUdOX0lOIDogJ1NpZ24gSW4nLFxuXHRNQVNURVIgOiAnTGV0cyBiZSBNYXN0ZXIuLi4nLFxuXHRORVdfQVNTSUdOTUVOVCA6ICdOZXcgQXNzaWdubWVudCcsXG5cblxuXG5cdElOVkFMSURfRU1BSUwgOiAnUGxlYXNlIGVudGVyIHZhbGlkIGVtYWlsIGFkZHJlc3MnLFxuXHRGT1JHRVRfU1VDQ0VTUyA6ICdQbGVhc2UgY2hlY2sgeW91ciBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkLicsXG5cdElOVkFMSURfRE9CIDogJ0RPQiBtdXN0IGJlIGluIG1tLWRkLXl5eXkgZm9ybWF0LicsXG5cdFVTRVJOQU1FX0VYSVNUUyA6ICdVc2VybmFtZSBhbHJlYWR5IGV4aXN0cy4nLFxuXHRJTlZBTElEX1VTRVJOQU1FX1BBU1NXT1JEIDogJ0ludmFsaWQgVXNlcm5hbWUvUGFzc3dvcmQuJyxcblx0TUlTU0lOR19QQVJBTUVURVIgOiAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgaW4gdGhlIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW4uJyxcblx0SU5URVJOQUxfU0VSVkVSX0VSUk9SIDogJ0ludGVybmFsIHNlcnZlciBlcnJvci4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nLFxuXHRTRVNTSU9OX0VYUElSRUQgOiAnWW91ciBzZXNzaW9uIGlzIGV4cGlyZWQuIFBsZWFzZSBsb2dvdXQgYW5kIGxvZ2luLicsXG5cdFJFUVVFU1RfRkFJTEVEIDogJ1JlcXVlc3QgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLidcbn0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGFzc2lnbm1lbnRDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2bS4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdhc3NpZ25tZW50Q3RybCcsIGFzc2lnbm1lbnRDdHJsKTtcblxuYXBwLmNvbXBvbmVudCgnYXNzaWdubWVudENvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvYXNzaWdubWVudC5odG1sJyxcbiAgY29udHJvbGxlcjogJ2Fzc2lnbm1lbnRDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgY2xhc3NDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ2NsYXNzQ3RybCcsIGNsYXNzQ3RybCk7XG5cbmFwcC5jb21wb25lbnQoJ2NsYXNzQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9jbGFzcy5odG1sJyxcbiAgY29udHJvbGxlcjogJ2NsYXNzQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGNyZWF0ZWFzc2lnbm1lbnRDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlLCBtb2RhbEZhY3RvcnksIENPTlNUQU5UUyl7XG5cdHZhciB2bSA9IHRoaXM7XG5cdCRzY29wZS5DT05TVEFOVFMgPSBDT05TVEFOVFM7XG5cblx0dm0uJHJvdXRlck9uQWN0aXZhdGUgPSBmdW5jdGlvbihuZXh0KSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgcm91dGVyT25BY3RpdmF0ZSBcIik7XG5cdH1cblxufVxuXG5hcHAuY29udHJvbGxlcignY3JlYXRlYXNzaWdubWVudEN0cmwnLCBjcmVhdGVhc3NpZ25tZW50Q3RybCk7XG5cbmNyZWF0ZWFzc2lnbm1lbnRDdHJsLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiR3aW5kb3dcIiwgXCIkc2NvcGVcIiwgXCJsb2NhbFN0b3JhZ2VcIiwgXCJtb2RhbEZhY3RvcnlcIiwgXCJDT05TVEFOVFNcIl07XG5cbmFwcC5jb21wb25lbnQoJ2NyZWF0ZWFzc2lnbm1lbnRDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL2NyZWF0ZWFzc2lnbm1lbnQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdjcmVhdGVhc3NpZ25tZW50Q3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwiXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgaGVhZGVyQ3RybCA9IGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkc2NvcGUsIGxvY2FsU3RvcmFnZSwgbW9kYWxGYWN0b3J5KXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2YXIgb2JqID0gbG9jYWxTdG9yYWdlLmdldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbigpO1xuXG5cdHZhciBleHBpcnlEYXRlVGltZSA9IG9iai5leHBpcmVzX3RpbWU7XG5cblx0dm0udXBkYXRlVXNlckluZm8gPSBmdW5jdGlvbigpe1xuXG5cdFx0Y29uc29sZS5sb2coXCJJbnNpZGUgdXBkYXRlVXNlckluZm9cIik7XG5cbiAgICAgICAgb2JqID0gbG9jYWxTdG9yYWdlLmdldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbigpO1xuICAgICAgICBleHBpcnlEYXRlVGltZSA9IG9iai5leHBpcmVzX3RpbWU7XG5cblx0XHR2YXIgdXNlckpzb24gPXtcblx0XHRcdFwiZmlyc3RfbmFtZVwiOiBcIkExN1wiLFxuXHRcdFx0XCJsYXN0X25hbWVcIjogXCJiMTdcIixcblx0XHRcdFwidXNlcl9hdHRyaWJ1dGVzXCI6IHtcblx0XHRcdFx0XCJkb2JcIjogXCIyMi0wNC0xOTg3XCJcblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy8nKyBvYmoudWlkLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuXHRcdFx0ICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdCAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgb2JqLmFjY2Vzc190b2tlblxuXHRcdFx0IH0sXG4gICAgICAgICAgICBkYXRhOiB1c2VySnNvblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKGlzVXNlckF1dGhlbnRpY2F0ZWQodm0udXBkYXRlVXNlckluZm8pKXtcbiAgICAgICAgXHRodHRwUHV0VXBkYXRlVXNlckNhbGwocmVxdWVzdCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvL2NvbnZlcnQgRGF0ZVRpbWUgKGRkLW1tLXl5eXkgaGgtbW0pIHRvIGphdmFzY3JpcHQgRGF0ZVRJbWVcbiAgICAvL0V4OiAxNi0xMS0yMDE1IDE2OjA1XG4gICAgdmFyIHRvSlNEYXRlID0gZnVuY3Rpb24oIGRhdGVUaW1lICkge1xuXG4gICAgICAgIHZhciBkYXRlVGltZSA9IGRhdGVUaW1lLnNwbGl0KFwiIFwiKTsvL2RhdGVUaW1lWzBdID0gZGF0ZSwgZGF0ZVRpbWVbMV0gPSB0aW1lXG5cbiAgICAgICAgdmFyIGRhdGUgPSBkYXRlVGltZVswXS5zcGxpdChcIi1cIik7XG4gICAgICAgIHZhciB0aW1lID0gZGF0ZVRpbWVbMV0uc3BsaXQoXCItXCIpO1xuXG4gICAgICAgIC8vKHllYXIsIG1vbnRoLCBkYXksIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpXG4gICAgICAgIC8vc3VidHJhY3QgMSBmcm9tIG1vbnRoIGJlY2F1c2UgSmFuIGlzIDAgYW5kIERlYyBpcyAxMVxuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVsyXSwgKGRhdGVbMV0tMSksIGRhdGVbMF0sIHRpbWVbMF0sIHRpbWVbMV0sIDAsIDApO1xuXG4gICAgfVxuXG4gICAgLy9DaGVjayB0byBzZWUgaWYgdGhlIERhdGVUaW1lIGlzIGluIHRoZSBmdXR1cmVcbiAgICAvL3BhcmFtOiBkYXRlVGltZSBtdXN0IGJlIGEgSlMgRGF0ZSBPYmplY3RcbiAgICAvL3JldHVybiBUcnVlIGlmIERhdGVUaW1lIGlzIGFmdGVyIE5vd1xuICAgIC8vcmV0dXJuIEZhbHNlIGlmIERhdGVUSW1lIGlzIGJlZm9yZSBOb3dcbiAgICBmdW5jdGlvbiBmdXR1cmVEYXRlVGltZSggZGF0ZVRpbWUgKSB7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgZnV0dXJlID0gZmFsc2U7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm93IGRhdGUgaXMgPVwiLCBub3cpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV4cGlyeSBkYXRlIGlzID1cIiwgZGF0ZVRpbWUpO1xuXG4gICAgICAgIGlmKCBEYXRlLnBhcnNlKG5vdykgPCBEYXRlLnBhcnNlKGRhdGVUaW1lKSApIHtcbiAgICAgICAgICAgIGZ1dHVyZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdXR1cmU7XG4gICAgfVxuXG4gICAgdmFyIGlzVXNlckF1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbihwYXJlbnRBUEkpe1xuXG4gICAgXHRjb25zb2xlLmxvZyhcIkluc2lkZSBpc1VzZXJBdXRoZW50aWNhdGVkIGV4cGlyeURhdGVUaW1lID1cIiAsIGV4cGlyeURhdGVUaW1lKTtcblxuICAgICAgICB2YXIgaXNWYWxpZCA9IGZ1dHVyZURhdGVUaW1lKHRvSlNEYXRlKGV4cGlyeURhdGVUaW1lKSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJpc1ZhbGlkID1cIiwgaXNWYWxpZCk7XG5cbiAgICBcdGlmKGlzVmFsaWQpe1xuICAgIFx0XHRjb25zb2xlLmxvZygnQWNjZXNzIHRva2VuIGlzIHZhbGlkJyk7XG4gICAgXHRcdHJldHVybiB0cnVlO1xuICAgIFx0fWVsc2V7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdJbnZhbGlkIGFjY2VzcyB0b2tlbiAtIEhpdCBSZWZyZXNoIHRva2VuIEFQSScpO1xuICAgIFx0XHRwcmVwYXJlUmVmcmVzaFRva2VuQVBJKHBhcmVudEFQSSk7XG4gICAgXHR9XG5cdFx0XG5cdH1cblxuICAgIHZhciBodHRwUHV0VXBkYXRlVXNlckNhbGwgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG5cbiAgICBcdGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQdXRVcGRhdGVVc2VyQ2FsbCBmdW5jdGlvbiBcIik7XG5cbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHByZXBhcmVSZWZyZXNoVG9rZW5BUEkgPSBmdW5jdGlvbihwYXJlbnRBUEkpe1xuXG4gICAgXHR2YXIgcmVmcmVzaEpzb24gPXtcblx0XHRcdFwicmVmcmVzaC10b2tlblwiOiBvYmoucmVmcmVzaF90b2tlblxuXHRcdFx0fVxuXHRcdFxuXHRcdHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vMTkyLjE2OC43MS4xMDoxMDAxMC9hcGkvYWl1YW0vdjEvdXNlcnMvJysgb2JqLnVpZCArICcvdG9rZW4vcmVmcmVzaCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG5cdFx0XHQgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHQgfSxcbiAgICAgICAgICAgIGRhdGE6IHJlZnJlc2hKc29uXG4gICAgICAgIH07XG5cbiAgICAgICAgaHR0cFBvc3RSZWZyZXNoVG9rZW5DYWxsKHJlcXVlc3QsIHBhcmVudEFQSSk7XG4gICAgfVxuXG5cbiAgICB2YXIgaHR0cFBvc3RSZWZyZXNoVG9rZW5DYWxsID0gZnVuY3Rpb24ocmVxdWVzdCwgcGFyZW50QVBJKSB7XG5cbiAgICBcdGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0UmVmcmVzaFRva2VuQ2FsbCBmdW5jdGlvbiBcIik7XG5cbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICBcdHZhciB0b2tlbkRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICBcImFjY2Vzc190b2tlblwiIDogdG9rZW5EYXRhLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcImV4cGlyZXNfaW5cIiA6IHRva2VuRGF0YS5leHBpcmVzX2luLFxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF90b2tlblwiIDogdG9rZW5EYXRhLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJleHBpcmVzX3RpbWVcIiA6IGxvY2FsU3RvcmFnZS5jb252ZXJ0U2Vjb25kc1RvRGF0ZVRpbWUodG9rZW5EYXRhLmV4cGlyZXNfaW4pLFxuICAgICAgICAgICAgICAgIFwidWlkXCIgOiB0b2tlbkRhdGEudWlkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihsb2NhbFN0b3JhZ2Uuc2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKG9iaikpe1xuICAgICAgICAgICAgXHRjb25zb2xlLmxvZyhcIkFjY2VzcyBhbmQgcmVmcmVzaCB0b2tlbiByZWZyZXNoZWQgaW4gbG9jYWwgc3RvcmFnZS5cIik7XG4gICAgICAgICAgICBcdHZtLnVwZGF0ZVVzZXJJbmZvKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL2hhbmRsZSB0aGUgY2FzZSB3aGVuIGxvY2FsIHN0b3JhZ2UgaXMgdW5zdWNjZXNzZnVsLi5cbiAgICAgICAgICAgICAgICAvLyBzaG93IGVycm9yIG1lc3NhZ2UgdG8gdXNlciB0byByZWRvIHRoZSBvcGVyYXRpb24uLlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmcm9tIDFzdCBBUEkgY2FsbCA9XCIsIGVycm9yKTtcbiAgICAgICAgICAgIG1vZGFsRmFjdG9yeS5vcGVuTW9kYWwoJ2ZvcmNlTG9nb3V0TW9kYWwnKTtcbiAgICAgICAgICAgIC8vIEZvcmNlIGxvZ291dCB1c2VyIGFuZCB0YWtlIHRvIHRoZSBsb2dpbiBwYWdlLlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2bS5mb3JjZUxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5jbGVhckxvY2FsU3RvcmFnZUtleSgpKXtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL2luZGV4Lmh0bWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCggJyN0b3BoZWFkZXIgLm5hdmJhci1uYXYgYScgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCAnI3RvcGhlYWRlciAubmF2YmFyLW5hdicgKS5maW5kKCAnbGkuYWN0aXZlJyApLnJlbW92ZUNsYXNzKCAnYWN0aXZlJyApO1xuICAgICAgICAkKCB0aGlzICkucGFyZW50KCAnbGknICkuYWRkQ2xhc3MoICdhY3RpdmUnICk7XG4gICAgfSk7XG5cbn1cblxuXG5hcHAuY29udHJvbGxlcignaGVhZGVyQ3RybCcsIGhlYWRlckN0cmwpO1xuXG5oZWFkZXJDdHJsLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiR3aW5kb3dcIiwgXCIkc2NvcGVcIiwgXCJsb2NhbFN0b3JhZ2VcIiwgXCJtb2RhbEZhY3RvcnlcIl07XG5cbmFwcC5jb21wb25lbnQoJ2hlYWRlckNvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvaGVhZGVyLmh0bWwnLFxuICBjb250cm9sbGVyOiAnaGVhZGVyQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7XG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgaG9tZUN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2Upe1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHRoaXMuJHJvdXRlck9uQWN0aXZhdGUgPSBmdW5jdGlvbihuZXh0LCBwcmV2aW91cykge1xuXHRcdGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ2hvbWVDdHJsJywgaG9tZUN0cmwpO1xuXG5hcHAuY29tcG9uZW50KCdob21lQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlOiAnJyxcbiAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nLFxuICBiaW5kaW5nczogeyAkcm91dGVyOiAnPCcgfVxufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGxhbmRpbmdDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlLCBtb2RhbEZhY3RvcnksIENPTlNUQU5UUyl7XG5cdHZhciB2bSA9IHRoaXM7XG4gICAgJHNjb3BlLkNPTlNUQU5UUyA9IENPTlNUQU5UUztcblxuICAgIC8vICQoJy5kYXRlcGlja2VyJykuZGF0ZXBpY2tlcih7XG4gICAgLy8gICAgIGZvcm1hdDogJ21tL2RkL3l5eXknLFxuICAgIC8vICAgICBzdGFydERhdGU6ICctM2QnXG4gICAgLy8gfSk7XG5cbiAgICB2bS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIubW9kYWxcIik7XG4gICAgICAgIGlmIChkbGdFbGVtKSB7XG4gICAgICAgICAgICBkbGdFbGVtLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZtLm9wZW5Gb3Jnb3RNb2RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZtLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgdm0ub3Blbk1vZGFsKCdtb2RhbEZvcmdvdCcpO1xuICAgIH1cblxuXHR2bS5vcGVuTW9kYWwgPSBmdW5jdGlvbihtb2RhbFR5cGUpe1xuXHRcdGNvbnNvbGUubG9nKFwiSW5zaWRlIG9wZW5SZWdpc3Rlck1vZGFsIGZ1bmN0aW9uIG1vZGFsVHlwZSA9XCIgKyBtb2RhbFR5cGUpO1xuXHRcdG1vZGFsRmFjdG9yeS5vcGVuTW9kYWwobW9kYWxUeXBlKTtcblx0fVxuXG5cdHZtLnJlZ2lzdGVyTWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJkbyBhY3Rpb24gb24gTW9kYWwgc2lnbiB1cCBjbGlja2VkLS1cIik7XG5cbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxSZWdpc3RlckZvcm0gLm1vZGFsLWJvZHkgLmFsZXJ0XCIpO1xuICAgICAgICBpZihkbGdFbGVtKXtcbiAgICAgICAgICAgIGRsZ0VsZW0uZGV0YWNoKCk7XG4gICAgICAgIH1cblxuXHRcdHZhciBzaWduVXBKc29uID17XG5cdFx0XHRcImVtYWlsXCI6IHZtLnJlZ2lzdGVyRW1haWwsXG5cdFx0XHRcImZpcnN0X25hbWVcIjogdm0ucmVnaXN0ZXJGaXJzdE5hbWUsXG5cdFx0XHRcImxhc3RfbmFtZVwiOiB2bS5yZWdpc3Rlckxhc3ROYW1lLFxuXHRcdFx0XCJwYXNzd29yZFwiOiB2bS5yZWdpc3RlclBhc3N3b3JkLFxuXHRcdFx0XCJ1c2VyX2F0dHJpYnV0ZXNcIjoge1xuXHRcdFx0XHRcImRvYlwiOiB2bS5yZWdpc3RlckRvYlxuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy9zaWdudXAnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuXHRcdFx0ICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0IH0sXG4gICAgICAgICAgICBkYXRhOiBzaWduVXBKc29uXG4gICAgICAgIH07XG4gICAgICAgIFxuXHRcdGh0dHBQb3N0U2lnblVwQ2FsbChyZXF1ZXN0KTtcbiAgICBcbiAgICB9O1xuXG4gICAgdm0ubG9naW5NZSA9IGZ1bmN0aW9uKCl7XG5cdCAgIFx0Y29uc29sZS5sb2coXCJkbyBhY3Rpb24gb24gTW9kYWwgbG9naW4gY2xpY2tlZC0tXCIpO1xuXG4gICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsTG9naW5Gb3JtIC5tb2RhbC1ib2R5IC5hbGVydFwiKTtcbiAgICAgICAgaWYoZGxnRWxlbSl7XG4gICAgICAgICAgICBkbGdFbGVtLmRldGFjaCgpO1xuICAgICAgICB9XG5cblx0ICAgXHR2YXIgbG9naW5Kc29uID17XG5cdFx0XHRcInVzZXJuYW1lXCI6IHZtLmxvZ2luVXNlcm5hbWUsXG5cdFx0XHRcInBhc3N3b3JkXCI6IHZtLmxvZ2luUGFzc3dvcmQsXG5cdFx0fTtcblx0XHR2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cDovLzE5Mi4xNjguNzEuMTA6MTAwMTAvYXBpL2FpdWFtL3YxL3VzZXJzL2xvZ2luJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcblx0XHRcdCAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHQgfSxcbiAgICAgICAgICAgIGRhdGE6IGxvZ2luSnNvblxuICAgICAgICB9O1xuXG5cdCAgIFx0aHR0cFBvc3RMb2dpbkNhbGwocmVxdWVzdCk7XG5cdH1cblxuICAgIHZtLmZvcmdvdFBhc3N3b3JkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJkbyBhY3Rpb24gb24gRm9yZ290IHBhc3N3b3JkIGNsaWNrLS1cIik7XG5cbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxGb3Jnb3QgLm1vZGFsLWJvZHkgLmFsZXJ0XCIpO1xuICAgICAgICBpZihkbGdFbGVtKXtcbiAgICAgICAgICAgIGRsZ0VsZW0uZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZm9yZ290SnNvbiA9e1xuICAgICAgICAgICAgXCJlbWFpbFwiOiB2bS5mb3Jnb3RVc2VyRW5haWxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy9mb3JnZXQtcGFzc3dvcmQnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YTogZm9yZ290SnNvblxuXG4gICAgICAgIH07XG5cbiAgICAgICAgaHR0cFBvc3RGb3Jnb3RQYXNzd29yZENhbGwocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgdmFyIGh0dHBQb3N0TG9naW5DYWxsID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuXG4gICAgXHRjb25zb2xlLmxvZyhcIkluc2lkZSBodHRwUG9zdENhbGwgZnVuY3Rpb24gXCIpO1xuXG4gICAgICAgICRodHRwKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5EYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgXCJhY2Nlc3NfdG9rZW5cIiA6IHRva2VuRGF0YS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJleHBpcmVzX2luXCIgOiB0b2tlbkRhdGEuZXhwaXJlc19pbixcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfdG9rZW5cIiA6IHRva2VuRGF0YS5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiZXhwaXJlc190aW1lXCIgOiBsb2NhbFN0b3JhZ2UuY29udmVydFNlY29uZHNUb0RhdGVUaW1lKHRva2VuRGF0YS5leHBpcmVzX2luKSxcbiAgICAgICAgICAgICAgICBcInVpZFwiIDogdG9rZW5EYXRhLnVpZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYobG9jYWxTdG9yYWdlLnNldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbihvYmopKXtcbiAgICAgICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLi9kYXNoYm9hcmQuaHRtbCc7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgdmFyIGVycm9yRGVzY3JpcHRpb24gPSBjcmVhdGVFcnJvck1lc3NhZ2VzKGVycm9yKTtcbiAgICAgICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsTG9naW5Gb3JtIC5tb2RhbC1ib2R5XCIpO1xuICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+JyArZXJyb3JEZXNjcmlwdGlvbiArJyA8L2Rpdj4nO1xuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGh0dHBQb3N0U2lnblVwQ2FsbCA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBodHRwUG9zdENhbGwgZnVuY3Rpb24gXCIpO1xuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbFJlZ2lzdGVyRm9ybVwiKTtcbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChkbGdFbGVtKSB7XG4gICAgICAgICAgICAgICBkbGdFbGVtLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG5cbiAgICAgICAgICAgIHZhciBlcnJvckRlc2NyaXB0aW9uID0gY3JlYXRlRXJyb3JNZXNzYWdlcyhlcnJvcik7XG4gICAgICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbFJlZ2lzdGVyRm9ybSAubW9kYWwtYm9keVwiKTtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicgKyBlcnJvckRlc2NyaXB0aW9uICsnIDwvZGl2Pic7XG4gICAgICAgICAgICBkbGdFbGVtLmFwcGVuZChlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBodHRwUG9zdEZvcmdvdFBhc3N3b3JkQ2FsbCA9IGZ1bmN0aW9uKHJlcXVlc3Qpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0Rm9yZ290UGFzc3dvcmRDYWxsIGZ1bmN0aW9uIFwiKTtcblxuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbEZvcmdvdCAubW9kYWwtYm9keVwiKTtcblxuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nKyBDT05TVEFOVFMuSU5WQUxJRF9FTUFJTCArICc8L2Rpdj4nO1xuXG4gICAgICAgICRodHRwKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5EYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzRmxhZyA9IHRva2VuRGF0YS5zdWNjZXNzO1xuXG4gICAgICAgICAgICBpZihzdWNjZXNzRmxhZyl7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzXCI+JyArIENPTlNUQU5UUy5GT1JHRVRfU1VDQ0VTUyArICc8L2Rpdj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHZhciBjcmVhdGVFcnJvck1lc3NhZ2VzID0gZnVuY3Rpb24oZXJyb3JPYmope1xuXG4gICAgICAgIHZhciBlcnJDb2RlLCBlcnJEZXNjO1xuICAgICAgICAgICAgaWYoZXJyb3JPYmogIT0gbnVsbCl7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVycm9yT2JqLmRhdGEuZXJyb3JfY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwN1wiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuSU5WQUxJRF9ET0I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA1XCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5VU0VSTkFNRV9FWElTVFM7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDAzXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5JTlZBTElEX1VTRVJOQU1FX1BBU1NXT1JEO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA4XCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5JTlZBTElEX0VNQUlMO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwMVwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuTUlTU0lOR19QQVJBTUVURVI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI1MDAwXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5JTlRFUk5BTF9TRVJWRVJfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA0XCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5TRVNTSU9OX0VYUElSRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5SRVFVRVNUX0ZBSUxFRDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVyckRlc2M7XG4gICAgfVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdsYW5kaW5nQ3RybCcsIGxhbmRpbmdDdHJsKTtcblxubGFuZGluZ0N0cmwuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHdpbmRvd1wiLCBcIiRzY29wZVwiLCBcImxvY2FsU3RvcmFnZVwiLCBcIm1vZGFsRmFjdG9yeVwiLCBcIkNPTlNUQU5UU1wiXTtcblxuYXBwLmNvbXBvbmVudCgnbGFuZGluZ0NvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvbGFuZGluZy5odG1sJyxcbiAgY29udHJvbGxlcjogJ2xhbmRpbmdDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgc3R1ZGVudEN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2Upe1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHRoaXMuJHJvdXRlck9uQWN0aXZhdGUgPSBmdW5jdGlvbihuZXh0KSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgcm91dGVyT25BY3RpdmF0ZSBcIik7XG5cdH1cblxufVxuXG5hcHAuY29udHJvbGxlcignc3R1ZGVudEN0cmwnLCBzdHVkZW50Q3RybCk7XG5cbmFwcC5jb21wb25lbnQoJ3N0dWRlbnRDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL3N0dWRlbnQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdzdHVkZW50Q3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIHVzZXJDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCwgcHJldmlvdXMpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCd1c2VyQ3RybCcsIHVzZXJDdHJsKTtcblxudXNlckN0cmwuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHdpbmRvd1wiLCBcIiRzY29wZVwiLCBcImxvY2FsU3RvcmFnZVwiXTtcblxuYXBwLmNvbXBvbmVudCgndXNlckNvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvdXNlci5odG1sJyxcbiAgY29udHJvbGxlcjogJ3VzZXJDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nLFxuICBiaW5kaW5nczogeyAkcm91dGVyOiAnPCcgfVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==