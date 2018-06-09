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
    // {path:'/assignments', component:'assignmentComponent', name:'Assignment'},
    {path:'/create/contentgroup', component:'createContentGroupComponent', name:'CreateContentGroup'},
    {path:'/create/unit', component:'createUnitComponent', name:'CreateUnit'}
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
	NEW_CONTENT_GROUP : 'New Content Group',
	NEW_UNIT : 'New Unit',
	EMAIL : 'Email',
	FIRST_NAME : 'First Name',
	LAST_NAME : 'Last Name',
	DOB : 'Date Of Birth',
	PASSWORD : 'Password',
	LOGIN : 'Login',
	FORGET_ACCOUNT : 'Forget Account ?',
	FORGOT_YOUR_ACCOUNT : 'Forgot your account',
	SUBMIT : 'Submit',
	SESS_EXPIRED : 'Session Expired',
	SESS_EXPIRED_OK : 'Your session is expired. Please click OK to login again.',
	OK : 'OK',




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

/***/ "./src/app/components/createContentGroup.component.js":
/*!************************************************************!*\
  !*** ./src/app/components/createContentGroup.component.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var createContentGroupCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('createContentGroupCtrl', createContentGroupCtrl);

createContentGroupCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS"];

app.component('createContentGroupComponent',{
  templateUrl:'../src/app/templates/createContentGroup.html',
  controller: 'createContentGroupCtrl',
  controllerAs: 'vm'
});

/***/ }),

