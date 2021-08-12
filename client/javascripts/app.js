angular.module('app', [])
  .controller('mainController', ($scope, $http) => {
    $scope.formData = {};
    $scope.loginSuccessful;
    $scope.loginError;

    $scope.login = () => {
      $http.post('/api/v1/login', $scope.formData)
      .then((data) => {
        console.log(data);
        $scope.formData = {};
        $scope.loginSuccessful = data;
        $scope.loginError = null;
      })
      .catch((error) => {
        $scope.loginSuccessful = null;
        $scope.loginError = "ERROR"
      });
    };
  });
