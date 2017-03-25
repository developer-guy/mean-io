/**
 * Created by bapaydin on 21.03.2017.
 */


console.log("İnitialized");
var app = angular.module('todoApp', []);
app.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};

    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
            console.log(data);
        }).error(function (data) {
        console.log('Error : ' + data);
    });

    $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            }).error(function (data) {
            console.log('Error :  ' + data);
        });
    }

    $scope.deleteTodo = function (id) {
        $http.delete('/api/todos/' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error ' + data);
            });
    }
}]);