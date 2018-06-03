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
    {path:'/assignments', component:'assignmentComponent', name:'Assignment'}
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
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./app.js ./src/app/components/landing.component.js ./src/app/components/header.component.js ./src/app/components/home.component.js ./src/app/components/student.component.js ./src/app/components/class.component.js ./src/app/components/assignment.component.js ./src/app/components/user.component.js ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./app.js */"./app.js");
__webpack_require__(/*! ./src/app/components/landing.component.js */"./src/app/components/landing.component.js");
__webpack_require__(/*! ./src/app/components/header.component.js */"./src/app/components/header.component.js");
__webpack_require__(/*! ./src/app/components/home.component.js */"./src/app/components/home.component.js");
__webpack_require__(/*! ./src/app/components/student.component.js */"./src/app/components/student.component.js");
__webpack_require__(/*! ./src/app/components/class.component.js */"./src/app/components/class.component.js");
__webpack_require__(/*! ./src/app/components/assignment.component.js */"./src/app/components/assignment.component.js");
module.exports = __webpack_require__(/*! ./src/app/components/user.component.js */"./src/app/components/user.component.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9hc3NpZ25tZW50LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvY2xhc3MuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbGFuZGluZy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL3N0dWRlbnQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy91c2VyLmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25FQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxpREFBaUQ7QUFDdEQsS0FBSywrREFBK0Q7QUFDcEUsS0FBSyx3REFBd0Q7QUFDN0QsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDakhEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2pCRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7O0FDaEJEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDOztBQUUzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVULFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdktEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUMsRTs7Ozs7Ozs7Ozs7QUNsQkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ3hMRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUNqQkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsQ0FBQyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJywgWyduZ0NvbXBvbmVudFJvdXRlciddKTtcblxuYXBwLnZhbHVlKCckcm91dGVyUm9vdENvbXBvbmVudCcsJ2xhbmRpbmcnKTtcbmFwcC5jb21wb25lbnQoJ2xhbmRpbmcnLHtcbiAgdGVtcGxhdGU6JzxsYW5kaW5nLWNvbXBvbmVudD48L2xhbmRpbmctY29tcG9uZW50PjxuZy1vdXRsZXQ+PC9uZy1vdXRsZXQ+JyxcbiAgJHJvdXRlQ29uZmlnOltcbiAgICAvLyB7cGF0aDonLycsY29tcG9uZW50Oidob21lQ29tcG9uZW50JyxuYW1lOidIb21lJ31cbiAgXVxufSk7XG5cblxuYXBwLnZhbHVlKCckcm91dGVyUm9vdENvbXBvbmVudCcsJ2Rhc2hib2FyZCcpO1xuYXBwLmNvbXBvbmVudCgnZGFzaGJvYXJkJyx7XG4gIHRlbXBsYXRlOic8aGVhZGVyLWNvbXBvbmVudD48L2hlYWRlci1jb21wb25lbnQ+PG5nLW91dGxldD48L25nLW91dGxldD4nLFxuICAkcm91dGVDb25maWc6W1xuICAgIHtwYXRoOicvJywgY29tcG9uZW50Oidob21lQ29tcG9uZW50JywgbmFtZTonSG9tZSd9LFxuICAgIHtwYXRoOicvc3R1ZGVudHMnLCBjb21wb25lbnQ6J3N0dWRlbnRDb21wb25lbnQnLCBuYW1lOidTdHVkZW50J30sXG4gICAge3BhdGg6Jy9jbGFzcycsIGNvbXBvbmVudDonY2xhc3NDb21wb25lbnQnLCBuYW1lOidDbGFzcyd9LFxuICAgIHtwYXRoOicvYXNzaWdubWVudHMnLCBjb21wb25lbnQ6J2Fzc2lnbm1lbnRDb21wb25lbnQnLCBuYW1lOidBc3NpZ25tZW50J31cbiAgXVxufSk7XG5cblxuLy9IYW5kbGUgc2VydmVyIGVycm9yIG1lc3NhZ2VzIGdsb2JhbGx5Li5cbmFwcC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uICgkcSwkcm9vdFNjb3BlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncmVzcG9uc2VFcnJvcic6IGZ1bmN0aW9uIChyZXNwb25zZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5tZXNzYWdlID0gcmVzcG9uc2VFcnJvci5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZUVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uID0ge307XG4gICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wb3N0ID0ge307XG4gICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wdXQgPSB7fTtcbiAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLnBhdGNoID0ge307XG5cbn1dKTtcblxuYXBwLmZhY3RvcnkoXCJsb2NhbFN0b3JhZ2VcIiwgZnVuY3Rpb24oJHdpbmRvdywgJHJvb3RTY29wZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2UgJiYgJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbXktc3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBnZXRBY2Nlc3NBbmRSZWZyZXNoVG9rZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKCR3aW5kb3cubG9jYWxTdG9yYWdlICYmICR3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ215LXN0b3JhZ2UnKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJMb2NhbFN0b3JhZ2VLZXk6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIm15LXN0b3JhZ2VcIik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29udmVydFNlY29uZHNUb0RhdGVUaW1lOiBmdW5jdGlvbih0b3RhbFNlY29uZHMpIHtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGNvbnZlcnRTZWNvbmRzVG9EYXRlVGltZSA9IFwiICsgdG90YWxTZWNvbmRzKTtcblxuICAgICAgICAgIHZhciBob3VycyAgID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAzNjAwKTtcbiAgICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoKHRvdGFsU2Vjb25kcyAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICAgICAgICB2YXIgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG4gICAgICAgICAgLy8gcm91bmQgc2Vjb25kc1xuICAgICAgICAgIHNlY29uZHMgPSBNYXRoLnJvdW5kKHNlY29uZHMgKiAxMDApIC8gMTAwXG5cbiAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICB2YXIgbGF0ZXIgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIGxhdGVyLnNldEhvdXJzKG5vdy5nZXRIb3VycygpK2hvdXJzKTtcbiAgICAgICAgICBsYXRlci5zZXRNaW51dGVzKG5vdy5nZXRNaW51dGVzKCkrbWludXRlcyk7XG4gICAgICAgICAgLy9sYXRlci5zZXRTZWNvbmRzKG5vdy5nZXRTZWNvbmRzKCkrc2Vjb25kcyk7XG5cbiAgICAgICAgICBsYXRlciA9IGxhdGVyLmdldERhdGUoKSArIFwiLVwiICsgKGxhdGVyLmdldE1vbnRoKCkrMSkgKyBcIi1cIiArIGxhdGVyLmdldEZ1bGxZZWFyKCkgKyAgXCIgXCIgKyBsYXRlci5nZXRIb3VycygpICsgXCItXCIgKyAobGF0ZXIuZ2V0TWludXRlcygpKTtcbiAgICAgICAgICByZXR1cm4gbGF0ZXI7XG4gICAgICAgIH1cblxuICAgIH07XG59KTtcblxuYXBwLmZhY3RvcnkoXCJtb2RhbEZhY3RvcnlcIiwgZnVuY3Rpb24oJHdpbmRvdywgJHJvb3RTY29wZSl7XG5cbiAgcmV0dXJue1xuXG4gICAgICBvcGVuTW9kYWw6IGZ1bmN0aW9uKG1vZGFsVHlwZSl7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJbnNpZGUgb3Blbk1vZGFsIGZ1bmN0aW9uIG1vZGFsVHlwZSA9XCIgKyBtb2RhbFR5cGUpO1xuICAgICAgICB2YXIgZGxnRWxlbTtcbiAgICAgICAgc3dpdGNoIChtb2RhbFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtb2RhbExvZ2luRm9ybVwiIDpcbiAgICAgICAgICAgICAgICBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsTG9naW5Gb3JtXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrOyBcbiAgICAgICAgICAgIGNhc2UgXCJtb2RhbFJlZ2lzdGVyRm9ybVwiIDpcbiAgICAgICAgICAgICAgICBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsUmVnaXN0ZXJGb3JtXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrOyBcbiAgICAgICAgICAgIGNhc2UgXCJmb3JjZUxvZ291dE1vZGFsXCIgOlxuICAgICAgICAgICAgICAgIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjZm9yY2VMb2dvdXRNb2RhbFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtb2RhbEZvcmdvdFwiIDpcbiAgICAgICAgICAgICAgICBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsRm9yZ290XCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrOyBcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgICAgICAgIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjZm9yY2VMb2dvdXRNb2RhbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGRsZ0VsZW0pIHtcbiAgICAgICAgICAgIGRsZ0VsZW0ubW9kYWwoXCJzaG93XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gIH07XG5cbn0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGFzc2lnbm1lbnRDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2bS4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdhc3NpZ25tZW50Q3RybCcsIGFzc2lnbm1lbnRDdHJsKTtcblxuYXBwLmNvbXBvbmVudCgnYXNzaWdubWVudENvbXBvbmVudCcse1xuICB0ZW1wbGF0ZVVybDonLi4vc3JjL2FwcC90ZW1wbGF0ZXMvYXNzaWdubWVudC5odG1sJyxcbiAgY29udHJvbGxlcjogJ2Fzc2lnbm1lbnRDdHJsJyxcbiAgY29udHJvbGxlckFzOiAndm0nXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgY2xhc3NDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ2NsYXNzQ3RybCcsIGNsYXNzQ3RybCk7XG5cbmFwcC5jb21wb25lbnQoJ2NsYXNzQ29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9jbGFzcy5odG1sJyxcbiAgY29udHJvbGxlcjogJ2NsYXNzQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwiXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3dlYi1jb250ZW50LXBvcnRhbCcpO1xuXG52YXIgaGVhZGVyQ3RybCA9IGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkc2NvcGUsIGxvY2FsU3RvcmFnZSwgbW9kYWxGYWN0b3J5KXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2YXIgb2JqID0gbG9jYWxTdG9yYWdlLmdldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbigpO1xuXG5cdHZhciBleHBpcnlEYXRlVGltZSA9IG9iai5leHBpcmVzX3RpbWU7XG5cblx0dm0udXBkYXRlVXNlckluZm8gPSBmdW5jdGlvbigpe1xuXG5cdFx0Y29uc29sZS5sb2coXCJJbnNpZGUgdXBkYXRlVXNlckluZm9cIik7XG5cbiAgICAgICAgb2JqID0gbG9jYWxTdG9yYWdlLmdldEFjY2Vzc0FuZFJlZnJlc2hUb2tlbigpO1xuICAgICAgICBleHBpcnlEYXRlVGltZSA9IG9iai5leHBpcmVzX3RpbWU7XG5cblx0XHR2YXIgdXNlckpzb24gPXtcblx0XHRcdFwiZmlyc3RfbmFtZVwiOiBcIkExN1wiLFxuXHRcdFx0XCJsYXN0X25hbWVcIjogXCJiMTdcIixcblx0XHRcdFwidXNlcl9hdHRyaWJ1dGVzXCI6IHtcblx0XHRcdFx0XCJkb2JcIjogXCIyMi0wNC0xOTg3XCJcblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjcxLjEwOjEwMDEwL2FwaS9haXVhbS92MS91c2Vycy8nKyBvYmoudWlkLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuXHRcdFx0ICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdCAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgb2JqLmFjY2Vzc190b2tlblxuXHRcdFx0IH0sXG4gICAgICAgICAgICBkYXRhOiB1c2VySnNvblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKGlzVXNlckF1dGhlbnRpY2F0ZWQodm0udXBkYXRlVXNlckluZm8pKXtcbiAgICAgICAgXHRodHRwUHV0VXBkYXRlVXNlckNhbGwocmVxdWVzdCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvL2NvbnZlcnQgRGF0ZVRpbWUgKGRkLW1tLXl5eXkgaGgtbW0pIHRvIGphdmFzY3JpcHQgRGF0ZVRJbWVcbiAgICAvL0V4OiAxNi0xMS0yMDE1IDE2OjA1XG4gICAgdmFyIHRvSlNEYXRlID0gZnVuY3Rpb24oIGRhdGVUaW1lICkge1xuXG4gICAgICAgIHZhciBkYXRlVGltZSA9IGRhdGVUaW1lLnNwbGl0KFwiIFwiKTsvL2RhdGVUaW1lWzBdID0gZGF0ZSwgZGF0ZVRpbWVbMV0gPSB0aW1lXG5cbiAgICAgICAgdmFyIGRhdGUgPSBkYXRlVGltZVswXS5zcGxpdChcIi1cIik7XG4gICAgICAgIHZhciB0aW1lID0gZGF0ZVRpbWVbMV0uc3BsaXQoXCItXCIpO1xuXG4gICAgICAgIC8vKHllYXIsIG1vbnRoLCBkYXksIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpXG4gICAgICAgIC8vc3VidHJhY3QgMSBmcm9tIG1vbnRoIGJlY2F1c2UgSmFuIGlzIDAgYW5kIERlYyBpcyAxMVxuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVsyXSwgKGRhdGVbMV0tMSksIGRhdGVbMF0sIHRpbWVbMF0sIHRpbWVbMV0sIDAsIDApO1xuXG4gICAgfVxuXG4gICAgLy9DaGVjayB0byBzZWUgaWYgdGhlIERhdGVUaW1lIGlzIGluIHRoZSBmdXR1cmVcbiAgICAvL3BhcmFtOiBkYXRlVGltZSBtdXN0IGJlIGEgSlMgRGF0ZSBPYmplY3RcbiAgICAvL3JldHVybiBUcnVlIGlmIERhdGVUaW1lIGlzIGFmdGVyIE5vd1xuICAgIC8vcmV0dXJuIEZhbHNlIGlmIERhdGVUSW1lIGlzIGJlZm9yZSBOb3dcbiAgICBmdW5jdGlvbiBmdXR1cmVEYXRlVGltZSggZGF0ZVRpbWUgKSB7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgZnV0dXJlID0gZmFsc2U7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm93IGRhdGUgaXMgPVwiLCBub3cpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV4cGlyeSBkYXRlIGlzID1cIiwgZGF0ZVRpbWUpO1xuXG4gICAgICAgIGlmKCBEYXRlLnBhcnNlKG5vdykgPCBEYXRlLnBhcnNlKGRhdGVUaW1lKSApIHtcbiAgICAgICAgICAgIGZ1dHVyZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdXR1cmU7XG4gICAgfVxuXG4gICAgdmFyIGlzVXNlckF1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbihwYXJlbnRBUEkpe1xuXG4gICAgXHRjb25zb2xlLmxvZyhcIkluc2lkZSBpc1VzZXJBdXRoZW50aWNhdGVkIGV4cGlyeURhdGVUaW1lID1cIiAsIGV4cGlyeURhdGVUaW1lKTtcblxuICAgICAgICB2YXIgaXNWYWxpZCA9IGZ1dHVyZURhdGVUaW1lKHRvSlNEYXRlKGV4cGlyeURhdGVUaW1lKSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJpc1ZhbGlkID1cIiwgaXNWYWxpZCk7XG5cbiAgICBcdGlmKGlzVmFsaWQpe1xuICAgIFx0XHRjb25zb2xlLmxvZygnQWNjZXNzIHRva2VuIGlzIHZhbGlkJyk7XG4gICAgXHRcdHJldHVybiB0cnVlO1xuICAgIFx0fWVsc2V7XG4gICAgXHRcdGNvbnNvbGUubG9nKCdJbnZhbGlkIGFjY2VzcyB0b2tlbiAtIEhpdCBSZWZyZXNoIHRva2VuIEFQSScpO1xuICAgIFx0XHRwcmVwYXJlUmVmcmVzaFRva2VuQVBJKHBhcmVudEFQSSk7XG4gICAgXHR9XG5cdFx0XG5cdH1cblxuICAgIHZhciBodHRwUHV0VXBkYXRlVXNlckNhbGwgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG5cbiAgICBcdGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQdXRVcGRhdGVVc2VyQ2FsbCBmdW5jdGlvbiBcIik7XG5cbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHByZXBhcmVSZWZyZXNoVG9rZW5BUEkgPSBmdW5jdGlvbihwYXJlbnRBUEkpe1xuXG4gICAgXHR2YXIgcmVmcmVzaEpzb24gPXtcblx0XHRcdFwicmVmcmVzaC10b2tlblwiOiBvYmoucmVmcmVzaF90b2tlblxuXHRcdFx0fVxuXHRcdFxuXHRcdHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vMTkyLjE2OC43MS4xMDoxMDAxMC9hcGkvYWl1YW0vdjEvdXNlcnMvJysgb2JqLnVpZCArICcvdG9rZW4vcmVmcmVzaCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG5cdFx0XHQgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHQgfSxcbiAgICAgICAgICAgIGRhdGE6IHJlZnJlc2hKc29uXG4gICAgICAgIH07XG5cbiAgICAgICAgaHR0cFBvc3RSZWZyZXNoVG9rZW5DYWxsKHJlcXVlc3QsIHBhcmVudEFQSSk7XG4gICAgfVxuXG5cbiAgICB2YXIgaHR0cFBvc3RSZWZyZXNoVG9rZW5DYWxsID0gZnVuY3Rpb24ocmVxdWVzdCwgcGFyZW50QVBJKSB7XG5cbiAgICBcdGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0UmVmcmVzaFRva2VuQ2FsbCBmdW5jdGlvbiBcIik7XG5cbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICBcdHZhciB0b2tlbkRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICBcImFjY2Vzc190b2tlblwiIDogdG9rZW5EYXRhLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcImV4cGlyZXNfaW5cIiA6IHRva2VuRGF0YS5leHBpcmVzX2luLFxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF90b2tlblwiIDogdG9rZW5EYXRhLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJleHBpcmVzX3RpbWVcIiA6IGxvY2FsU3RvcmFnZS5jb252ZXJ0U2Vjb25kc1RvRGF0ZVRpbWUodG9rZW5EYXRhLmV4cGlyZXNfaW4pLFxuICAgICAgICAgICAgICAgIFwidWlkXCIgOiB0b2tlbkRhdGEudWlkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihsb2NhbFN0b3JhZ2Uuc2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKG9iaikpe1xuICAgICAgICAgICAgXHRjb25zb2xlLmxvZyhcIkFjY2VzcyBhbmQgcmVmcmVzaCB0b2tlbiByZWZyZXNoZWQgaW4gbG9jYWwgc3RvcmFnZS5cIik7XG4gICAgICAgICAgICBcdHZtLnVwZGF0ZVVzZXJJbmZvKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL2hhbmRsZSB0aGUgY2FzZSB3aGVuIGxvY2FsIHN0b3JhZ2UgaXMgdW5zdWNjZXNzZnVsLi5cbiAgICAgICAgICAgICAgICAvLyBzaG93IGVycm9yIG1lc3NhZ2UgdG8gdXNlciB0byByZWRvIHRoZSBvcGVyYXRpb24uLlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmcm9tIDFzdCBBUEkgY2FsbCA9XCIsIGVycm9yKTtcbiAgICAgICAgICAgIG1vZGFsRmFjdG9yeS5vcGVuTW9kYWwoJ2ZvcmNlTG9nb3V0TW9kYWwnKTtcbiAgICAgICAgICAgIC8vIEZvcmNlIGxvZ291dCB1c2VyIGFuZCB0YWtlIHRvIHRoZSBsb2dpbiBwYWdlLlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2bS5mb3JjZUxvZ291dCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5jbGVhckxvY2FsU3RvcmFnZUtleSgpKXtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL2luZGV4Lmh0bWwnO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuYXBwLmNvbnRyb2xsZXIoJ2hlYWRlckN0cmwnLCBoZWFkZXJDdHJsKTtcblxuaGVhZGVyQ3RybC4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCIkd2luZG93XCIsIFwiJHNjb3BlXCIsIFwibG9jYWxTdG9yYWdlXCIsIFwibW9kYWxGYWN0b3J5XCJdO1xuXG5hcHAuY29tcG9uZW50KCdoZWFkZXJDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL2hlYWRlci5odG1sJyxcbiAgY29udHJvbGxlcjogJ2hlYWRlckN0cmwnLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIGhvbWVDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCwgcHJldmlvdXMpIHtcblx0XHRjb25zb2xlLmxvZyhcIkluc2lkZSByb3V0ZXJPbkFjdGl2YXRlIFwiKTtcblx0fVxuXG59XG5cbmFwcC5jb250cm9sbGVyKCdob21lQ3RybCcsIGhvbWVDdHJsKTtcblxuYXBwLmNvbXBvbmVudCgnaG9tZUNvbXBvbmVudCcse1xuICB0ZW1wbGF0ZTogJycsXG4gIGNvbnRyb2xsZXI6ICdob21lQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgYmluZGluZ3M6IHsgJHJvdXRlcjogJzwnIH1cbn0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJyk7XG5cbnZhciBsYW5kaW5nQ3RybCA9IGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkc2NvcGUsIGxvY2FsU3RvcmFnZSwgbW9kYWxGYWN0b3J5KXtcblx0dmFyIHZtID0gdGhpcztcblxuICAgIHZtLmNsb3NlTW9kYWwgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIi5tb2RhbFwiKTtcbiAgICAgICAgaWYgKGRsZ0VsZW0pIHtcbiAgICAgICAgICAgIGRsZ0VsZW0ubW9kYWwoXCJoaWRlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdm0ub3BlbkZvcmdvdE1vZGFsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdm0uY2xvc2VNb2RhbCgpO1xuICAgICAgICB2bS5vcGVuTW9kYWwoJ21vZGFsRm9yZ290Jyk7XG4gICAgfVxuXG5cdHZtLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uKG1vZGFsVHlwZSl7XG5cdFx0Y29uc29sZS5sb2coXCJJbnNpZGUgb3BlblJlZ2lzdGVyTW9kYWwgZnVuY3Rpb24gbW9kYWxUeXBlID1cIiArIG1vZGFsVHlwZSk7XG5cdFx0bW9kYWxGYWN0b3J5Lm9wZW5Nb2RhbChtb2RhbFR5cGUpO1xuXHR9XG5cblx0dm0ucmVnaXN0ZXJNZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZyhcImRvIGFjdGlvbiBvbiBNb2RhbCBzaWduIHVwIGNsaWNrZWQtLVwiKTtcblxuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbFJlZ2lzdGVyRm9ybSAubW9kYWwtYm9keSAuYWxlcnRcIik7XG4gICAgICAgIGlmKGRsZ0VsZW0pe1xuICAgICAgICAgICAgZGxnRWxlbS5kZXRhY2goKTtcbiAgICAgICAgfVxuXG5cdFx0dmFyIHNpZ25VcEpzb24gPXtcblx0XHRcdFwiZW1haWxcIjogdm0ucmVnaXN0ZXJFbWFpbCxcblx0XHRcdFwiZmlyc3RfbmFtZVwiOiB2bS5yZWdpc3RlckZpcnN0TmFtZSxcblx0XHRcdFwibGFzdF9uYW1lXCI6IHZtLnJlZ2lzdGVyTGFzdE5hbWUsXG5cdFx0XHRcInBhc3N3b3JkXCI6IHZtLnJlZ2lzdGVyUGFzc3dvcmQsXG5cdFx0XHRcInVzZXJfYXR0cmlidXRlc1wiOiB7XG5cdFx0XHRcdFwiZG9iXCI6IHZtLnJlZ2lzdGVyRG9iXG5cdFx0XHR9XG5cdFx0fTtcblx0XHR2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cDovLzE5Mi4xNjguNzEuMTA6MTAwMTAvYXBpL2FpdWFtL3YxL3VzZXJzL3NpZ251cCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG5cdFx0XHQgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHQgfSxcbiAgICAgICAgICAgIGRhdGE6IHNpZ25VcEpzb25cbiAgICAgICAgfTtcbiAgICAgICAgXG5cdFx0aHR0cFBvc3RTaWduVXBDYWxsKHJlcXVlc3QpO1xuICAgIFxuICAgIH07XG5cbiAgICB2bS5sb2dpbk1lID0gZnVuY3Rpb24oKXtcblx0ICAgXHRjb25zb2xlLmxvZyhcImRvIGFjdGlvbiBvbiBNb2RhbCBsb2dpbiBjbGlja2VkLS1cIik7XG5cbiAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxMb2dpbkZvcm0gLm1vZGFsLWJvZHkgLmFsZXJ0XCIpO1xuICAgICAgICBpZihkbGdFbGVtKXtcbiAgICAgICAgICAgIGRsZ0VsZW0uZGV0YWNoKCk7XG4gICAgICAgIH1cblxuXHQgICBcdHZhciBsb2dpbkpzb24gPXtcblx0XHRcdFwidXNlcm5hbWVcIjogdm0ubG9naW5Vc2VybmFtZSxcblx0XHRcdFwicGFzc3dvcmRcIjogdm0ubG9naW5QYXNzd29yZCxcblx0XHR9O1xuXHRcdHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vMTkyLjE2OC43MS4xMDoxMDAxMC9hcGkvYWl1YW0vdjEvdXNlcnMvbG9naW4nLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuXHRcdFx0ICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdCB9LFxuICAgICAgICAgICAgZGF0YTogbG9naW5Kc29uXG4gICAgICAgIH07XG5cblx0ICAgXHRodHRwUG9zdExvZ2luQ2FsbChyZXF1ZXN0KTtcblx0fVxuXG4gICAgdm0uZm9yZ290UGFzc3dvcmQgPSBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImRvIGFjdGlvbiBvbiBGb3Jnb3QgcGFzc3dvcmQgY2xpY2stLVwiKTtcblxuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbEZvcmdvdCAubW9kYWwtYm9keSAuYWxlcnRcIik7XG4gICAgICAgIGlmKGRsZ0VsZW0pe1xuICAgICAgICAgICAgZGxnRWxlbS5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmb3Jnb3RKc29uID17XG4gICAgICAgICAgICBcImVtYWlsXCI6IHZtLmZvcmdvdFVzZXJFbmFpbFxuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cDovLzE5Mi4xNjguNzEuMTA6MTAwMTAvYXBpL2FpdWFtL3YxL3VzZXJzL2ZvcmdldC1wYXNzd29yZCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiBmb3Jnb3RKc29uXG5cbiAgICAgICAgfTtcblxuICAgICAgICBodHRwUG9zdEZvcmdvdFBhc3N3b3JkQ2FsbChyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICB2YXIgaHR0cFBvc3RMb2dpbkNhbGwgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG5cbiAgICBcdGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0Q2FsbCBmdW5jdGlvbiBcIik7XG5cbiAgICAgICAgJGh0dHAocmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbkRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICBcImFjY2Vzc190b2tlblwiIDogdG9rZW5EYXRhLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcImV4cGlyZXNfaW5cIiA6IHRva2VuRGF0YS5leHBpcmVzX2luLFxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF90b2tlblwiIDogdG9rZW5EYXRhLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJleHBpcmVzX3RpbWVcIiA6IGxvY2FsU3RvcmFnZS5jb252ZXJ0U2Vjb25kc1RvRGF0ZVRpbWUodG9rZW5EYXRhLmV4cGlyZXNfaW4pLFxuICAgICAgICAgICAgICAgIFwidWlkXCIgOiB0b2tlbkRhdGEudWlkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihsb2NhbFN0b3JhZ2Uuc2V0QWNjZXNzQW5kUmVmcmVzaFRva2VuKG9iaikpe1xuICAgICAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL2Rhc2hib2FyZC5odG1sJztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXG5cdFx0ICAgIHZhciBlcnJvckRlc2NyaXB0aW9uID0gZXJyb3IuZGF0YS5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxMb2dpbkZvcm0gLm1vZGFsLWJvZHlcIik7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nICtlcnJvckRlc2NyaXB0aW9uICsnIDwvZGl2Pic7XG4gICAgICAgICAgICBkbGdFbGVtLmFwcGVuZChlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgaHR0cFBvc3RTaWduVXBDYWxsID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0Q2FsbCBmdW5jdGlvbiBcIik7XG4gICAgICAgIHZhciBkbGdFbGVtID0gYW5ndWxhci5lbGVtZW50KFwiI21vZGFsUmVnaXN0ZXJGb3JtXCIpO1xuICAgICAgICAkaHR0cChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKGRsZ0VsZW0pIHtcbiAgICAgICAgICAgICAgIGRsZ0VsZW0ubW9kYWwoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHZhciBlcnJvckRlc2NyaXB0aW9uID0gZXJyb3IuZGF0YS5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgICAgdmFyIGRsZ0VsZW0gPSBhbmd1bGFyLmVsZW1lbnQoXCIjbW9kYWxSZWdpc3RlckZvcm0gLm1vZGFsLWJvZHlcIik7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nICtlcnJvckRlc2NyaXB0aW9uICsnIDwvZGl2Pic7XG4gICAgICAgICAgICBkbGdFbGVtLmFwcGVuZChlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBodHRwUG9zdEZvcmdvdFBhc3N3b3JkQ2FsbCA9IGZ1bmN0aW9uKHJlcXVlc3Qpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGh0dHBQb3N0Rm9yZ290UGFzc3dvcmRDYWxsIGZ1bmN0aW9uIFwiKTtcblxuICAgICAgICB2YXIgZGxnRWxlbSA9IGFuZ3VsYXIuZWxlbWVudChcIiNtb2RhbEZvcmdvdCAubW9kYWwtYm9keVwiKTtcblxuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj5QbGVhc2UgZW50ZXIgdmFsaWQgZW1haWwgYWRkcmVzcy4gPC9kaXY+JztcblxuICAgICAgICAkaHR0cChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIHRva2VuRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB2YXIgc3VjY2Vzc0ZsYWcgPSB0b2tlbkRhdGEuc3VjY2VzcztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyB2YWx1ZT1cIiwgdG9rZW5EYXRhLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgLy8gc2hvdyBzdWNjZXNzIG1lc3NhZ2UgdG8gdXNlclxuXG4gICAgICAgICAgICBpZihzdWNjZXNzRmxhZyl7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzXCI+UGxlYXNlIGNoZWNrIHlvdXIgZW1haWwgdG8gcmVzZXQgeW91ciBwYXNzd29yZC48L2Rpdj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgZGxnRWxlbS5hcHBlbmQoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5hcHAuY29udHJvbGxlcignbGFuZGluZ0N0cmwnLCBsYW5kaW5nQ3RybCk7XG5cbmxhbmRpbmdDdHJsLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiR3aW5kb3dcIiwgXCIkc2NvcGVcIiwgXCJsb2NhbFN0b3JhZ2VcIiwgXCJtb2RhbEZhY3RvcnlcIl07XG5cbmFwcC5jb21wb25lbnQoJ2xhbmRpbmdDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL2xhbmRpbmcuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICdsYW5kaW5nQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWItY29udGVudC1wb3J0YWwnKTtcblxudmFyIHN0dWRlbnRDdHJsID0gZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRzY29wZSwgbG9jYWxTdG9yYWdlKXtcblx0dmFyIHZtID0gdGhpcztcblxuXHR0aGlzLiRyb3V0ZXJPbkFjdGl2YXRlID0gZnVuY3Rpb24obmV4dCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHJvdXRlck9uQWN0aXZhdGUgXCIpO1xuXHR9XG5cbn1cblxuYXBwLmNvbnRyb2xsZXIoJ3N0dWRlbnRDdHJsJywgc3R1ZGVudEN0cmwpO1xuXG5hcHAuY29tcG9uZW50KCdzdHVkZW50Q29tcG9uZW50Jyx7XG4gIHRlbXBsYXRlVXJsOicuLi9zcmMvYXBwL3RlbXBsYXRlcy9zdHVkZW50Lmh0bWwnLFxuICBjb250cm9sbGVyOiAnc3R1ZGVudEN0cmwnLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2ViLWNvbnRlbnQtcG9ydGFsJyk7XG5cbnZhciB1c2VyQ3RybCA9IGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkc2NvcGUsIGxvY2FsU3RvcmFnZSl7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0dGhpcy4kcm91dGVyT25BY3RpdmF0ZSA9IGZ1bmN0aW9uKG5leHQsIHByZXZpb3VzKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgcm91dGVyT25BY3RpdmF0ZSBcIik7XG5cdH1cblxufVxuXG5hcHAuY29udHJvbGxlcigndXNlckN0cmwnLCB1c2VyQ3RybCk7XG5cbnVzZXJDdHJsLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiR3aW5kb3dcIiwgXCIkc2NvcGVcIiwgXCJsb2NhbFN0b3JhZ2VcIl07XG5cbmFwcC5jb21wb25lbnQoJ3VzZXJDb21wb25lbnQnLHtcbiAgdGVtcGxhdGVVcmw6Jy4uL3NyYy9hcHAvdGVtcGxhdGVzL3VzZXIuaHRtbCcsXG4gIGNvbnRyb2xsZXI6ICd1c2VyQ3RybCcsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgYmluZGluZ3M6IHsgJHJvdXRlcjogJzwnIH1cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=