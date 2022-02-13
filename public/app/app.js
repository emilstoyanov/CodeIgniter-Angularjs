var app = angular.module('StoreApp', ['ngRoute', 'MyDatabaseService']);
app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider) {
  app.controllerProvider = $controllerProvider;
  app.compileProvider = $compileProvider;
  app.routeProvider = $routeProvider;
  app.filterProvider = $filterProvider;
  app.provide = $provide;
  app.locationProvider = $locationProvider;

  app.loadScript = function ($dep) {
    var resolve = {
      deps: function ($q, $rootScope, $route) {
        var deferred = $q.defer(), res = [];

        if (typeof $route.current.params.repType !== 'undefined') {
          angular.forEach($dep, function (value) {
            res.push($rootScope.sprintf(value, $route.current.params.moduleID, $route.current.params.repType));
          });
        } else if (typeof $route.current.params.moduleID !== 'undefined') {
          angular.forEach($dep, function (value) {
            res.push($rootScope.sprintf(value, $route.current.params.moduleID, $route.current.params.moduleID));
          });
        } else { res = $dep; }
        $script(res, function () {
          $rootScope.$apply(function () {
            deferred.resolve();
          });
        });
        return deferred.promise;
      }
    };
    return resolve;
  };

  app.routeProvider
    .when('/home', {
      templateUrl: '/app/views/home.html',
      resolve: app.loadScript(['/app/ctrl/homeController.js'])
    })
    .when('/Purchase', {
      templateUrl: '/app/views/purchase.html',
      resolve: app.loadScript(['/app/ctrl/purchaseController.js'])
    })
    .when('/Thankyou', {
      templateUrl: '/app/views/thankyou.html',
      resolve: app.loadScript(['/app/ctrl/thankyouController.js'])
    })
    .otherwise({ redirectTo: '/home' });

  app.locationProvider.html5Mode(true);

});

app.run(function ($rootScope) {
  $rootScope.start = true;
});

app.directive('selectAll', ['$window', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('focus', function () {
        if (!$window.getSelection().toString()) {
          this.select();
        }
      });
    }
  };
}]);

app.directive('loading', ['$http', function ($http) {
  return {
    restrict: 'A',
    link: function (scope, elm, attrs) {
      scope.isLoading = function () {
        return $http.pendingRequests.length > 0;
      };
      scope.$watch(scope.isLoading, function (v) {
        if (v) { elm.show(); } else { elm.hide(); }
      });
    }
  };
}]);
