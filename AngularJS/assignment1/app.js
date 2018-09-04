(function () {
    'use strict';
    angular.module('myapp', [])
        .controller('controller1', controllerFunction);
    function controllerFunction($scope) {
        $scope.onClick = function () {
            if ($scope.lunch != null) {
                var splitted = $scope.lunch.split(",");
                var nombre = splitted.length;
                if (nombre <= 3)
                    $scope.message = "Enjoy!";
                else
                    $scope.message = "Too much!";
                if ($scope.lunch.length == 0)
                    $scope.message = "Please enter data first";
                console.log(nombre);
            }
            else
                $scope.message = "Please enter data first";
        };
    }
})();