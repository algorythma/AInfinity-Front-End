'use strict';

var app = angular.module('web-content-portal', []);

app.factory('UserProfileFactory', function($http){

	var urlBase = "jsonplaceholder.typicode.com";
	var userProfileFactory = {};

	userProfileFactory.getPosts = function(){
		userProfileFactory =  $http.get(urlBase + '/posts');
	}

	return userProfileFactory;
	
});
