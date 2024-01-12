var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.signup = function() {
        console.log('id:', $scope.id);
        console.log('pwd:', $scope.pwd);
    }
}]);   