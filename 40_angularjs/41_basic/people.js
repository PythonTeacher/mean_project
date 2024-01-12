var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.person = {
        name: "아이유",
        job: "가수"
    };

    $scope.people = [
        { name: "아이유", job: "가수"},
        { name: "아이유2", job: "가수2"},
        { name: "아이유3", job: "가수3"}
    ];
} ]);