angular.module('StoreApp').controllerProvider.register('purchaseController', function ($scope, DB) {

  $scope.$watch('start', function () {
    $scope.getData();
  });

  $scope.getData = function() {
    var items = window.localStorage.getItem('items');
    DB.request('post', '/Purchase/Selected', { items: items }).then(function (result) { 
        console.log(result);
        let res = angular.fromJson(result);
        if (res.success === true) {
            $scope.data = res.data;
        }
    });
  };

  $scope.Purchase = function() {
    DB.request('post', '/Purchase/checkAndPurchase', { name: $scope.user, email: $scope.email }).then(function (result) { 
      let res = angular.fromJson(result);
      if (res.success === "true") {
        $scope.errormessage = '';
        window.localStorage.setItem('items','');
        window.location.replace(window.location.origin + '/Thankyou')
      } else {
        $scope.errormessage = res.message;
      }
    });


  };



});