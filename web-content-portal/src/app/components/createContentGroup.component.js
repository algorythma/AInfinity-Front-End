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