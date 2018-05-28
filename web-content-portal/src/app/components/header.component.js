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

        if(isUserAuthenticated()){
        	httpPutUpdateUserCall(request);
        }

    };

    var isUserAuthenticated = function(){

    	var currentDateTime = new Date().toLocaleString();

    	console.log("Inside isUserAuthenticated expirydDateTime =" , expirydDateTime);
    	console.log("Inside isUserAuthenticated currentDateTime =" , currentDateTime);


    	// if(expirydDateTime > currentDateTime){
    	// 	console.log('Access token is valid');
    	// 	return true;
    	// }else{
    		console.log('Invalid access token - Hit Refresh token API');
    		prepareRefreshTokenAPI();

    	// }
		
	}

    var httpPutUpdateUserCall = function(request) {

    	console.log("Inside httpPutUpdateUserCall function ");

        $http(request).then(function (response) {

        }, function (error) {
          
        });
    }

    var prepareRefreshTokenAPI = function(){

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

        httpPostrefreshTokenCall(request);
    }


    var httpPostrefreshTokenCall = function(request) {

    	console.log("Inside httpPostrefreshTokenCall function ");

        $http(request).then(function (response) {

        	var tokenData = response.data;
            var obj = {
                "access_token" : tokenData.access_token,
                "expires_in" : tokenData.expires_in,
                "refresh_token" : tokenData.refresh_token,
                "expires_time" : setExpiryDateTime(tokenData.expires_in),
                "uid" : tokenData.uid
            };

            if(localStorage.setAccessAndRefreshToken(obj)){
            	console.log("After refresh API - data saved in local storage");
            }


        }, function (error) {
          
        });
    }

    var setExpiryDateTime = function(totalSeconds) {

        console.log("Inside setExpiryDateTime = " + totalSeconds);
        var hours   = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
        // round seconds
        seconds = Math.round(seconds * 100) / 100

        var now=new Date();
        var later=new Date();
        later.setHours(now.getHours()+hours);
        later.setMinutes(now.getMinutes()+minutes);
        later.setSeconds(now.getSeconds()+seconds);

        console.log("Expiry date time is : ", later.toLocaleString());

        return later.toLocaleString();
    }

}

app.factory("localStorage", function($window, $rootScope) {
    return {
        setAccessAndRefreshToken: function(val) {
          $window.localStorage && $window.localStorage.setItem('my-storage', JSON.stringify(val));
          return this;
        },
        getAccessAndRefreshToken: function() {
          return JSON.parse($window.localStorage && $window.localStorage.getItem('my-storage'));
        }
    };
});

app.controller('headerCtrl', headerCtrl);

app.component('headerComponent',{
  templateUrl:'../app/templates/header.html',
  controller: 'headerCtrl',
  controllerAs: 'vm'
});
