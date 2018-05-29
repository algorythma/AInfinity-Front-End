var headerCtrl = function($http, $window, $scope, localStorage){
	var vm = this;

	var obj = localStorage.getAccessAndRefreshToken();

	var expirydDateTime = obj.expires_time;

	vm.updateUserInfo = function(){
		console.log("Inside updateUserInfo");
		var userJson ={
			"first_name": "A14",
			"last_name": "b14",
			"user_attributes": {
				"dob": "22-04-1986"
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

    var isUserAuthenticated = function(parentAPI){

    	var currentDateTime = new Date().toLocaleString();

    	console.log("Inside isUserAuthenticated expirydDateTime =" , expirydDateTime);
    	console.log("Inside isUserAuthenticated currentDateTime =" , currentDateTime);


    	if(expirydDateTime > currentDateTime){
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
            	console.log("After refresh API - data saved in local storage");
            	// parentAPI.click();
            }

        }, function (error) {
          
        });
    }

}


app.controller('headerCtrl', headerCtrl);

headerCtrl.$inject = ["$http", "$window", "$scope", "localStorage"];

app.component('headerComponent',{
  templateUrl:'../app/templates/header.html',
  controller: 'headerCtrl',
  controllerAs: 'vm'
});
