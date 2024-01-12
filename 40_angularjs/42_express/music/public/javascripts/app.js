// 필터와 서비스를 의존성으로 가지는 앱 모듈 선언
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html'
    });

    $routeProvider.when('/list', {
        templateUrl: 'list.html',
        controller: 'MusicListCtrl'
    });

    $routeProvider.when('/insert', {
        templateUrl: 'insert.html',
        controller: 'MusicInsertCtrl'
    });

    $routeProvider.when('/update/:_id', {
        templateUrl: 'update.html',
        controller: 'MusicUpdateCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
});

app.controller('MusicListCtrl', function ($scope, $http, $location) {
    $http.get('/music').success(function (result) {
        $scope.data = result;
    });
    $scope.deleteMusic = function (_id) {
        $http.delete('/music/' + _id).success(function (result){
            console.log('delete : ', result);
            angular.element(document.getElementById(_id)).remove();
        });
    };
});

app.controller('MusicInsertCtrl', function ($scope, $http, $location) {
    $scope.insertMusic = function(music) {
        console.log(music);
        $http.post('/music', music).success(function (result) {
            console.log("success");
            $location.path('/list');
        });
    };
});

app.controller('MusicUpdateCtrl', function ($scope, $routeParams, $http, $location) {
    $http.get('/music/' + $routeParams._id).success(function (result){
        console.log(result);
        $scope.music = result;
    });
    $scope.updateMusic = function(music) {
        console.log('update', music);
        $http.put('/music/' + music._id, music).success(function(result) {
            $location.path('/list');
        });
    };
});