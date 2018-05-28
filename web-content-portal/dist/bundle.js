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

/***/ "./src/app/app.js":
/*!************************!*\
  !*** ./src/app/app.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar app = angular.module('web-content-portal', ['ngComponentRouter']);\n\napp.value('$routerRootComponent','landing');\napp.component('landing',{\n  template:'<landing-component></landing-component><ng-outlet></ng-outlet>',\n  $routeConfig:[\n    // {path:'/',component:'homeComponent',name:'Home'}\n  ]\n});\n\n\napp.value('$routerRootComponent','dashboard');\napp.component('dashboard',{\n  template:'<header-component></header-component><ng-outlet></ng-outlet>',\n  $routeConfig:[\n    {path:'/',component:'homeComponent',name:'Home'},\n    // {path:'/user',component:'userComponent',name:'User'}\n  ]\n});\n\n\n//Handle server error messages globally..\napp.config(['$httpProvider', function ($httpProvider) {\n    $httpProvider.interceptors.push(function ($q,$rootScope) {\n        return {\n            'responseError': function (responseError) {\n                $rootScope.message = responseError.data.message;\n                return $q.reject(responseError);\n            }\n        };\n    });\n\n  $httpProvider.defaults.headers.common = {};\n  $httpProvider.defaults.headers.post = {};\n  $httpProvider.defaults.headers.put = {};\n  $httpProvider.defaults.headers.patch = {};\n\n}]);\n\n\n//# sourceURL=webpack:///./src/app/app.js?");

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/app/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/app/app.js */\"./src/app/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/app/app.js?");

/***/ })

/******/ });