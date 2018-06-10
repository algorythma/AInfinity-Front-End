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

var createContentGroupCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS, APIService){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	var obj = localStorage.getAccessAndRefreshToken();

	var expiryDateTime = obj.expires_time;

	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

	vm.addNewContentGroup = function(){

		console.log("Inside addNewContentGroup");

        obj = localStorage.getAccessAndRefreshToken();
        expiryDateTime = obj.expires_time;

		var contentGroupJson ={
			"name": vm.cgName,
			"desc": vm.cgDesc,
			"parent_id": vm.cgParent
		};

		var request = {
            method: 'POST',
            url: 'http://192.168.71.10:10010/api/aiuam/v1/contents',
            headers: {
			   'Content-Type': 'application/json',
			   'Authorization': 'Bearer ' + obj.access_token
			 },
			params: { user_id: obj.uid },
            data: contentGroupJson
        };

        if(APIService.isUserAuthenticated()){
        	httpPostAddContentGroupCall(request);
            console.log('User is authenticated - True');
        }else{
            console.log('User is authenticated - False');
            modalFactory.openModal('forceLogoutModal');
        }

	}

	var httpPostAddContentGroupCall = function(request) {

    	console.log("Inside httpPostAddContentGroupCall function ");

        $http(request).then(function (response) {

        }, function (error) {
          
        });
    }

}

app.controller('createContentGroupCtrl', createContentGroupCtrl);

createContentGroupCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS", "APIService"];

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

	var navigator = window.navigator;
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	var Context = window.AudioContext || window.webkitAudioContext;
	var context = new Context();

	var resObj, recordButton, stopButton, recorder;
	recordButton = angular.element('#record');
	stopButton = angular.element('#stop');

	initAudio();

	recordButton.prop('disabled', false);
	recordButton.click(startRecording);
	stopButton.click(stopRecording);

	function startRecording() {
	   recordButton.prop('disabled', true);
	   stopButton.prop('disabled', false);
	   recorder.clear();
	   recorder.record();
	}

	function stopRecording() {
	   recordButton.prop('disabled', false);
	   stopButton.prop('disabled', true);
	   recorder.stop();
	   recorder.exportWAV(stereo_cb);
	   recorder.clear();
	}

	function stereo_cb(blob){
	   console.log("blob = ", blob);
	   // var msg = new Blob([context.sampleRate, blob]);
	   var formData = new FormData();
	   formData.append('audio', blob);
	   //    formData.append('debug', $('#debug').prop('checked'))
	   formData.append('debug', true)

	   //postAsFormData(formData, prediction_service, prediction_callback);
	   audio.src = URL.createObjectURL(blob);
	   audio.play();
	};

	function initAudio() {
	   if (!navigator.getUserMedia)
	       navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
	   if (!navigator.cancelAnimationFrame)
	       navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
	   if (!navigator.requestAnimationFrame)
	       navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

	   navigator.getUserMedia(
	   {
	       "audio": {
	           "mandatory": {
	               "googEchoCancellation": "true",
	               "googAutoGainControl": "true",
	               "googNoiseSuppression": "true",
	               "googHighpassFilter": "true"
	           },
	           "optional": []
	       },
	   }, gotStream, function(e) {
	       alert('Error getting audio');
	       console.log(e);
	   });
	}

	function gotStream(stream) {
	   var inputPoint = context.createGain();

	   // Create an AudioNode from the stream.
	   var audioInput = context.createMediaStreamSource(stream);
	   audioInput.connect(inputPoint);

	   var analyserNode = context.createAnalyser();
	   analyserNode.fftSize = 2048;
	   inputPoint.connect(analyserNode);

	   recorder = new Recorder(inputPoint);

	   var zeroGain = context.createGain();
	   zeroGain.gain.value = 0.0;
	   inputPoint.connect(zeroGain);
	   zeroGain.connect(context.destination);
	}



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

var headerCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS, APIService){
	var vm = this;
    $scope.CONSTANTS = CONSTANTS;

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

        if(APIService.isUserAuthenticated()){
        	httpPutUpdateUserCall(request);
            console.log('User is authenticated - True');
        }else{
            console.log('User is authenticated - False');
            modalFactory.openModal('forceLogoutModal');
        }

    };

    var httpPutUpdateUserCall = function(request) {

    	console.log("Inside httpPutUpdateUserCall function ");

        $http(request).then(function (response) {

        }, function (error) {
          
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

headerCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS", "APIService"];

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

/***/ "./src/app/services/app.services.js":
/*!******************************************!*\
  !*** ./src/app/services/app.services.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



var app = angular.module('web-content-portal');

app.factory("APIService", ['$http', '$q', 'localStorage',  function($http, $q, localStorage){

	var obj = localStorage.getAccessAndRefreshToken();
	var expiryDateTime = obj.expires_time;

	return {

		 isUserAuthenticated: function(){

	    	console.log("Inside isUserAuthenticated expiryDateTime =" , expiryDateTime);

	        var isValid = this.futureDateTime(this.toJSDate(expiryDateTime));

	        console.log("isValid =", isValid);

	    	if(isValid){
	    		console.log('Access token is valid');
	    		return true;
	    	}else{
	    		console.log('Invalid access token - Hit Refresh token API');
	    		// return false;
	    		return (this.prepareRefreshTokenAPI());
	    	}
			
		},
		
	    toJSDate: function(dateTime) {

	    	//convert DateTime (dd-mm-yyyy hh-mm) to javascript DateTIme
	    	//Ex: 16-11-2015 16:05

	        var dateTime = dateTime.split(" "); //dateTime[0] = date, dateTime[1] = time

	        var date = dateTime[0].split("-");
	        var time = dateTime[1].split("-");

	        //(year, month, day, hours, minutes, seconds, milliseconds)
	        //subtract 1 from month because Jan is 0 and Dec is 11
	        return new Date(date[2], (date[1]-1), date[0], time[0], time[1], 0, 0);

	    },

	    //Check to see if the DateTime is in the future
	    //param: dateTime must be a JS Date Object
	    //return True if DateTime is after Now
	    //return False if DateTIme is before Now
	    futureDateTime: function(dateTime) {
	        var now = new Date();
	        var future = false;
	        // console.log("Now date is =", now);
	        // console.log("Expiry date is =", dateTime);

	        if( Date.parse(now) < Date.parse(dateTime) ) {
	            future = true;
	        }
	        
	        return future;
	    },


		prepareRefreshTokenAPI: function(){

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

	        return (this.httpPostRefreshTokenCall(request));
	    },


	    httpPostRefreshTokenCall: function(request) {

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
	            	//vm.updateUserInfo();
	            	return true;
	            }else{
	                //handle the case when local storage is unsuccessful..
	                // show error message to user to redo the operation..
	                return false;
	            }

	        }, function (error) {
	            console.log("Error from httpPostRefreshTokenCall API call =", error);
	            modalFactory.openModal('forceLogoutModal');
	            // Force logout user and take to the login page.
	        });
	    }

	};

}]);


/***/ }),

/***/ 0:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./app.js ./src/app/services/app.services.js ./src/app/assets/static/constants.js ./src/app/components/landing.component.js ./src/app/components/header.component.js ./src/app/components/home.component.js ./src/app/components/student.component.js ./src/app/components/class.component.js ./src/app/components/assignment.component.js ./src/app/components/user.component.js ./src/app/components/createContentGroup.component.js ./src/app/components/createUnit.component.js ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./app.js */"./app.js");
__webpack_require__(/*! ./src/app/services/app.services.js */"./src/app/services/app.services.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYXNzZXRzL3N0YXRpYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2Fzc2lnbm1lbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9jbGFzcy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2NyZWF0ZUNvbnRlbnRHcm91cC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2NyZWF0ZVVuaXQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbGFuZGluZy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL3N0dWRlbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy91c2VyLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3NlcnZpY2VzL2FwcC5zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25FQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxpREFBaUQ7QUFDdEQsS0FBSywrREFBK0Q7QUFDcEUsS0FBSyx3REFBd0Q7QUFDN0QsUUFBUSx3RUFBd0U7QUFDaEYsS0FBSyxnR0FBZ0c7QUFDckcsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNsQ0Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDakJEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2pCRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWSxtQkFBbUI7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFNBQVM7O0FBRVQsU0FBUztBQUNUOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ3JFRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7OztBQzdHRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsU0FBUzs7QUFFVCxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzlFRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDLEU7Ozs7Ozs7Ozs7O0FDbEJEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDbE9EOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2pCRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDLEU7Ozs7Ozs7Ozs7Ozs7QUNsQkQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBLDRDQUE0Qzs7QUFFNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTs7O0FBR047O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLE1BQU07OztBQUdOOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJywgWyduZ0NvbXBvbmVudFJvdXRlciddKTtcblxuYXBwLnZhbHVlKCckcm91dGVyUm9vdENvbXBvbmVudCcsJ2xhbmRpbmcnKTtcbmFwcC5jb21wb25lbnQoJ2xhbmRpbmcnLHtcbiAgdGVtcGxhdGU6JzxsYW5kaW5nLWNvbXBvbmVudD48L2xhbmRpbmctY29tcG9uZW50PjxuZy1vdXRsZXQ+PC9uZy1vdXRsZXQ+JyxcbiAgJHJvdXRlQ29uZmlnOltcbiAgICAvLyB7cGF0aDonLycsY29tcG9uZW50Oidob21lQ29tcG9uZW50JyxuYW1lOidIb21lJ31cbiAgXVxufSk7XG5cblxuYXBwLnZhbHVlKCckcm91dGVyUm9vdENvbXBvbmVudCcsJ2Rhc2hib2FyZCcpO1xuYXBwLmNvbXBvbmVudCgnZGFzaGJvYXJkJyx7XG4gIHRlbXBsYXRlOic8aGVhZGVyLWNvbXBvbmVudD48L2hlYWRlci1jb21wb25lbnQ+PG5nLW91dGxldD48L25nLW91dGxldD4nLFxuICAkcm91dGVDb25maWc6W1xuICAgIHtwYXRoOicvJywgY29tcG9uZW50Oidob21lQ29tcG9uZW50JywgbmFtZTonSG9tZSd9LFxuICAgIHtwYXRoOicvc3R1ZGVudHMnLCBjb21wb25lbnQ6J3N0dWRlbnRDb21wb25lbnQnLCBuYW1lOidTdHVkZW50J30sXG4gICAge3BhdGg6Jy9jbGFzcycsIGNvbXBvbmVudDonY2xhc3NDb21wb25lbnQnLCBuYW1lOidDbGFzcyd9LFxuICAgIC8vIHtwYXRoOicvYXNzaWdubWVudHMnLCBjb21wb25lbnQ6J2Fzc2lnbm1lbnRDb21wb25lbnQnLCBuYW1lOidBc3NpZ25tZW50J30sXG4gICAge3BhdGg6Jy9jcmVhdGUvY29udGVudGdyb3VwJywgY29tcG9uZW50OidjcmVhdGVDb250ZW50R3JvdXBDb21wb25lbnQnLCBuYW1lOidDcmVhdGVDb250ZW50R3JvdXAnfSxcbiAgICB7cGF0aDonL2NyZWF0ZS91bml0JywgY29tcG9uZW50OidjcmVhdGVVbml0Q29tcG9uZW50JywgbmFtZTonQ3JlYXRlVW5pdCd9XG4gIF1cbn0pO1xuXG5cbi8vSGFuZGxlIHNlcnZlciBlcnJvciBtZXNzYWdlcyBnbG9iYWxseS4uXG5hcHAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChmdW5jdGlvbiAoJHEsJHJvb3RTY29wZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Jlc3BvbnNlRXJyb3InOiBmdW5jdGlvbiAocmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUubWVzc2FnZSA9IHJlc3BvbnNlRXJyb3IuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2VFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbiA9IHt9O1xuICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucG9zdCA9IHt9O1xuICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucHV0ID0ge307XG4gICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wYXRjaCA9IHt9O1xuXG59XSk7XG5cbmFwcC5mYWN0b3J5KFwibG9jYWxTdG9yYWdlXCIsIGZ1bmN0aW9uKCR3aW5kb3csICRyb290U2NvcGUpIHtcbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2UgJiYgJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbXktc3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoJHdpbmRvdy5sb2NhbFN0b3JhZ2UgJiYgJHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXktc3RvcmFnZScpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhckxvY2FsU3RvcmFnZUtleTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAkd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwibXktc3RvcmFnZVwiKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBjb252ZXJ0U2Vjb25kc1RvRGF0ZVRpbWU6IGZ1bmN0aW9uKHRvdGFsU2Vjb25kcykge1xuXG4gICAgICAgICAgY29uc29sZS5sb2coXCJJbnNpZGUgY29udmVydFNlY29uZHNUb0RhdGVUaW1lID0gXCIgKyB0b3RhbFNlY29uZHMpO1xuXG4gICAgICAgICAgdmFyIGhvdXJzICAgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDM2MDApO1xuICAgICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigodG90YWxTZWNvbmRzIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgICAgICAgIHZhciBzZWNvbmRzID0gdG90YWxTZWNvbmRzIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcbiAgICAgICAgICAvLyByb3VuZCBzZWNvbmRzXG4gICAgICAgICAgc2Vjb25kcyA9IE1hdGgucm91bmQoc2Vjb25kcyAqIDEwMCkgLyAxMDBcblxuICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIHZhciBsYXRlciA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgbGF0ZXIuc2V0SG91cnMobm93LmdldEhvdXJzKCkraG91cnMpO1xuICAgICAgICAgIGxhdGVyLnNldE1pbnV0ZXMobm93LmdldE1pbnV0ZXMoKSttaW51dGVzKTtcbiAgICAgICAgICAvL2xhdGVyLnNldFNlY29uZHMobm93LmdldFNlY29uZHMoKStzZWNvbmRzKTtcblxuICAgICAgICAgIGxhdGVyID0gbGF0ZXIuZ2V0RGF0ZSgpICsgXCItXCIgKyAobGF0ZXIuZ2V0TW9udGgoKSsxKSArIFwiLVwiICsgbGF0ZXIuZ2V0RnVsbFllYXIoKSArICBcIiBcIiArIGxhdGVyLmdldEhvdXJzKCkgKyBcIi1cIiArIChsYXRlci5nZXRNaW51dGVzKCkpO1xuICAgICAgICAgIHJldHVybiBsYXRlcjtcbiAgICAgICAgfVxuXG4gICAgfTtcbn0pO1xuXG5hcHAuZmFjdG9yeShcIm1vZGFsRmFjdG9yeVwiLCBmdW5jdGlvbigkd2luZG93LCAkcm9vdFNjb3BlKXtcblxuICByZXR1cm57XG5cbiAgICAgIG9wZW5Nb2RhbDogZnVuY3Rpb24obW9kYWxUeXBlKXtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBvcGVuTW9kYWwgZnVuY3Rpb24gbW9kYWxUeXBlID1cIiArIG1vZGFsVHlwZSk7XG4gICAgICAgIHZhciBkbGdFbGVtO1xuICAgICAgICBzd2l0Y2ggKG1vZGFsVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm1vZGFsTG9naW5Gb3JtXCIgOlxuICAgICAgICAgICAgICAgIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxMb2dpbkZvcm1cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgY2FzZSBcIm1vZGFsUmVnaXN0ZXJGb3JtXCIgOlxuICAgICAgICAgICAgICAgIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxSZWdpc3RlckZvcm1cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgY2FzZSBcImZvcmNlTG9nb3V0TW9kYWxcIiA6XG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNmb3JjZUxvZ291dE1vZGFsXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1vZGFsRm9yZ290XCIgOlxuICAgICAgICAgICAgICAgIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxGb3Jnb3RcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgZGVmYXVsdDogXG4gICAgICAgICAgICAgICAgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNmb3JjZUxvZ291dE1vZGFsXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZGxnRWxlbSkge1xuICAgICAgICAgICAgZGxnRWxlbS5tb2RhbChcInNob3dcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgfTtcbn0pO1xuXG5cblxuXG5cblxuXG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG5hcHAuY29uc3RhbnQoJ0NPTlNUQU5UUycse1xuXG5cdFNJR05fVVBcdDogJ1NpZ24gVXAnLFxuXHRTSUdOX0lOIDogJ1NpZ24gSW4nLFxuXHRNQVNURVIgOiAnTGV0cyBiZSBNYXN0ZXIuLi4nLFxuXHRORVdfQ09OVEVOVF9HUk9VUCA6ICdOZXcgQ29udGVudCBHcm91cCcsXG5cdE5FV19VTklUIDogJ05ldyBVbml0Jyxcblx0RU1BSUwgOiAnRW1haWwnLFxuXHRGSVJTVF9OQU1FIDogJ0ZpcnN0IE5hbWUnLFxuXHRMQVNUX05BTUUgOiAnTGFzdCBOYW1lJyxcblx0RE9CIDogJ0RhdGUgT2YgQmlydGgnLFxuXHRQQVNTV09SRCA6ICdQYXNzd29yZCcsXG5cdExPR0lOIDogJ0xvZ2luJyxcblx0Rk9SR0VUX0FDQ09VTlQgOiAnRm9yZ2V0IEFjY291bnQgPycsXG5cdEZPUkdPVF9ZT1VSX0FDQ09VTlQgOiAnRm9yZ290IHlvdXIgYWNjb3VudCcsXG5cdFNVQk1JVCA6ICdTdWJtaXQnLFxuXHRTRVNTX0VYUElSRUQgOiAnU2Vzc2lvbiBFeHBpcmVkJyxcblx0U0VTU19FWFBJUkVEX09LIDogJ1lvdXIgc2Vzc2lvbiBpcyBleHBpcmVkLiBQbGVhc2UgY2xpY2sgT0sgdG8gbG9naW4gYWdhaW4uJyxcblx0T0sgOiAnT0snLFxuXG5cblxuXG5cdElOVkFMSURfRU1BSUwgOiAnUGxlYXNlIGVudGVyIHZhbGlkIGVtYWlsIGFkZHJlc3MnLFxuXHRGT1JHRVRfU1VDQ0VTUyA6ICdQbGVhc2UgY2hlY2sgeW91ciBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkLicsXG5cdElOVkFMSURfRE9CIDogJ0RPQiBtdXN0IGJlIGluIG1tLWRkLXl5eXkgZm9ybWF0LicsXG5cdFVTRVJOQU1FX0VYSVNUUyA6ICdVc2VybmFtZSBhbHJlYWR5IGV4aXN0cy4nLFxuXHRJTlZBTElEX1VTRVJOQU1FX1BBU1NXT1JEIDogJ0ludmFsaWQgVXNlcm5hbWUvUGFzc3dvcmQuJyxcblx0TUlTU0lOR19QQVJBTUVURVIgOiAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgaW4gdGhlIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW4uJyxcblx0SU5URVJOQUxfU0VSVkVSX0VSUk9SIDogJ0ludGVybmFsIHNlcnZlciBlcnJvci4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nLFxuXHRTRVNTSU9OX0VYUElSRUQgOiAnWW91ciBzZXNzaW9uIGlzIGV4cGlyZWQuIFBsZWFzZSBsb2dvdXQgYW5kIGxvZ2luLicsXG5cdFJFUVVFU1RfRkFJTEVEIDogJ1JlcXVlc3QgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLidcbn0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGFzc2lnbm1lbnRDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2bS4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdhc3NpZ25tZW50Q3RybCcsIGFzc2lnbm1lbnRDdHJsKTtcblxuYXBwLmNvbXBvbmVudCgnYXNzaWdubWVudENvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvYXNzaWdubWVudC5odG1sJyxcbiAgY29udHJvbGxlcjogJ2Fzc2lnbm1lbnRDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgY2xhc3NDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ2NsYXNzQ3RybCcsIGNsYXNzQ3RybCk7XG5cbmFwcC5jb21wb25lbnQoJ2NsYXNzQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9jbGFzcy5odG1sJyxcbiAgY29udHJvbGxlcjogJ2NsYXNzQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGNyZWF0ZUNvbnRlbnRHcm91cEN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2UsIG1vZGFsRmFjdG9yeSwgQ09OU1RBTlRTLCBBUElTZXJ2aWNlKXtcblx0dmFyIHZtID0gdGhpcztcblx0JHNjb3BlLkNPTlNUQU5UUyA9IENPTlNUQU5UUztcblxuXHR2YXIgb2JqID0gbG9jYWxTdG9yYWdlLmdldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbigpO1xuXG5cdHZhciBleHBpcnlEYXRlVGltZSA9IG9iai5leHBpcmVzX3RpbWU7XG5cblx0dm0uJHJvdXRlck9uQWN0aXZhdGUgPSBmdW5jdGlvbihuZXh0KSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgcm91dGVyT25BY3RpdmF0ZSBcIik7XG5cdH1cblxuXHR2bS5hZGROZXdDb250ZW50R3JvdXAgPSBmdW5jdGlvbigpe1xuXG5cdFx0Y29uc29sZS5sb2coXCJJbnNpZGUgYWRkTmV3Q29udGVudEdyb3VwXCIpO1xuXG4gICAgICAgIG9iaiA9IGxvY2FsU3RvcmFnZS5nZXRBY2Nlc3NBbmRSZWZyZXNoVG9rZW4oKTtcbiAgICAgICAgZXhwaXJ5RGF0ZVRpbWUgPSBvYmouZXhwaXJlc190aW1lO1xuXG5cdFx0dmFyIGNvbnRlbnRHcm91cEpzb24gPXtcblx0XHRcdFwibmFtZVwiOiB2bS5jZ05hbWUsXG5cdFx0XHRcImRlc2NcIjogdm0uY2dEZXNjLFxuXHRcdFx0XCJwYXJlbnRfaWRcIjogdm0uY2dQYXJlbnRcblx0XHR9O1xuXG5cdFx0dmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS9jb250ZW50cycsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG5cdFx0XHQgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0ICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBvYmouYWNjZXNzX3Rva2VuXG5cdFx0XHQgfSxcblx0XHRcdHBhcmFtczogeyB1c2VyX2lkOiBvYmoudWlkIH0sXG4gICAgICAgICAgICBkYXRhOiBjb250ZW50R3JvdXBKc29uXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoQVBJU2VydmljZS5pc1VzZXJBdXRoZW50aWNhdGVkKCkpe1xuICAgICAgICBcdGh0dHBQb3N0QWRkQ29udGVudEdyb3VwQ2FsbChyZXF1ZXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQgLSBUcnVlJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCAtIEZhbHNlJyk7XG4gICAgICAgICAgICBtb2RhbEZhY3Rvcnkub3Blbk1vZGFsKCdmb3JjZUxvZ291dE1vZGFsJyk7XG4gICAgICAgIH1cblxuXHR9XG5cblx0dmFyIGh0dHBQb3N0QWRkQ29udGVudEdyb3VwQ2FsbCA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcblxuICAgIFx0Y29uc29sZS5sb2coXCJJbnNpZGUgaHR0cFBvc3RBZGRDb250ZW50R3JvdXBDYWxsIGZ1bmN0aW9uIFwiKTtcblxuICAgICAgICAkaHR0cChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ2NyZWF0ZUNvbnRlbnRHcm91cEN0cmwnLCBjcmVhdGVDb250ZW50R3JvdXBDdHJsKTtcblxuY3JlYXRlQ29udGVudEdyb3VwQ3RybC4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCIkd2luZG93XCIsIFwiJHNjb3BlXCIsIFwibG9jYWxTdG9yYWdlXCIsIFwibW9kYWxGYWN0b3J5XCIsIFwiQ09OU1RBTlRTXCIsIFwiQVBJU2VydmljZVwiXTtcblxuYXBwLmNvbXBvbmVudCgnY3JlYXRlQ29udGVudEdyb3VwQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9jcmVhdGVDb250ZW50R3JvdXAuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdjcmVhdGVDb250ZW50R3JvdXBDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgY3JlYXRlVW5pdEN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2UsIG1vZGFsRmFjdG9yeSwgQ09OU1RBTlRTKXtcblx0dmFyIHZtID0gdGhpcztcblx0JHNjb3BlLkNPTlNUQU5UUyA9IENPTlNUQU5UUztcblxuXHR2YXIgbmF2aWdhdG9yID0gd2luZG93Lm5hdmlnYXRvcjtcblx0bmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEpO1xuXG5cdHZhciBDb250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXHR2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cblx0dmFyIHJlc09iaiwgcmVjb3JkQnV0dG9uLCBzdG9wQnV0dG9uLCByZWNvcmRlcjtcblx0cmVjb3JkQnV0dG9uID0gYW5ndWxhci5lbGVtZW50KCcjcmVjb3JkJyk7XG5cdHN0b3BCdXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoJyNzdG9wJyk7XG5cblx0aW5pdEF1ZGlvKCk7XG5cblx0cmVjb3JkQnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRyZWNvcmRCdXR0b24uY2xpY2soc3RhcnRSZWNvcmRpbmcpO1xuXHRzdG9wQnV0dG9uLmNsaWNrKHN0b3BSZWNvcmRpbmcpO1xuXG5cdGZ1bmN0aW9uIHN0YXJ0UmVjb3JkaW5nKCkge1xuXHQgICByZWNvcmRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0ICAgc3RvcEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0ICAgcmVjb3JkZXIuY2xlYXIoKTtcblx0ICAgcmVjb3JkZXIucmVjb3JkKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdG9wUmVjb3JkaW5nKCkge1xuXHQgICByZWNvcmRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdCAgIHN0b3BCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0ICAgcmVjb3JkZXIuc3RvcCgpO1xuXHQgICByZWNvcmRlci5leHBvcnRXQVYoc3RlcmVvX2NiKTtcblx0ICAgcmVjb3JkZXIuY2xlYXIoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0ZXJlb19jYihibG9iKXtcblx0ICAgY29uc29sZS5sb2coXCJibG9iID0gXCIsIGJsb2IpO1xuXHQgICAvLyB2YXIgbXNnID0gbmV3IEJsb2IoW2NvbnRleHQuc2FtcGxlUmF0ZSwgYmxvYl0pO1xuXHQgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblx0ICAgZm9ybURhdGEuYXBwZW5kKCdhdWRpbycsIGJsb2IpO1xuXHQgICAvLyAgICBmb3JtRGF0YS5hcHBlbmQoJ2RlYnVnJywgJCgnI2RlYnVnJykucHJvcCgnY2hlY2tlZCcpKVxuXHQgICBmb3JtRGF0YS5hcHBlbmQoJ2RlYnVnJywgdHJ1ZSlcblxuXHQgICAvL3Bvc3RBc0Zvcm1EYXRhKGZvcm1EYXRhLCBwcmVkaWN0aW9uX3NlcnZpY2UsIHByZWRpY3Rpb25fY2FsbGJhY2spO1xuXHQgICBhdWRpby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHQgICBhdWRpby5wbGF5KCk7XG5cdH07XG5cblx0ZnVuY3Rpb24gaW5pdEF1ZGlvKCkge1xuXHQgICBpZiAoIW5hdmlnYXRvci5nZXRVc2VyTWVkaWEpXG5cdCAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhXG5cdCAgIGlmICghbmF2aWdhdG9yLmNhbmNlbEFuaW1hdGlvbkZyYW1lKVxuXHQgICAgICAgbmF2aWdhdG9yLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gbmF2aWdhdG9yLndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IG5hdmlnYXRvci5tb3pDYW5jZWxBbmltYXRpb25GcmFtZTtcblx0ICAgaWYgKCFuYXZpZ2F0b3IucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuXHQgICAgICAgbmF2aWdhdG9yLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IG5hdmlnYXRvci53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgbmF2aWdhdG9yLm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuXHQgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKFxuXHQgICB7XG5cdCAgICAgICBcImF1ZGlvXCI6IHtcblx0ICAgICAgICAgICBcIm1hbmRhdG9yeVwiOiB7XG5cdCAgICAgICAgICAgICAgIFwiZ29vZ0VjaG9DYW5jZWxsYXRpb25cIjogXCJ0cnVlXCIsXG5cdCAgICAgICAgICAgICAgIFwiZ29vZ0F1dG9HYWluQ29udHJvbFwiOiBcInRydWVcIixcblx0ICAgICAgICAgICAgICAgXCJnb29nTm9pc2VTdXBwcmVzc2lvblwiOiBcInRydWVcIixcblx0ICAgICAgICAgICAgICAgXCJnb29nSGlnaHBhc3NGaWx0ZXJcIjogXCJ0cnVlXCJcblx0ICAgICAgICAgICB9LFxuXHQgICAgICAgICAgIFwib3B0aW9uYWxcIjogW11cblx0ICAgICAgIH0sXG5cdCAgIH0sIGdvdFN0cmVhbSwgZnVuY3Rpb24oZSkge1xuXHQgICAgICAgYWxlcnQoJ0Vycm9yIGdldHRpbmcgYXVkaW8nKTtcblx0ICAgICAgIGNvbnNvbGUubG9nKGUpO1xuXHQgICB9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdvdFN0cmVhbShzdHJlYW0pIHtcblx0ICAgdmFyIGlucHV0UG9pbnQgPSBjb250ZXh0LmNyZWF0ZUdhaW4oKTtcblxuXHQgICAvLyBDcmVhdGUgYW4gQXVkaW9Ob2RlIGZyb20gdGhlIHN0cmVhbS5cblx0ICAgdmFyIGF1ZGlvSW5wdXQgPSBjb250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG5cdCAgIGF1ZGlvSW5wdXQuY29ubmVjdChpbnB1dFBvaW50KTtcblxuXHQgICB2YXIgYW5hbHlzZXJOb2RlID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuXHQgICBhbmFseXNlck5vZGUuZmZ0U2l6ZSA9IDIwNDg7XG5cdCAgIGlucHV0UG9pbnQuY29ubmVjdChhbmFseXNlck5vZGUpO1xuXG5cdCAgIHJlY29yZGVyID0gbmV3IFJlY29yZGVyKGlucHV0UG9pbnQpO1xuXG5cdCAgIHZhciB6ZXJvR2FpbiA9IGNvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgICB6ZXJvR2Fpbi5nYWluLnZhbHVlID0gMC4wO1xuXHQgICBpbnB1dFBvaW50LmNvbm5lY3QoemVyb0dhaW4pO1xuXHQgICB6ZXJvR2Fpbi5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuXHR9XG5cblxuXG5cdHZtLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ2NyZWF0ZVVuaXRDdHJsJywgY3JlYXRlVW5pdEN0cmwpO1xuXG5jcmVhdGVVbml0Q3RybC4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCIkd2luZG93XCIsIFwiJHNjb3BlXCIsIFwibG9jYWxTdG9yYWdlXCIsIFwibW9kYWxGYWN0b3J5XCIsIFwiQ09OU1RBTlRTXCJdO1xuXG5hcHAuY29tcG9uZW50KCdjcmVhdGVVbml0Q29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9jcmVhdGVVbml0Lmh0bWwnLFxuICBjb250cm9sbGVyOiAnY3JlYXRlVW5pdEN0cmwnLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn0pOyIsIlxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGhlYWRlckN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2UsIG1vZGFsRmFjdG9yeSwgQ09OU1RBTlRTLCBBUElTZXJ2aWNlKXtcblx0dmFyIHZtID0gdGhpcztcbiAgICAkc2NvcGUuQ09OU1RBTlRTID0gQ09OU1RBTlRTO1xuXG5cdHZhciBvYmogPSBsb2NhbFN0b3JhZ2UuZ2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKCk7XG5cblx0dmFyIGV4cGlyeURhdGVUaW1lID0gb2JqLmV4cGlyZXNfdGltZTtcblxuXHR2bS51cGRhdGVVc2VySW5mbyA9IGZ1bmN0aW9uKCl7XG5cblx0XHRjb25zb2xlLmxvZyhcIkluc2lkZSB1cGRhdGVVc2VySW5mb1wiKTtcblxuICAgICAgICBvYmogPSBsb2NhbFN0b3JhZ2UuZ2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKCk7XG4gICAgICAgIGV4cGlyeURhdGVUaW1lID0gb2JqLmV4cGlyZXNfdGltZTtcblxuXHRcdHZhciB1c2VySnNvbiA9e1xuXHRcdFx0XCJmaXJzdF9uYW1lXCI6IFwiQTE3XCIsXG5cdFx0XHRcImxhc3RfbmFtZVwiOiBcImIxN1wiLFxuXHRcdFx0XCJ1c2VyX2F0dHJpYnV0ZXNcIjoge1xuXHRcdFx0XHRcImRvYlwiOiBcIjIyLTA0LTE5ODdcIlxuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cDovLzE5Mi4xNjguNzEuMTA6MTAwMTAvYXBpL2FpdWFtL3YxL3VzZXJzLycrIG9iai51aWQsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG5cdFx0XHQgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0ICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBvYmouYWNjZXNzX3Rva2VuXG5cdFx0XHQgfSxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJKc29uXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoQVBJU2VydmljZS5pc1VzZXJBdXRoZW50aWNhdGVkKCkpe1xuICAgICAgICBcdGh0dHBQdXRVcGRhdGVVc2VyQ2FsbChyZXF1ZXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQgLSBUcnVlJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCAtIEZhbHNlJyk7XG4gICAgICAgICAgICBtb2RhbEZhY3Rvcnkub3Blbk1vZGFsKCdmb3JjZUxvZ291dE1vZGFsJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB2YXIgaHR0cFB1dFVwZGF0ZVVzZXJDYWxsID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuXG4gICAgXHRjb25zb2xlLmxvZyhcIkluc2lkZSBodHRwUHV0VXBkYXRlVXNlckNhbGwgZnVuY3Rpb24gXCIpO1xuXG4gICAgICAgICRodHRwKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICB2bS5mb3JjZUxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5jbGVhckxvY2FsU3RvcmFnZUtleSgpKXtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL2luZGV4Lmh0bWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCggJyN0b3BoZWFkZXIgLm5hdmJhci1uYXYgYScgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCAnI3RvcGhlYWRlciAubmF2YmFyLW5hdicgKS5maW5kKCAnbGkuYWN0aXZlJyApLnJlbW92ZUNsYXNzKCAnYWN0aXZlJyApO1xuICAgICAgICAkKCB0aGlzICkucGFyZW50KCAnbGknICkuYWRkQ2xhc3MoICdhY3RpdmUnICk7XG4gICAgfSk7XG5cbn1cblxuXG5hcHAuY29udHJvbGxlcignaGVhZGVyQ3RybCcsIGhlYWRlckN0cmwpO1xuXG5oZWFkZXJDdHJsLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiR3aW5kb3dcIiwgXCIkc2NvcGVcIiwgXCJsb2NhbFN0b3JhZ2VcIiwgXCJtb2RhbEZhY3RvcnlcIiwgXCJDT05TVEFOVFNcIiwgXCJBUElTZXJ2aWNlXCJdO1xuXG5hcHAuY29tcG9uZW50KCdoZWFkZXJDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL2hlYWRlci5odG1sJyxcbiAgY29udHJvbGxlcjogJ2hlYWRlckN0cmwnLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGhvbWVDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCwgcHJldmlvdXMpIHtcblx0XHRjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdob21lQ3RybCcsIGhvbWVDdHJsKTtcblxuYXBwLmNvbXBvbmVudCgnaG9tZUNvbXBvbmVudCcse1xuICB0ZW1wbGF0ZTogJycsXG4gIGNvbnRyb2xsZXI6ICdob21lQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgYmluZGluZ3M6IHsgJHJvdXRlcjogJzwnIH1cbn0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJyk7XG5cbnZhciBsYW5kaW5nQ3RybCA9IGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkc2NvcGUsIGxvY2FsU3RvcmFnZSwgbW9kYWxGYWN0b3J5LCBDT05TVEFOVFMpe1xuXHR2YXIgdm0gPSB0aGlzO1xuICAgICRzY29wZS5DT05TVEFOVFMgPSBDT05TVEFOVFM7XG5cbiAgICAkKCcjZGF0ZXRpbWVwaWNrZXIxJykuZGF0ZXBpY2tlcih7XG4gICAgICAgIGZvcm1hdDogJ21tLWRkLXl5eXknLFxuICAgICAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZSxcbiAgICAgICAgYXV0b2Nsb3NlOiB0cnVlXG4gICAgfSk7XG5cbiAgICB2bS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIubW9kYWxcIik7XG4gICAgICAgIGlmIChkbGdFbGVtKSB7XG4gICAgICAgICAgICBkbGdFbGVtLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZtLm9wZW5Gb3Jnb3RNb2RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZtLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgdm0ub3Blbk1vZGFsKCdtb2RhbEZvcmdvdCcpO1xuICAgIH1cblxuXHR2bS5vcGVuTW9kYWwgPSBmdW5jdGlvbihtb2RhbFR5cGUpe1xuXHRcdGNvbnNvbGUubG9nKFwiSW5zaWRlIG9wZW5SZWdpc3Rlck1vZGFsIGZ1bmN0aW9uIG1vZGFsVHlwZSA9XCIgKyBtb2RhbFR5cGUpO1xuXHRcdG1vZGFsRmFjdG9yeS5vcGVuTW9kYWwobW9kYWxUeXBlKTtcblx0fVxuXG5cdHZtLnJlZ2lzdGVyTWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJkbyBhY3Rpb24gb24gTW9kYWwgc2lnbiB1cCBjbGlja2VkLS1cIik7XG5cbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxSZWdpc3RlckZvcm0gLm1vZGFsLWJvZHkgLmFsZXJ0XCIpO1xuICAgICAgICBpZihkbGdFbGVtKXtcbiAgICAgICAgICAgIGRsZ0VsZW0uZGV0YWNoKCk7XG4gICAgICAgIH1cblxuXHRcdHZhciBzaWduVXBKc29uID17XG5cdFx0XHRcImVtYWlsXCI6IHZtLnJlZ2lzdGVyRW1haWwsXG5cdFx0XHRcImZpcnN0X25hbWVcIjogdm0ucmVnaXN0ZXJGaXJzdE5hbWUsXG5cdFx0XHRcImxhc3RfbmFtZVwiOiB2bS5yZWdpc3Rlckxhc3ROYW1lLFxuXHRcdFx0XCJwYXNzd29yZFwiOiB2bS5yZWdpc3RlclBhc3N3b3JkLFxuXHRcdFx0XCJ1c2VyX2F0dHJpYnV0ZXNcIjoge1xuXHRcdFx0XHRcImRvYlwiOiB2bS5yZWdpc3RlckRvYlxuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy9zaWdudXAnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuXHRcdFx0ICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0IH0sXG4gICAgICAgICAgICBkYXRhOiBzaWduVXBKc29uXG4gICAgICAgIH07XG4gICAgICAgIFxuXHRcdGh0dHBQb3N0U2lnblVwQ2FsbChyZXF1ZXN0KTtcbiAgICBcbiAgICB9O1xuXG4gICAgdm0ubG9naW5NZSA9IGZ1bmN0aW9uKCl7XG5cdCAgIFx0Y29uc29sZS5sb2coXCJkbyBhY3Rpb24gb24gTW9kYWwgbG9naW4gY2xpY2tlZC0tXCIpO1xuXG4gICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsTG9naW5Gb3JtIC5tb2RhbC1ib2R5IC5hbGVydFwiKTtcbiAgICAgICAgaWYoZGxnRWxlbSl7XG4gICAgICAgICAgICBkbGdFbGVtLmRldGFjaCgpO1xuICAgICAgICB9XG5cblx0ICAgXHR2YXIgbG9naW5Kc29uID17XG5cdFx0XHRcInVzZXJuYW1lXCI6IHZtLmxvZ2luVXNlcm5hbWUsXG5cdFx0XHRcInBhc3N3b3JkXCI6IHZtLmxvZ2luUGFzc3dvcmQsXG5cdFx0fTtcblx0XHR2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cDovLzE5Mi4xNjguNzEuMTA6MTAwMTAvYXBpL2FpdWFtL3YxL3VzZXJzL2xvZ2luJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcblx0XHRcdCAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHQgfSxcbiAgICAgICAgICAgIGRhdGE6IGxvZ2luSnNvblxuICAgICAgICB9O1xuXG5cdCAgIFx0aHR0cFBvc3RMb2dpbkNhbGwocmVxdWVzdCk7XG5cdH1cblxuICAgIHZtLmZvcmdvdFBhc3N3b3JkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJkbyBhY3Rpb24gb24gRm9yZ290IHBhc3N3b3JkIGNsaWNrLS1cIik7XG5cbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxGb3Jnb3QgLm1vZGFsLWJvZHkgLmFsZXJ0XCIpO1xuICAgICAgICBpZihkbGdFbGVtKXtcbiAgICAgICAgICAgIGRsZ0VsZW0uZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZm9yZ290SnNvbiA9e1xuICAgICAgICAgICAgXCJlbWFpbFwiOiB2bS5mb3Jnb3RVc2VyRW5haWxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy9mb3JnZXQtcGFzc3dvcmQnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YTogZm9yZ290SnNvblxuXG4gICAgICAgIH07XG5cbiAgICAgICAgaHR0cFBvc3RGb3Jnb3RQYXNzd29yZENhbGwocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgdmFyIGh0dHBQb3N0TG9naW5DYWxsID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuXG4gICAgXHRjb25zb2xlLmxvZyhcIkluc2lkZSBodHRwUG9zdExvZ2luQ2FsbCBmdW5jdGlvbiBcIik7XG5cbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbkRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICBcImFjY2Vzc190b2tlblwiIDogdG9rZW5EYXRhLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcImV4cGlyZXNfaW5cIiA6IHRva2VuRGF0YS5leHBpcmVzX2luLFxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF90b2tlblwiIDogdG9rZW5EYXRhLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJleHBpcmVzX3RpbWVcIiA6IGxvY2FsU3RvcmFnZS5jb252ZXJ0U2Vjb25kc1RvRGF0ZVRpbWUodG9rZW5EYXRhLmV4cGlyZXNfaW4pLFxuICAgICAgICAgICAgICAgIFwidWlkXCIgOiB0b2tlbkRhdGEudWlkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihsb2NhbFN0b3JhZ2Uuc2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKG9iaikpe1xuICAgICAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL2Rhc2hib2FyZC5odG1sJztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICB2YXIgZXJyb3JEZXNjcmlwdGlvbiA9IGNyZWF0ZUVycm9yTWVzc2FnZXMoZXJyb3IpO1xuICAgICAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxMb2dpbkZvcm0gLm1vZGFsLWJvZHlcIik7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nICtlcnJvckRlc2NyaXB0aW9uICsnIDwvZGl2Pic7XG4gICAgICAgICAgICBkbGdFbGVtLmFwcGVuZChlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBodHRwUG9zdFNpZ25VcENhbGwgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJbnNpZGUgaHR0cFBvc3RTaWduVXBDYWxsIGZ1bmN0aW9uIFwiKTtcbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxSZWdpc3RlckZvcm1cIik7XG5cbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChkbGdFbGVtKSB7XG4gICAgICAgICAgICAgICBkbGdFbGVtLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG5cbiAgICAgICAgICAgIHZhciBlcnJvckRlc2NyaXB0aW9uID0gY3JlYXRlRXJyb3JNZXNzYWdlcyhlcnJvcik7XG4gICAgICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbFJlZ2lzdGVyRm9ybSAubW9kYWwtYm9keVwiKTtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicgKyBlcnJvckRlc2NyaXB0aW9uICsnIDwvZGl2Pic7XG4gICAgICAgICAgICBkbGdFbGVtLmFwcGVuZChlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBodHRwUG9zdEZvcmdvdFBhc3N3b3JkQ2FsbCA9IGZ1bmN0aW9uKHJlcXVlc3Qpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0Rm9yZ290UGFzc3dvcmRDYWxsIGZ1bmN0aW9uIFwiKTtcblxuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbEZvcmdvdCAubW9kYWwtYm9keVwiKTtcblxuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nKyBDT05TVEFOVFMuSU5WQUxJRF9FTUFJTCArICc8L2Rpdj4nO1xuXG4gICAgICAgICRodHRwKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5EYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzRmxhZyA9IHRva2VuRGF0YS5zdWNjZXNzO1xuXG4gICAgICAgICAgICBpZihzdWNjZXNzRmxhZyl7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzXCI+JyArIENPTlNUQU5UUy5GT1JHRVRfU1VDQ0VTUyArICc8L2Rpdj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHZhciBjcmVhdGVFcnJvck1lc3NhZ2VzID0gZnVuY3Rpb24oZXJyb3JPYmope1xuXG4gICAgICAgIHZhciBlcnJDb2RlLCBlcnJEZXNjO1xuICAgICAgICAgICAgaWYoZXJyb3JPYmogIT0gbnVsbCl7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVycm9yT2JqLmRhdGEuZXJyb3JfY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwN1wiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuSU5WQUxJRF9ET0I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA1XCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5VU0VSTkFNRV9FWElTVFM7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDAzXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5JTlZBTElEX1VTRVJOQU1FX1BBU1NXT1JEO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA4XCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5JTlZBTElEX0VNQUlMO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMTAwMVwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckRlc2MgPSBDT05TVEFOVFMuTUlTU0lOR19QQVJBTUVURVI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI1MDAwXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5JTlRFUk5BTF9TRVJWRVJfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA0XCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5TRVNTSU9OX0VYUElSRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGVzYyA9IENPTlNUQU5UUy5SRVFVRVNUX0ZBSUxFRDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVyckRlc2M7XG4gICAgfVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdsYW5kaW5nQ3RybCcsIGxhbmRpbmdDdHJsKTtcblxubGFuZGluZ0N0cmwuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHdpbmRvd1wiLCBcIiRzY29wZVwiLCBcImxvY2FsU3RvcmFnZVwiLCBcIm1vZGFsRmFjdG9yeVwiLCBcIkNPTlNUQU5UU1wiXTtcblxuYXBwLmNvbXBvbmVudCgnbGFuZGluZ0NvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvbGFuZGluZy5odG1sJyxcbiAgY29udHJvbGxlcjogJ2xhbmRpbmdDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgc3R1ZGVudEN0cmwgPSBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJHNjb3BlLCBsb2NhbFN0b3JhZ2Upe1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHRoaXMuJHJvdXRlck9uQWN0aXZhdGUgPSBmdW5jdGlvbihuZXh0KSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgcm91dGVyT25BY3RpdmF0ZSBcIik7XG5cdH1cblxufVxuXG5hcHAuY29udHJvbGxlcignc3R1ZGVudEN0cmwnLCBzdHVkZW50Q3RybCk7XG5cbmFwcC5jb21wb25lbnQoJ3N0dWRlbnRDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL3N0dWRlbnQuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdzdHVkZW50Q3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIHVzZXJDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCwgcHJldmlvdXMpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCd1c2VyQ3RybCcsIHVzZXJDdHJsKTtcblxudXNlckN0cmwuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHdpbmRvd1wiLCBcIiRzY29wZVwiLCBcImxvY2FsU3RvcmFnZVwiXTtcblxuYXBwLmNvbXBvbmVudCgndXNlckNvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvdXNlci5odG1sJyxcbiAgY29udHJvbGxlcjogJ3VzZXJDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nLFxuICBiaW5kaW5nczogeyAkcm91dGVyOiAnPCcgfVxufSk7IiwiXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJyk7XG5cbmFwcC5mYWN0b3J5KFwiQVBJU2VydmljZVwiLCBbJyRodHRwJywgJyRxJywgJ2xvY2FsU3RvcmFnZScsICBmdW5jdGlvbigkaHR0cCwgJHEsIGxvY2FsU3RvcmFnZSl7XG5cblx0dmFyIG9iaiA9IGxvY2FsU3RvcmFnZS5nZXRBY2Nlc3NBbmRSZWZyZXNoVG9rZW4oKTtcblx0dmFyIGV4cGlyeURhdGVUaW1lID0gb2JqLmV4cGlyZXNfdGltZTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0IGlzVXNlckF1dGhlbnRpY2F0ZWQ6IGZ1bmN0aW9uKCl7XG5cblx0ICAgIFx0Y29uc29sZS5sb2coXCJJbnNpZGUgaXNVc2VyQXV0aGVudGljYXRlZCBleHBpcnlEYXRlVGltZSA9XCIgLCBleHBpcnlEYXRlVGltZSk7XG5cblx0ICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuZnV0dXJlRGF0ZVRpbWUodGhpcy50b0pTRGF0ZShleHBpcnlEYXRlVGltZSkpO1xuXG5cdCAgICAgICAgY29uc29sZS5sb2coXCJpc1ZhbGlkID1cIiwgaXNWYWxpZCk7XG5cblx0ICAgIFx0aWYoaXNWYWxpZCl7XG5cdCAgICBcdFx0Y29uc29sZS5sb2coJ0FjY2VzcyB0b2tlbiBpcyB2YWxpZCcpO1xuXHQgICAgXHRcdHJldHVybiB0cnVlO1xuXHQgICAgXHR9ZWxzZXtcblx0ICAgIFx0XHRjb25zb2xlLmxvZygnSW52YWxpZCBhY2Nlc3MgdG9rZW4gLSBIaXQgUmVmcmVzaCB0b2tlbiBBUEknKTtcblx0ICAgIFx0XHQvLyByZXR1cm4gZmFsc2U7XG5cdCAgICBcdFx0cmV0dXJuICh0aGlzLnByZXBhcmVSZWZyZXNoVG9rZW5BUEkoKSk7XG5cdCAgICBcdH1cblx0XHRcdFxuXHRcdH0sXG5cdFx0XG5cdCAgICB0b0pTRGF0ZTogZnVuY3Rpb24oZGF0ZVRpbWUpIHtcblxuXHQgICAgXHQvL2NvbnZlcnQgRGF0ZVRpbWUgKGRkLW1tLXl5eXkgaGgtbW0pIHRvIGphdmFzY3JpcHQgRGF0ZVRJbWVcblx0ICAgIFx0Ly9FeDogMTYtMTEtMjAxNSAxNjowNVxuXG5cdCAgICAgICAgdmFyIGRhdGVUaW1lID0gZGF0ZVRpbWUuc3BsaXQoXCIgXCIpOyAvL2RhdGVUaW1lWzBdID0gZGF0ZSwgZGF0ZVRpbWVbMV0gPSB0aW1lXG5cblx0ICAgICAgICB2YXIgZGF0ZSA9IGRhdGVUaW1lWzBdLnNwbGl0KFwiLVwiKTtcblx0ICAgICAgICB2YXIgdGltZSA9IGRhdGVUaW1lWzFdLnNwbGl0KFwiLVwiKTtcblxuXHQgICAgICAgIC8vKHllYXIsIG1vbnRoLCBkYXksIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpXG5cdCAgICAgICAgLy9zdWJ0cmFjdCAxIGZyb20gbW9udGggYmVjYXVzZSBKYW4gaXMgMCBhbmQgRGVjIGlzIDExXG5cdCAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVbMl0sIChkYXRlWzFdLTEpLCBkYXRlWzBdLCB0aW1lWzBdLCB0aW1lWzFdLCAwLCAwKTtcblxuXHQgICAgfSxcblxuXHQgICAgLy9DaGVjayB0byBzZWUgaWYgdGhlIERhdGVUaW1lIGlzIGluIHRoZSBmdXR1cmVcblx0ICAgIC8vcGFyYW06IGRhdGVUaW1lIG11c3QgYmUgYSBKUyBEYXRlIE9iamVjdFxuXHQgICAgLy9yZXR1cm4gVHJ1ZSBpZiBEYXRlVGltZSBpcyBhZnRlciBOb3dcblx0ICAgIC8vcmV0dXJuIEZhbHNlIGlmIERhdGVUSW1lIGlzIGJlZm9yZSBOb3dcblx0ICAgIGZ1dHVyZURhdGVUaW1lOiBmdW5jdGlvbihkYXRlVGltZSkge1xuXHQgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuXHQgICAgICAgIHZhciBmdXR1cmUgPSBmYWxzZTtcblx0ICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk5vdyBkYXRlIGlzID1cIiwgbm93KTtcblx0ICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV4cGlyeSBkYXRlIGlzID1cIiwgZGF0ZVRpbWUpO1xuXG5cdCAgICAgICAgaWYoIERhdGUucGFyc2Uobm93KSA8IERhdGUucGFyc2UoZGF0ZVRpbWUpICkge1xuXHQgICAgICAgICAgICBmdXR1cmUgPSB0cnVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBcblx0ICAgICAgICByZXR1cm4gZnV0dXJlO1xuXHQgICAgfSxcblxuXG5cdFx0cHJlcGFyZVJlZnJlc2hUb2tlbkFQSTogZnVuY3Rpb24oKXtcblxuXHQgICAgXHR2YXIgcmVmcmVzaEpzb24gPXtcblx0XHRcdFx0XCJyZWZyZXNoLXRva2VuXCI6IG9iai5yZWZyZXNoX3Rva2VuXG5cdFx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dmFyIHJlcXVlc3QgPSB7XG5cdCAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuXHQgICAgICAgICAgICB1cmw6ICdodHRwOi8vMTkyLjE2OC43MS4xMDoxMDAxMC9hcGkvYWl1YW0vdjEvdXNlcnMvJysgb2JqLnVpZCArICcvdG9rZW4vcmVmcmVzaCcsXG5cdCAgICAgICAgICAgIGhlYWRlcnM6IHtcblx0XHRcdFx0ICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHQgfSxcblx0ICAgICAgICAgICAgZGF0YTogcmVmcmVzaEpzb25cblx0ICAgICAgICB9O1xuXG5cdCAgICAgICAgcmV0dXJuICh0aGlzLmh0dHBQb3N0UmVmcmVzaFRva2VuQ2FsbChyZXF1ZXN0KSk7XG5cdCAgICB9LFxuXG5cblx0ICAgIGh0dHBQb3N0UmVmcmVzaFRva2VuQ2FsbDogZnVuY3Rpb24ocmVxdWVzdCkge1xuXG5cdCAgICBcdGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0UmVmcmVzaFRva2VuQ2FsbCBmdW5jdGlvbiBcIik7XG5cblx0ICAgICAgICAkaHR0cChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdCAgICAgICAgXHR2YXIgdG9rZW5EYXRhID0gcmVzcG9uc2UuZGF0YTtcblx0ICAgICAgICAgICAgdmFyIG9iaiA9IHtcblx0ICAgICAgICAgICAgICAgIFwiYWNjZXNzX3Rva2VuXCIgOiB0b2tlbkRhdGEuYWNjZXNzX3Rva2VuLFxuXHQgICAgICAgICAgICAgICAgXCJleHBpcmVzX2luXCIgOiB0b2tlbkRhdGEuZXhwaXJlc19pbixcblx0ICAgICAgICAgICAgICAgIFwicmVmcmVzaF90b2tlblwiIDogdG9rZW5EYXRhLnJlZnJlc2hfdG9rZW4sXG5cdCAgICAgICAgICAgICAgICBcImV4cGlyZXNfdGltZVwiIDogbG9jYWxTdG9yYWdlLmNvbnZlcnRTZWNvbmRzVG9EYXRlVGltZSh0b2tlbkRhdGEuZXhwaXJlc19pbiksXG5cdCAgICAgICAgICAgICAgICBcInVpZFwiIDogdG9rZW5EYXRhLnVpZFxuXHQgICAgICAgICAgICB9O1xuXG5cdCAgICAgICAgICAgIGlmKGxvY2FsU3RvcmFnZS5zZXRBY2Nlc3NBbmRSZWZyZXNoVG9rZW4ob2JqKSl7XG5cdCAgICAgICAgICAgIFx0Y29uc29sZS5sb2coXCJBY2Nlc3MgYW5kIHJlZnJlc2ggdG9rZW4gcmVmcmVzaGVkIGluIGxvY2FsIHN0b3JhZ2UuXCIpO1xuXHQgICAgICAgICAgICBcdC8vdm0udXBkYXRlVXNlckluZm8oKTtcblx0ICAgICAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcblx0ICAgICAgICAgICAgfWVsc2V7XG5cdCAgICAgICAgICAgICAgICAvL2hhbmRsZSB0aGUgY2FzZSB3aGVuIGxvY2FsIHN0b3JhZ2UgaXMgdW5zdWNjZXNzZnVsLi5cblx0ICAgICAgICAgICAgICAgIC8vIHNob3cgZXJyb3IgbWVzc2FnZSB0byB1c2VyIHRvIHJlZG8gdGhlIG9wZXJhdGlvbi4uXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXHQgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZyb20gaHR0cFBvc3RSZWZyZXNoVG9rZW5DYWxsIEFQSSBjYWxsID1cIiwgZXJyb3IpO1xuXHQgICAgICAgICAgICBtb2RhbEZhY3Rvcnkub3Blbk1vZGFsKCdmb3JjZUxvZ291dE1vZGFsJyk7XG5cdCAgICAgICAgICAgIC8vIEZvcmNlIGxvZ291dCB1c2VyIGFuZCB0YWtlIHRvIHRoZSBsb2dpbiBwYWdlLlxuXHQgICAgICAgIH0pO1xuXHQgICAgfVxuXG5cdH07XG5cbn1dKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=