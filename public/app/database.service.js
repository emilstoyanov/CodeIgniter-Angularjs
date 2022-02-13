angular.module('MyDatabaseService', [])
  .controller('DatabaseController', ['$scope', 'DB', '$location', function ($scope, service, $location) {
    service.init($scope);
  }])
  .factory('DB', ['$http', '$q', function ($http, $q) {
    function DB() {
      var self = this;

      self.init = function (scope) {
        self._scope = scope;
      };
      
      self.request = function (m, u, params) {
        var deferred = $q.defer();
        $http({ method: m, url: u, data: $.param(params), headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" } })
          .then(function (responce) {
            if (responce.data.success === true) {  }
            else { }
            deferred.resolve(responce.data);
          }, function (responce) {
            deferred.reject([]);
          });
        return deferred.promise;
      };
    }
    return new DB();
  }]);