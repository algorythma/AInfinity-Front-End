var app = angular.module('web-content-portal');

var createUnitCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	var recorder = document.getElementById('recorder');
  	var player = document.getElementById('player');

  	recorder.addEventListener('change', function(e) {

	    var file = e.target.files[0];
	    // Do something with the audio file.
	    console.log("Inside recorder function");
	    player.src =  URL.createObjectURL(file);
	  });

  	navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);

      var handleSuccess = function(stream) {
	    // if (window.URL) {
	    //   player.src = window.URL.createObjectURL(stream);
	    // } else {
	    //   player.src = stream;
	    // }

	    var context = new AudioContext();
	    var source = context.createMediaStreamSource(stream);
	    var processor = context.createScriptProcessor(1024, 1, 1);

	    source.connect(processor);
	    processor.connect(context.destination);

	    processor.onaudioprocess = function(e) {
	      // Do something with the data, i.e Convert this to WAV
	      console.log(e.inputBuffer);
	    };
	    
	  };



	vm.$routerOnActivate = function(next) {
		// console.log("Inside routerOnActivate ");
	}

}

app.controller('createUnitCtrl', createUnitCtrl);

createUnitCtrl.$inject = ["$http", "$window", "$scope", "localStorage", "modalFactory", "CONSTANTS"];

app.component('createUnitComponent',{
  templateUrl:'../src/app/templates/createUnit.html',
  controller: 'createUnitCtrl',
  controllerAs: 'vm'
});