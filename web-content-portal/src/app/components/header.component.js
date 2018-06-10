
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
