'use strict';

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


