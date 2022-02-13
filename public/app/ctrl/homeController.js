angular.module('StoreApp').controllerProvider.register('homeController', function ($scope, DB) {

    $scope.start = 0;
    $scope.filter = '';
    $scope.count = 0;
    $scope.page = 0;
    $scope.pages = [];
    $scope.limit = 5;
    $scope.limits = [{ id: 5, name: "5"}, {id: 10, name: "10"}, {id: 20, name: "20"}, {id: 30, name: "30"}];
    $scope.selected = [];

    $scope.$watch('start', function () {
        $scope.getData();
    });

    $scope.$watch('limit', function (newVal,oldVal) {
        if (newVal != oldVal) { 
            $scope.pages = [];
            $scope.page = 0;
            $scope.start = 0;
            $scope.getData();
            $scope.createPages();
        };
    });

    $scope.Filter = function() {
        $scope.pages = [];
        $scope.getData();
    };

    $scope.Clear = function() {
        $scope.filter = '';
        $scope.getData();
    }
    $scope.getChecked = function(id) {
        var result = false;
        $scope.selected.map((val) => {
            if (val == id) { result = true; };
        })
        return result;
    };

    $scope.getData = function() {
        DB.request('post', '/home/Articles', { start: $scope.start, filter: $scope.filter, limit: $scope.limit }).then(function (result) { 
            let res = angular.fromJson(result);
            if (res.success === true) {
                $scope.data = res.data;
                $scope.count = Number(res.count[0].count);
                $scope.data.map((val) => {
                    val.checked = $scope.getChecked(val.a_id);
                })
            }
        });
    };

    $scope.$watch('count', function (newVal,oldVal) {
        if ((newVal != oldVal) && (newVal>$scope.limit)) {        // working only if we have 10+ results
            $scope.createPages();
        }        
    });

    $scope.createPages = function() {
        var pages = Math.floor($scope.count / $scope.limit);
        if (($scope.count % $scope.limit) > 0) { pages++; };
        $scope.pages = [];
        for (var i=0; i<pages; i++) {
            $scope.pages.push({ id: i });
        }
    };

    $scope.getPage = function(start) {
        $scope.page = start;
        $scope.start = start * $scope.limit;
        $scope.getData();
    };

    $scope.itemClick = function(id,checked) {
        if (checked) {
            $scope.selected.push(id)
        } else {
            $scope.selected.map((val,index)=>{
                if (val == id) { $scope.selected.splice(index,1); }
            })
        }
    };

    $scope.Purchase = function() {
        if ($scope.selected.length > 0) {
            window.localStorage.setItem('items', $scope.selected.join());
            window.location.replace(window.location.origin + '/Purchase')
        };
    };


});