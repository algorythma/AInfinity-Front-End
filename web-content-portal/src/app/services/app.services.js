

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
