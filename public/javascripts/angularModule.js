var AngularApp = angular.module('AngularApp', [ 'ngRoute']);

AngularApp.config(function($routeProvider) {
	$routeProvider.when('/game', {
		templateUrl : 'javascripts/partials/game.html',
		controller : 'GameController'
	});
  $routeProvider.when('/engine', {
		templateUrl : 'javascripts/partials/engine.html',
		controller : 'EngineController'
	});
	$routeProvider.when('/splash', {
		templateUrl : 'javascripts/partials/splash.html',
		controller : 'SplashController'
	});
	$routeProvider.otherwise({
		redirectTo : '/splash'
	});
});

// Splash for main screen.
AngularApp.controller('SplashController', function($scope) {
	var localStorage = window['localStorage'];
  var labels = {
    playButton: 'Join the Game'
  };
  $scope.labels = labels;
  $scope.path = '/#/game';
});
// Game Screen controller.
AngularApp.controller('GameController', function($scope, $http, $window) {
  var labels = {
    playButton: 'Join the Game'
  };
  $scope.labels = labels;
  $scope.path = '/#/game';

  $http.get('/api/game/ticket').success(function(data) {
    $scope.ticket = data;
    var strData = JSON.stringify(data);
    $window.localStorage.setItem('myTicket', strData);
  });


});
// Game Engine to generate next number
AngularApp.controller('EngineController', function($scope, $http) {
  var labels = {
    playButton: 'Join the Game'
  };
  $scope.labels = labels;
  $scope.path = '/#/game';
});