/***/ "./src/app/components/createUnit.component.js":
/*!****************************************************!*\
  !*** ./src/app/components/createUnit.component.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = angular.module('web-content-portal');

var createUnitCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	var recorder = document.getElementById('recorder');
  	var player = document.getElementById('player');

  	recorder.addEventListener('change', function(e) {

	    var file = e.target.files[0];
	    // Do something with the audio file.
	    console.log("Inside recorder function");
	    player.src =  URL.createObjectURL(file);
	  });

  	navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);

      var handleSuccess = function(stream) {
	    // if (window.URL) {
	    //   player.src = window.URL.createObjectURL(stream);
	    // } else {
	    //   player.src = stream;
	    // }

	    var context = new AudioContext();
	    var source = context.createMediaStreamSource(stream);
	    var processor = context.createScriptProcessor(1024, 1, 1);

	    source.connect(processor);
	    processor.connect(context.destination);

	    processor.onaudioprocess = function(e) {
	      // Do something with the data, i.e Convert this to WAV
	      console.log(e.inputBuffer);
	    };
	    
	  };



	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('createUnitCtrl', createUnitCtrl);

createUnitCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS"];

app.component('createUnitComponent',{
  templateUrl:'../src/app/templates/createUnit.html',
  controller: 'createUnitCtrl',
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

    $('#datetimepicker1').datepicker({
        format: 'mm-dd-yyyy',
        todayHighlight: true,
        autoclose: true
    });

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

    	console.log("Inside httpPostLoginCall function ");

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

        console.log("Inside httpPostSignUpCall function ");
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
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./app.js ./src/app/assets/static/constants.js ./src/app/components/landing.component.js ./src/app/components/header.component.js ./src/app/components/home.component.js ./src/app/components/student.component.js ./src/app/components/class.component.js ./src/app/components/assignment.component.js ./src/app/components/user.component.js ./src/app/components/createContentGroup.component.js ./src/app/components/createUnit.component.js ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
__webpack_require__(/*! ./src/app/components/createContentGroup.component.js */"./src/app/components/createContentGroup.component.js");
module.exports = __webpack_require__(/*! ./src/app/components/createUnit.component.js */"./src/app/components/createUnit.component.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYXNzZXRzL3N0YXRpYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2Fzc2lnbm1lbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9jbGFzcy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2NyZWF0ZUNvbnRlbnRHcm91cC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2NyZWF0ZVVuaXQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbGFuZGluZy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL3N0dWRlbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy91c2VyLmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25FQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxpREFBaUQ7QUFDdEQsS0FBSywrREFBK0Q7QUFDcEUsS0FBSyx3REFBd0Q7QUFDN0QsUUFBUSx3RUFBd0U7QUFDaEYsS0FBSyxnR0FBZ0c7QUFDckcsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3JIRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ2xDRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUNqQkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDakJEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDcEJEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSix3Q0FBd0MsNEJBQTRCO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7Ozs7QUN4REQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFNBQVM7O0FBRVQsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzVLRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDLEU7Ozs7Ozs7Ozs7O0FDbEJEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDbE9EOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2pCRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnLCBbJ25nQ29tcG9uZW50Um91dGVyJ10pO1xuXG5hcHAudmFsdWUoJyRyb3V0ZXJSb290Q29tcG9uZW50JywnbGFuZGluZycpO1xuYXBwLmNvbXBvbmVudCgnbGFuZGluZycse1xuICB0ZW1wbGF0ZTonPGxhbmRpbmctY29tcG9uZW50PjwvbGFuZGluZy1jb21wb25lbnQ+PG5nLW91dGxldD48L25nLW91dGxldD4nLFxuICAkcm91dGVDb25maWc6W1xuICAgIC8vIHtwYXRoOicvJyxjb21wb25lbnQ6J2hvbWVDb21wb25lbnQnLG5hbWU6J0hvbWUnfVxuICBdXG59KTtcblxuXG5hcHAudmFsdWUoJyRyb3V0ZXJSb290Q29tcG9uZW50JywnZGFzaGJvYXJkJyk7XG5hcHAuY29tcG9uZW50KCdkYXNoYm9hcmQnLHtcbiAgdGVtcGxhdGU6JzxoZWFkZXItY29tcG9uZW50PjwvaGVhZGVyLWNvbXBvbmVudD48bmctb3V0bGV0Pjwvbmctb3V0bGV0PicsXG4gICRyb3V0ZUNvbmZpZzpbXG4gICAge3BhdGg6Jy8nLCBjb21wb25lbnQ6J2hvbWVDb21wb25lbnQnLCBuYW1lOidIb21lJ30sXG4gICAge3BhdGg6Jy9zdHVkZW50cycsIGNvbXBvbmVudDonc3R1ZGVudENvbXBvbmVudCcsIG5hbWU6J1N0dWRlbnQnfSxcbiAgICB7cGF0aDonL2NsYXNzJywgY29tcG9uZW50OidjbGFzc0NvbXBvbmVudCcsIG5hbWU6J0NsYXNzJ30sXG4gICAgLy8ge3BhdGg6Jy9hc3NpZ25tZW50cycsIGNvbXBvbmVudDonYXNzaWdubWVudENvbXBvbmVudCcsIG5hbWU6J0Fzc2lnbm1lbnQnfSxcbiAgICB7cGF0aDonL2NyZWF0ZS9jb250ZW50Z3JvdXAnLCBjb21wb25lbnQ6J2NyZWF0ZUNvbnRlbnRHcm91cENvbXBvbmVudCcsIG5hbWU6J0NyZWF0ZUNvbnRlbnRHcm91cCd9LFxuICAgIHtwYXRoOicvY3JlYXRlL3VuaXQnLCBjb21wb25lbnQ6J2NyZWF0ZVVuaXRDb21wb25lbnQnLCBuYW1lOidDcmVhdGVVbml0J31cbiAgXVxufSk7XG5cblxuLy9IYW5kbGUgc2VydmVyIGVycm9yIG1lc3NhZ2VzIGdsb2JhbGx5Li5cbmFwcC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uICgkcSwkcm9vdFNjb3BlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncmVzcG9uc2VFcnJvcic6IGZ1bmN0aW9uIChyZXNwb25zZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5tZXNzYWdlID0gcmVzcG9uc2VFcnJvci5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZUVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uID0ge307XG4gICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wb3N0ID0ge307XG4gICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wdXQgPSB7fTtcbiAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLnBhdGNoID0ge307XG5cbn1dKTtcblxuYXBwLmZhY3RvcnkoXCJsb2NhbFN0b3JhZ2VcIiwgZnVuY3Rpb24oJHdpbmRvdywgJHJvb3RTY29wZSkge1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAkd2luZG93LmxvY2FsU3RvcmFnZSAmJiAkd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdteS1zdG9yYWdlJywgSlNPTi5zdHJpbmdpZnkodmFsKSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSgkd2luZG93LmxvY2FsU3RvcmFnZSAmJiAkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdteS1zdG9yYWdlJykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyTG9jYWxTdG9yYWdlS2V5OiBmdW5jdGlvbigpe1xuICAgICAgICAgICR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJteS1zdG9yYWdlXCIpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbnZlcnRTZWNvbmRzVG9EYXRlVGltZTogZnVuY3Rpb24odG90YWxTZWNvbmRzKSB7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBjb252ZXJ0U2Vjb25kc1RvRGF0ZVRpbWUgPSBcIiArIHRvdGFsU2Vjb25kcyk7XG5cbiAgICAgICAgICB2YXIgaG91cnMgICA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XG4gICAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgICAgICAgdmFyIHNlY29uZHMgPSB0b3RhbFNlY29uZHMgLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuICAgICAgICAgIC8vIHJvdW5kIHNlY29uZHNcbiAgICAgICAgICBzZWNvbmRzID0gTWF0aC5yb3VuZChzZWNvbmRzICogMTAwKSAvIDEwMFxuXG4gICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgdmFyIGxhdGVyID0gbmV3IERhdGUoKTtcbiAgICAgICAgICBsYXRlci5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKStob3Vycyk7XG4gICAgICAgICAgbGF0ZXIuc2V0TWludXRlcyhub3cuZ2V0TWludXRlcygpK21pbnV0ZXMpO1xuICAgICAgICAgIC8vbGF0ZXIuc2V0U2Vjb25kcyhub3cuZ2V0U2Vjb25kcygpK3NlY29uZHMpO1xuXG4gICAgICAgICAgbGF0ZXIgPSBsYXRlci5nZXREYXRlKCkgKyBcIi1cIiArIChsYXRlci5nZXRNb250aCgpKzEpICsgXCItXCIgKyBsYXRlci5nZXRGdWxsWWVhcigpICsgIFwiIFwiICsgbGF0ZXIuZ2V0SG91cnMoKSArIFwiLVwiICsgKGxhdGVyLmdldE1pbnV0ZXMoKSk7XG4gICAgICAgICAgcmV0dXJuIGxhdGVyO1xuICAgICAgICB9XG5cbiAgICB9O1xufSk7XG5cbmFwcC5mYWN0b3J5KFwibW9kYWxGYWN0b3J5XCIsIGZ1bmN0aW9uKCR3aW5kb3csICRyb290U2NvcGUpe1xuXG4gIHJldHVybntcblxuICAgICAgb3Blbk1vZGFsOiBmdW5jdGlvbihtb2RhbFR5cGUpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIG9wZW5Nb2RhbCBmdW5jdGlvbiBtb2RhbFR5cGUgPVwiICsgbW9kYWxUeXBlKTtcbiAgICAgICAgdmFyIGRsZ0VsZW07XG4gICAgICAgIHN3aXRjaCAobW9kYWxUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibW9kYWxMb2dpbkZvcm1cIiA6XG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbExvZ2luRm9ybVwiKTtcbiAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBjYXNlIFwibW9kYWxSZWdpc3RlckZvcm1cIiA6XG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbFJlZ2lzdGVyRm9ybVwiKTtcbiAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBjYXNlIFwiZm9yY2VMb2dvdXRNb2RhbFwiIDpcbiAgICAgICAgICAgICAgICBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI2ZvcmNlTG9nb3V0TW9kYWxcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibW9kYWxGb3Jnb3RcIiA6XG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbEZvcmdvdFwiKTtcbiAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICAgICAgICBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI2ZvcmNlTG9nb3V0TW9kYWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChkbGdFbGVtKSB7XG4gICAgICAgICAgICBkbGdFbGVtLm1vZGFsKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICB9O1xuXG59KTtcblxuXG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG5hcHAuY29uc3RhbnQoJ0NPTlNUQU5UUycse1xuXG5cdFNJR05fVVBcdDogJ1NpZ24gVXAnLFxuXHRTSUdOX0lOIDogJ1NpZ24gSW4nLFxuXHRNQVNURVIgOiAnTGV0cyBiZSBNYXN0ZXIuLi4nLFxuXHRORVdfQ09OVEVOVF9HUk9VUCA6ICdOZXcgQ29udGVudCBHcm91cCcsXG5cdE5FV19VTklUIDogJ05ldyBVbml0Jyxcblx0RU1BSUwgOiAnRW1haWwnLFxuXHRGSVJTVF9OQU1FIDogJ0ZpcnN0IE5hbWUnLFxuXHRMQVNUX05BTUUgOiAnTGFzdCBOYW1lJyxcblx0RE9CIDogJ0RhdGUgT2YgQmlydGgnLFxuXHRQQVNTV09SRCA6ICdQYXNzd29yZCcsXG5cdExPR0lOIDogJ0xvZ2luJyxcblx0Rk9SR0VUX0FDQ09VTlQgOiAnRm9yZ2V0IEFjY291bnQgPycsXG5cdEZPUkdPVF9ZT1VSX0FDQ09VTlQgOiAnRm9yZ290IHlvdXIgYWNjb3VudCcsXG5cdFNVQk1JVCA6ICdTdWJtaXQnLFxuXHRTRVNTX0VYUElSRUQgOiAnU2Vzc2lvbiBFeHBpcmVkJyxcblx0U0VTU19FWFBJUkVEX09LIDogJ1lvdXIgc2Vzc2lvbiBpcyBleHBpcmVkLiBQbGVhc2UgY2xpY2sgT0sgdG8gbG9naW4gYWdhaW4uJyxcblx0T0sgOiAnT0snLFxuXG5cblxuXG5cdElOVkFMSURfRU1BSUwgOiAnUGxlYXNlIGVudGVyIHZhbGlkIGVtYWlsIGFkZHJlc3MnLFxuXHRGT1JHRVRfU1VDQ0VTUyA6ICdQbGVhc2UgY2hlY2sgeW91ciBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkLicsXG5cdElOVkFMSURfRE9CIDogJ0RPQiBtdXN0IGJlIGluIG1tLWRkLXl5eXkgZm9ybWF0LicsXG5cdFVTRVJOQU1FX0VYSVNUUyA6ICdVc2VybmFtZSBhbHJlYWR5IGV4aXN0cy4nLFxuXHRJTlZBTElEX1VTRVJOQU1FX1BBU1NXT1JEIDogJ0ludmFsaWQgVXNlcm5hbWUvUGFzc3dvcmQuJyxcblx0TUlTU0lOR19QQVJBTUVURVIgOiAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgaW4gdGhlIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW4uJyxcblx0SU5URVJOQUxfU0VSVkVSX0VSUk9SIDogJ0ludGVybmFsIHNlcnZlciBlcnJvci4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nLFxuXHRTRVNTSU9OX0VYUElSRUQgOiAnWW91ciBzZXNzaW9uIGlzIGV4cGlyZWQuIFBsZWFzZSBsb2dvdXQgYW5kIGxvZ2luLicsXG5cdFJFUVVFU1RfRkFJTEVEIDogJ1JlcXVlc3QgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLidcbn0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGFzc2lnbm1lbnRDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2bS4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdhc3NpZ25tZW50Q3RybCcsIGFzc2lnbm1lbnRDdHJsKTtcblxuYXBwLmNvbXBvbmVudCgnYXNzaWdubWVudENvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvYXNzaWdubWVudC5odG1sJyxcbiAgY29udHJvbGxlcjogJ2Fzc2lnbm1lbnRDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgY2xhc3NDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ2NsYXNzQ3RybCcsIGNsYXNzQ3RybCk7XG5cbmFwcC5jb21wb25lbnQoJ2NsYXNzQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9jbGFzcy5odG1sJyxcbiAgY29udHJvbGxlcjogJ2NsYXNzQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGNyZWF0ZUNvbnRlbnRHcm91cEN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2UsIG1vZGFsRmFjdG9yeSwgQ09OU1RBTlRTKXtcblx0dmFyIHZtID0gdGhpcztcblx0JHNjb3BlLkNPTlNUQU5UUyA9IENPTlNUQU5UUztcblxuXHR2bS4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdjcmVhdGVDb250ZW50R3JvdXBDdHJsJywgY3JlYXRlQ29udGVudEdyb3VwQ3RybCk7XG5cbmNyZWF0ZUNvbnRlbnRHcm91cEN0cmwuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHdpbmRvd1wiLCBcIiRzY29wZVwiLCBcImxvY2FsU3RvcmFnZVwiLCBcIm1vZGFsRmFjdG9yeVwiLCBcIkNPTlNUQU5UU1wiXTtcblxuYXBwLmNvbXBvbmVudCgnY3JlYXRlQ29udGVudEdyb3VwQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9jcmVhdGVDb250ZW50R3JvdXAuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdjcmVhdGVDb250ZW50R3JvdXBDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgY3JlYXRlVW5pdEN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2UsIG1vZGFsRmFjdG9yeSwgQ09OU1RBTlRTKXtcblx0dmFyIHZtID0gdGhpcztcblx0JHNjb3BlLkNPTlNUQU5UUyA9IENPTlNUQU5UUztcblxuXHR2YXIgcmVjb3JkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjb3JkZXInKTtcbiAgXHR2YXIgcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcicpO1xuXG4gIFx0cmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuXG5cdCAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuXHQgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggdGhlIGF1ZGlvIGZpbGUuXG5cdCAgICBjb25zb2xlLmxvZyhcIkluc2lkZSByZWNvcmRlciBmdW5jdGlvblwiKTtcblx0ICAgIHBsYXllci5zcmMgPSAgVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcblx0ICB9KTtcblxuICBcdG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUsIHZpZGVvOiBmYWxzZSB9KVxuICAgICAgLnRoZW4oaGFuZGxlU3VjY2Vzcyk7XG5cbiAgICAgIHZhciBoYW5kbGVTdWNjZXNzID0gZnVuY3Rpb24oc3RyZWFtKSB7XG5cdCAgICAvLyBpZiAod2luZG93LlVSTCkge1xuXHQgICAgLy8gICBwbGF5ZXIuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcblx0ICAgIC8vIH0gZWxzZSB7XG5cdCAgICAvLyAgIHBsYXllci5zcmMgPSBzdHJlYW07XG5cdCAgICAvLyB9XG5cblx0ICAgIHZhciBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXHQgICAgdmFyIHNvdXJjZSA9IGNvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcblx0ICAgIHZhciBwcm9jZXNzb3IgPSBjb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigxMDI0LCAxLCAxKTtcblxuXHQgICAgc291cmNlLmNvbm5lY3QocHJvY2Vzc29yKTtcblx0ICAgIHByb2Nlc3Nvci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuXG5cdCAgICBwcm9jZXNzb3Iub25hdWRpb3Byb2Nlc3MgPSBmdW5jdGlvbihlKSB7XG5cdCAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHRoZSBkYXRhLCBpLmUgQ29udmVydCB0aGlzIHRvIFdBVlxuXHQgICAgICBjb25zb2xlLmxvZyhlLmlucHV0QnVmZmVyKTtcblx0ICAgIH07XG5cdCAgICBcblx0ICB9O1xuXG5cblxuXHR2bS4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdjcmVhdGVVbml0Q3RybCcsIGNyZWF0ZVVuaXRDdHJsKTtcblxuY3JlYXRlVW5pdEN0cmwuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHdpbmRvd1wiLCBcIiRzY29wZVwiLCBcImxvY2FsU3RvcmFnZVwiLCBcIm1vZGFsRmFjdG9yeVwiLCBcIkNPTlNUQU5UU1wiXTtcblxuYXBwLmNvbXBvbmVudCgnY3JlYXRlVW5pdENvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvY3JlYXRlVW5pdC5odG1sJyxcbiAgY29udHJvbGxlcjogJ2NyZWF0ZVVuaXRDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJyk7XG5cbnZhciBoZWFkZXJDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlLCBtb2RhbEZhY3Rvcnkpe1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHZhciBvYmogPSBsb2NhbFN0b3JhZ2UuZ2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKCk7XG5cblx0dmFyIGV4cGlyeURhdGVUaW1lID0gb2JqLmV4cGlyZXNfdGltZTtcblxuXHR2bS51cGRhdGVVc2VySW5mbyA9IGZ1bmN0aW9uKCl7XG5cblx0XHRjb25zb2xlLmxvZyhcIkluc2lkZSB1cGRhdGVVc2VySW5mb1wiKTtcblxuICAgICAgICBvYmogPSBsb2NhbFN0b3JhZ2UuZ2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKCk7XG4gICAgICAgIGV4cGlyeURhdGVUaW1lID0gb2JqLmV4cGlyZXNfdGltZTtcblxuXHRcdHZhciB1c2VySnNvbiA9e1xuXHRcdFx0XCJmaXJzdF9uYW1lXCI6IFwiQTE3XCIsXG5cdFx0XHRcImxhc3RfbmFtZVwiOiBcImIxN1wiLFxuXHRcdFx0XCJ1c2VyX2F0dHJpYnV0ZXNcIjoge1xuXHRcdFx0XHRcImRvYlwiOiBcIjIyLTA0LTE5ODdcIlxuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cDovLzE5Mi4xNjguNzEuMTA6MTAwMTAvYXBpL2FpdWFtL3YxL3VzZXJzLycrIG9iai51aWQsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG5cdFx0XHQgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0ICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBvYmouYWNjZXNzX3Rva2VuXG5cdFx0XHQgfSxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJKc29uXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoaXNVc2VyQXV0aGVudGljYXRlZCh2bS51cGRhdGVVc2VySW5mbykpe1xuICAgICAgICBcdGh0dHBQdXRVcGRhdGVVc2VyQ2FsbChyZXF1ZXN0KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8vY29udmVydCBEYXRlVGltZSAoZGQtbW0teXl5eSBoaC1tbSkgdG8gamF2YXNjcmlwdCBEYXRlVEltZVxuICAgIC8vRXg6IDE2LTExLTIwMTUgMTY6MDVcbiAgICB2YXIgdG9KU0RhdGUgPSBmdW5jdGlvbiggZGF0ZVRpbWUgKSB7XG5cbiAgICAgICAgdmFyIGRhdGVUaW1lID0gZGF0ZVRpbWUuc3BsaXQoXCIgXCIpOy8vZGF0ZVRpbWVbMF0gPSBkYXRlLCBkYXRlVGltZVsxXSA9IHRpbWVcblxuICAgICAgICB2YXIgZGF0ZSA9IGRhdGVUaW1lWzBdLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgdmFyIHRpbWUgPSBkYXRlVGltZVsxXS5zcGxpdChcIi1cIik7XG5cbiAgICAgICAgLy8oeWVhciwgbW9udGgsIGRheSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcylcbiAgICAgICAgLy9zdWJ0cmFjdCAxIGZyb20gbW9udGggYmVjYXVzZSBKYW4gaXMgMCBhbmQgRGVjIGlzIDExXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlWzJdLCAoZGF0ZVsxXS0xKSwgZGF0ZVswXSwgdGltZVswXSwgdGltZVsxXSwgMCwgMCk7XG5cbiAgICB9XG5cbiAgICAvL0NoZWNrIHRvIHNlZSBpZiB0aGUgRGF0ZVRpbWUgaXMgaW4gdGhlIGZ1dHVyZVxuICAgIC8vcGFyYW06IGRhdGVUaW1lIG11c3QgYmUgYSBKUyBEYXRlIE9iamVjdFxuICAgIC8vcmV0dXJuIFRydWUgaWYgRGF0ZVRpbWUgaXMgYWZ0ZXIgTm93XG4gICAgLy9yZXR1cm4gRmFsc2UgaWYgRGF0ZVRJbWUgaXMgYmVmb3JlIE5vd1xuICAgIGZ1bmN0aW9uIGZ1dHVyZURhdGVUaW1lKCBkYXRlVGltZSApIHtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBmdXR1cmUgPSBmYWxzZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJOb3cgZGF0ZSBpcyA9XCIsIG5vdyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXhwaXJ5IGRhdGUgaXMgPVwiLCBkYXRlVGltZSk7XG5cbiAgICAgICAgaWYoIERhdGUucGFyc2Uobm93KSA8IERhdGUucGFyc2UoZGF0ZVRpbWUpICkge1xuICAgICAgICAgICAgZnV0dXJlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1dHVyZTtcbiAgICB9XG5cbiAgICB2YXIgaXNVc2VyQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uKHBhcmVudEFQSSl7XG5cbiAgICBcdGNvbnNvbGUubG9nKFwiSW5zaWRlIGlzVXNlckF1dGhlbnRpY2F0ZWQgZXhwaXJ5RGF0ZVRpbWUgPVwiICwgZXhwaXJ5RGF0ZVRpbWUpO1xuXG4gICAgICAgIHZhciBpc1ZhbGlkID0gZnV0dXJlRGF0ZVRpbWUodG9KU0RhdGUoZXhwaXJ5RGF0ZVRpbWUpKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImlzVmFsaWQgPVwiLCBpc1ZhbGlkKTtcblxuICAgIFx0aWYoaXNWYWxpZCl7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdBY2Nlc3MgdG9rZW4gaXMgdmFsaWQnKTtcbiAgICBcdFx0cmV0dXJuIHRydWU7XG4gICAgXHR9ZWxzZXtcbiAgICBcdFx0Y29uc29sZS5sb2coJ0ludmFsaWQgYWNjZXNzIHRva2VuIC0gSGl0IFJlZnJlc2ggdG9rZW4gQVBJJyk7XG4gICAgXHRcdHByZXBhcmVSZWZyZXNoVG9rZW5BUEkocGFyZW50QVBJKTtcbiAgICBcdH1cblx0XHRcblx0fVxuXG4gICAgdmFyIGh0dHBQdXRVcGRhdGVVc2VyQ2FsbCA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcblxuICAgIFx0Y29uc29sZS5sb2coXCJJbnNpZGUgaHR0cFB1dFVwZGF0ZVVzZXJDYWxsIGZ1bmN0aW9uIFwiKTtcblxuICAgICAgICAkaHR0cChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgcHJlcGFyZVJlZnJlc2hUb2tlbkFQSSA9IGZ1bmN0aW9uKHBhcmVudEFQSSl7XG5cbiAgICBcdHZhciByZWZyZXNoSnNvbiA9e1xuXHRcdFx0XCJyZWZyZXNoLXRva2VuXCI6IG9iai5yZWZyZXNoX3Rva2VuXG5cdFx0XHR9XG5cdFx0XG5cdFx0dmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy8nKyBvYmoudWlkICsgJy90b2tlbi9yZWZyZXNoJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcblx0XHRcdCAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdCB9LFxuICAgICAgICAgICAgZGF0YTogcmVmcmVzaEpzb25cbiAgICAgICAgfTtcblxuICAgICAgICBodHRwUG9zdFJlZnJlc2hUb2tlbkNhbGwocmVxdWVzdCwgcGFyZW50QVBJKTtcbiAgICB9XG5cblxuICAgIHZhciBodHRwUG9zdFJlZnJlc2hUb2tlbkNhbGwgPSBmdW5jdGlvbihyZXF1ZXN0LCBwYXJlbnRBUEkpIHtcblxuICAgIFx0Y29uc29sZS5sb2coXCJJbnNpZGUgaHR0cFBvc3RSZWZyZXNoVG9rZW5DYWxsIGZ1bmN0aW9uIFwiKTtcblxuICAgICAgICAkaHR0cChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIFx0dmFyIHRva2VuRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIFwiYWNjZXNzX3Rva2VuXCIgOiB0b2tlbkRhdGEuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiZXhwaXJlc19pblwiIDogdG9rZW5EYXRhLmV4cGlyZXNfaW4sXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX3Rva2VuXCIgOiB0b2tlbkRhdGEucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICBcImV4cGlyZXNfdGltZVwiIDogbG9jYWxTdG9yYWdlLmNvbnZlcnRTZWNvbmRzVG9EYXRlVGltZSh0b2tlbkRhdGEuZXhwaXJlc19pbiksXG4gICAgICAgICAgICAgICAgXCJ1aWRcIiA6IHRva2VuRGF0YS51aWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmKGxvY2FsU3RvcmFnZS5zZXRBY2Nlc3NBbmRSZWZyZXNoVG9rZW4ob2JqKSl7XG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKFwiQWNjZXNzIGFuZCByZWZyZXNoIHRva2VuIHJlZnJlc2hlZCBpbiBsb2NhbCBzdG9yYWdlLlwiKTtcbiAgICAgICAgICAgIFx0dm0udXBkYXRlVXNlckluZm8oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vaGFuZGxlIHRoZSBjYXNlIHdoZW4gbG9jYWwgc3RvcmFnZSBpcyB1bnN1Y2Nlc3NmdWwuLlxuICAgICAgICAgICAgICAgIC8vIHNob3cgZXJyb3IgbWVzc2FnZSB0byB1c2VyIHRvIHJlZG8gdGhlIG9wZXJhdGlvbi4uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZyb20gMXN0IEFQSSBjYWxsID1cIiwgZXJyb3IpO1xuICAgICAgICAgICAgbW9kYWxGYWN0b3J5Lm9wZW5Nb2RhbCgnZm9yY2VMb2dvdXRNb2RhbCcpO1xuICAgICAgICAgICAgLy8gRm9yY2UgbG9nb3V0IHVzZXIgYW5kIHRha2UgdG8gdGhlIGxvZ2luIHBhZ2UuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZtLmZvcmNlTG9nb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmNsZWFyTG9jYWxTdG9yYWdlS2V5KCkpe1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy4vaW5kZXguaHRtbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKCAnI3RvcGhlYWRlciAubmF2YmFyLW5hdiBhJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoICcjdG9waGVhZGVyIC5uYXZiYXItbmF2JyApLmZpbmQoICdsaS5hY3RpdmUnICkucmVtb3ZlQ2xhc3MoICdhY3RpdmUnICk7XG4gICAgICAgICQoIHRoaXMgKS5wYXJlbnQoICdsaScgKS5hZGRDbGFzcyggJ2FjdGl2ZScgKTtcbiAgICB9KTtcblxufVxuXG5cbmFwcC5jb250cm9sbGVyKCdoZWFkZXJDdHJsJywgaGVhZGVyQ3RybCk7XG5cbmhlYWRlckN0cmwuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHdpbmRvd1wiLCBcIiRzY29wZVwiLCBcImxvY2FsU3RvcmFnZVwiLCBcIm1vZGFsRmFjdG9yeVwiXTtcblxuYXBwLmNvbXBvbmVudCgnaGVhZGVyQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9oZWFkZXIuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdoZWFkZXJDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTtcbiIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJyk7XG5cbnZhciBob21lQ3RybCA9IGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkc2NvcGUsIGxvY2FsU3RvcmFnZSl7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0dGhpcy4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQsIHByZXZpb3VzKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJbnNpZGUgcm91dGVyT25BY3RpdmF0ZSBcIik7XG5cdH1cblxufVxuXG5hcHAuY29udHJvbGxlcignaG9tZUN0cmwnLCBob21lQ3RybCk7XG5cbmFwcC5jb21wb25lbnQoJ2hvbWVDb21wb25lbnQnLHtcbiAgdGVtcGxhdGU6ICcnLFxuICBjb250cm9sbGVyOiAnaG9tZUN0cmwnLFxuICBjb250cm9sbGVyQXM6ICd2bScsXG4gIGJpbmRpbmdzOiB7ICRyb3V0ZXI6ICc8JyB9XG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgbGFuZGluZ0N0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2UsIG1vZGFsRmFjdG9yeSwgQ09OU1RBTlRTKXtcblx0dmFyIHZtID0gdGhpcztcbiAgICAkc2NvcGUuQ09OU1RBTlRTID0gQ09OU1RBTlRTO1xuXG4gICAgJCgnI2RhdGV0aW1lcGlja2VyMScpLmRhdGVwaWNrZXIoe1xuICAgICAgICBmb3JtYXQ6ICdtbS1kZC15eXl5JyxcbiAgICAgICAgdG9kYXlIaWdobGlnaHQ6IHRydWUsXG4gICAgICAgIGF1dG9jbG9zZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdm0uY2xvc2VNb2RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiLm1vZGFsXCIpO1xuICAgICAgICBpZiAoZGxnRWxlbSkge1xuICAgICAgICAgICAgZGxnRWxlbS5tb2RhbChcImhpZGVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2bS5vcGVuRm9yZ290TW9kYWwgPSBmdW5jdGlvbigpe1xuICAgICAgICB2bS5jbG9zZU1vZGFsKCk7XG4gICAgICAgIHZtLm9wZW5Nb2RhbCgnbW9kYWxGb3Jnb3QnKTtcbiAgICB9XG5cblx0dm0ub3Blbk1vZGFsID0gZnVuY3Rpb24obW9kYWxUeXBlKXtcblx0XHRjb25zb2xlLmxvZyhcIkluc2lkZSBvcGVuUmVnaXN0ZXJNb2RhbCBmdW5jdGlvbiBtb2RhbFR5cGUgPVwiICsgbW9kYWxUeXBlKTtcblx0XHRtb2RhbEZhY3Rvcnkub3Blbk1vZGFsKG1vZGFsVHlwZSk7XG5cdH1cblxuXHR2bS5yZWdpc3Rlck1lID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiZG8gYWN0aW9uIG9uIE1vZGFsIHNpZ24gdXAgY2xpY2tlZC0tXCIpO1xuXG4gICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsUmVnaXN0ZXJGb3JtIC5tb2RhbC1ib2R5IC5hbGVydFwiKTtcbiAgICAgICAgaWYoZGxnRWxlbSl7XG4gICAgICAgICAgICBkbGdFbGVtLmRldGFjaCgpO1xuICAgICAgICB9XG5cblx0XHR2YXIgc2lnblVwSnNvbiA9e1xuXHRcdFx0XCJlbWFpbFwiOiB2bS5yZWdpc3RlckVtYWlsLFxuXHRcdFx0XCJmaXJzdF9uYW1lXCI6IHZtLnJlZ2lzdGVyRmlyc3ROYW1lLFxuXHRcdFx0XCJsYXN0X25hbWVcIjogdm0ucmVnaXN0ZXJMYXN0TmFtZSxcblx0XHRcdFwicGFzc3dvcmRcIjogdm0ucmVnaXN0ZXJQYXNzd29yZCxcblx0XHRcdFwidXNlcl9hdHRyaWJ1dGVzXCI6IHtcblx0XHRcdFx0XCJkb2JcIjogdm0ucmVnaXN0ZXJEb2Jcblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vMTkyLjE2OC43MS4xMDoxMDAxMC9hcGkvYWl1YW0vdjEvdXNlcnMvc2lnbnVwJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcblx0XHRcdCAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdCB9LFxuICAgICAgICAgICAgZGF0YTogc2lnblVwSnNvblxuICAgICAgICB9O1xuICAgICAgICBcblx0XHRodHRwUG9zdFNpZ25VcENhbGwocmVxdWVzdCk7XG4gICAgXG4gICAgfTtcblxuICAgIHZtLmxvZ2luTWUgPSBmdW5jdGlvbigpe1xuXHQgICBcdGNvbnNvbGUubG9nKFwiZG8gYWN0aW9uIG9uIE1vZGFsIGxvZ2luIGNsaWNrZWQtLVwiKTtcblxuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbExvZ2luRm9ybSAubW9kYWwtYm9keSAuYWxlcnRcIik7XG4gICAgICAgIGlmKGRsZ0VsZW0pe1xuICAgICAgICAgICAgZGxnRWxlbS5kZXRhY2goKTtcbiAgICAgICAgfVxuXG5cdCAgIFx0dmFyIGxvZ2luSnNvbiA9e1xuXHRcdFx0XCJ1c2VybmFtZVwiOiB2bS5sb2dpblVzZXJuYW1lLFxuXHRcdFx0XCJwYXNzd29yZFwiOiB2bS5sb2dpblBhc3N3b3JkLFxuXHRcdH07XG5cdFx0dmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy9sb2dpbicsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG5cdFx0XHQgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0IH0sXG4gICAgICAgICAgICBkYXRhOiBsb2dpbkpzb25cbiAgICAgICAgfTtcblxuXHQgICBcdGh0dHBQb3N0TG9naW5DYWxsKHJlcXVlc3QpO1xuXHR9XG5cbiAgICB2bS5mb3Jnb3RQYXNzd29yZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG8gYWN0aW9uIG9uIEZvcmdvdCBwYXNzd29yZCBjbGljay0tXCIpO1xuXG4gICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsRm9yZ290IC5tb2RhbC1ib2R5IC5hbGVydFwiKTtcbiAgICAgICAgaWYoZGxnRWxlbSl7XG4gICAgICAgICAgICBkbGdFbGVtLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZvcmdvdEpzb24gPXtcbiAgICAgICAgICAgIFwiZW1haWxcIjogdm0uZm9yZ290VXNlckVuYWlsXG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vMTkyLjE2OC43MS4xMDoxMDAxMC9hcGkvYWl1YW0vdjEvdXNlcnMvZm9yZ2V0LXBhc3N3b3JkJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IGZvcmdvdEpzb25cblxuICAgICAgICB9O1xuXG4gICAgICAgIGh0dHBQb3N0Rm9yZ290UGFzc3dvcmRDYWxsKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIHZhciBodHRwUG9zdExvZ2luQ2FsbCA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcblxuICAgIFx0Y29uc29sZS5sb2coXCJJbnNpZGUgaHR0cFBvc3RMb2dpbkNhbGwgZnVuY3Rpb24gXCIpO1xuXG4gICAgICAgICRodHRwKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5EYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgXCJhY2Nlc3NfdG9rZW5cIiA6IHRva2VuRGF0YS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJleHBpcmVzX2luXCIgOiB0b2tlbkRhdGEuZXhwaXJlc19pbixcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfdG9rZW5cIiA6IHRva2VuRGF0YS5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiZXhwaXJlc190aW1lXCIgOiBsb2NhbFN0b3JhZ2UuY29udmVydFNlY29uZHNUb0RhdGVUaW1lKHRva2VuRGF0YS5leHBpcmVzX2luKSxcbiAgICAgICAgICAgICAgICBcInVpZFwiIDogdG9rZW5EYXRhLnVpZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYobG9jYWxTdG9yYWdlLnNldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbihvYmopKXtcbiAgICAgICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLi9kYXNoYm9hcmQuaHRtbCc7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgdmFyIGVycm9yRGVzY3JpcHRpb24gPSBjcmVhdGVFcnJvck1lc3NhZ2VzKGVycm9yKTtcbiAgICAgICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsTG9naW5Gb3JtIC5tb2RhbC1ib2R5XCIpO1xuICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+JyArZXJyb3JEZXNjcmlwdGlvbiArJyA8L2Rpdj4nO1xuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgaHR0cFBvc3RTaWduVXBDYWxsID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0U2lnblVwQ2FsbCBmdW5jdGlvbiBcIik7XG4gICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsUmVnaXN0ZXJGb3JtXCIpO1xuXG4gICAgICAgICRodHRwKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoZGxnRWxlbSkge1xuICAgICAgICAgICAgICAgZGxnRWxlbS5tb2RhbChcImhpZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICB2YXIgZXJyb3JEZXNjcmlwdGlvbiA9IGNyZWF0ZUVycm9yTWVzc2FnZXMoZXJyb3IpO1xuICAgICAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxSZWdpc3RlckZvcm0gLm1vZGFsLWJvZHlcIik7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nICsgZXJyb3JEZXNjcmlwdGlvbiArJyA8L2Rpdj4nO1xuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgaHR0cFBvc3RGb3Jnb3RQYXNzd29yZENhbGwgPSBmdW5jdGlvbihyZXF1ZXN0KXtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBodHRwUG9zdEZvcmdvdFBhc3N3b3JkQ2FsbCBmdW5jdGlvbiBcIik7XG5cbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxGb3Jnb3QgLm1vZGFsLWJvZHlcIik7XG5cbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+JysgQ09OU1RBTlRTLklOVkFMSURfRU1BSUwgKyAnPC9kaXY+JztcblxuICAgICAgICAkaHR0cChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIHRva2VuRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB2YXIgc3VjY2Vzc0ZsYWcgPSB0b2tlbkRhdGEuc3VjY2VzcztcblxuICAgICAgICAgICAgaWYoc3VjY2Vzc0ZsYWcpe1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2Vzc1wiPicgKyBDT05TVEFOVFMuRk9SR0VUX1NVQ0NFU1MgKyAnPC9kaXY+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRsZ0VsZW0uYXBwZW5kKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG5cbiAgICAgICAgICAgIGRsZ0VsZW0uYXBwZW5kKGVycm9yTWVzc2FnZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICB2YXIgY3JlYXRlRXJyb3JNZXNzYWdlcyA9IGZ1bmN0aW9uKGVycm9yT2JqKXtcblxuICAgICAgICB2YXIgZXJyQ29kZSwgZXJyRGVzYztcbiAgICAgICAgICAgIGlmKGVycm9yT2JqICE9IG51bGwpe1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChlcnJvck9iai5kYXRhLmVycm9yX2NvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjEwMDdcIiA6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJEZXNjID0gQ09OU1RBTlRTLklOVkFMSURfRE9CO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwNVwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuVVNFUk5BTUVfRVhJU1RTO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwM1wiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuSU5WQUxJRF9VU0VSTkFNRV9QQVNTV09SRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwOFwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuSU5WQUxJRF9FTUFJTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyBcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjEwMDFcIiA6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJEZXNjID0gQ09OU1RBTlRTLk1JU1NJTkdfUEFSQU1FVEVSO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiNTAwMFwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwNFwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuU0VTU0lPTl9FWFBJUkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuUkVRVUVTVF9GQUlMRUQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlcnJEZXNjO1xuICAgIH1cblxufVxuXG5hcHAuY29udHJvbGxlcignbGFuZGluZ0N0cmwnLCBsYW5kaW5nQ3RybCk7XG5cbmxhbmRpbmdDdHJsLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiR3aW5kb3dcIiwgXCIkc2NvcGVcIiwgXCJsb2NhbFN0b3JhZ2VcIiwgXCJtb2RhbEZhY3RvcnlcIiwgXCJDT05TVEFOVFNcIl07XG5cbmFwcC5jb21wb25lbnQoJ2xhbmRpbmdDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL2xhbmRpbmcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdsYW5kaW5nQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIHN0dWRlbnRDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ3N0dWRlbnRDdHJsJywgc3R1ZGVudEN0cmwpO1xuXG5hcHAuY29tcG9uZW50KCdzdHVkZW50Q29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9zdHVkZW50Lmh0bWwnLFxuICBjb250cm9sbGVyOiAnc3R1ZGVudEN0cmwnLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJyk7XG5cbnZhciB1c2VyQ3RybCA9IGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkc2NvcGUsIGxvY2FsU3RvcmFnZSl7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0dGhpcy4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQsIHByZXZpb3VzKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgcm91dGVyT25BY3RpdmF0ZSBcIik7XG5cdH1cblxufVxuXG5hcHAuY29udHJvbGxlcigndXNlckN0cmwnLCB1c2VyQ3RybCk7XG5cbnVzZXJDdHJsLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiR3aW5kb3dcIiwgXCIkc2NvcGVcIiwgXCJsb2NhbFN0b3JhZ2VcIl07XG5cbmFwcC5jb21wb25lbnQoJ3VzZXJDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL3VzZXIuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICd1c2VyQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgYmluZGluZ3M6IHsgJHJvdXRlcjogJzwnIH1cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=