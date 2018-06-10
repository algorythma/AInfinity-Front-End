var app = angular.module('web-content-portal');

var createUnitCtrl = function($http, $window, $scope, localStorage, modalFactory, CONSTANTS){
	var vm = this;
	$scope.CONSTANTS = CONSTANTS;

	var navigator = window.navigator;
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	var Context = window.AudioContext || window.webkitAudioContext;
	var context = new Context();

	var resObj, recordButton, stopButton, recorder;
	recordButton = angular.element('#record');
	stopButton = angular.element('#stop');

	initAudio();

	recordButton.prop('disabled', false);
	recordButton.click(startRecording);
	stopButton.click(stopRecording);

	function startRecording() {
	   recordButton.prop('disabled', true);
	   stopButton.prop('disabled', false);
	   recorder.clear();
	   recorder.record();
	}

	function stopRecording() {
	   recordButton.prop('disabled', false);
	   stopButton.prop('disabled', true);
	   recorder.stop();
	   recorder.exportWAV(stereo_cb);
	   recorder.clear();
	}

	function stereo_cb(blob){
	   console.log("blob = ", blob);
	   // var msg = new Blob([context.sampleRate, blob]);
	   var formData = new FormData();
	   formData.append('audio', blob);
	   //    formData.append('debug', $('#debug').prop('checked'))
	   formData.append('debug', true)

	   //postAsFormData(formData, prediction_service, prediction_callback);
	   audio.src = URL.createObjectURL(blob);
	   audio.play();
	};

	function initAudio() {
	   if (!navigator.getUserMedia)
	       navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
	   if (!navigator.cancelAnimationFrame)
	       navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
	   if (!navigator.requestAnimationFrame)
	       navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

	   navigator.getUserMedia(
	   {
	       "audio": {
	           "mandatory": {
	               "googEchoCancellation": "true",
	               "googAutoGainControl": "true",
	               "googNoiseSuppression": "true",
	               "googHighpassFilter": "true"
	           },
	           "optional": []
	       },
	   }, gotStream, function(e) {
	       alert('Error getting audio');
	       console.log(e);
	   });
	}

	function gotStream(stream) {
	   var inputPoint = context.createGain();

	   // Create an AudioNode from the stream.
	   var audioInput = context.createMediaStreamSource(stream);
	   audioInput.connect(inputPoint);

	   var analyserNode = context.createAnalyser();
	   analyserNode.fftSize = 2048;
	   inputPoint.connect(analyserNode);

	   recorder = new Recorder(inputPoint);

	   var zeroGain = context.createGain();
	   zeroGain.gain.value = 0.0;
	   inputPoint.connect(zeroGain);
	   zeroGain.connect(context.destination);
	}



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