angular.module('StoreApp').controllerProvider.register('thankyouController', function ($scope, DB) {

  $scope.goHome = function() {
    window.location.replace(window.location.origin + '/Home')
  };

});