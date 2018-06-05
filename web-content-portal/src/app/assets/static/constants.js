var app = angular.module('web-content-portal');

app.constant('CONSTANTS',{

	SIGN_UP	: 'Sign Up',
	SIGN_IN : 'Sign In',
	MASTER : 'Lets be Master...',
	NEW_ASSIGNMENT : 'New Assignment',



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
