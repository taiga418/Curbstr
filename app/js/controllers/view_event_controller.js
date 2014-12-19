'use strict';

module.exports = function(app) {
  app.controller('ViewEvent', ['$routeParams', '$http', '$scope', function($routeParams, $http, $scope) {

    $scope.viewItemModalShown = false;
    var saleId = $routeParams.id;

    $scope.initController = function() {
      $http.get('/api/items/all/' + saleId)
      .success(function(data) {
        $scope.sale = data.sale[0];
        $scope.items = data.items;
      })
      .error(function(err) {
        console.log(err);
      });
    };

    $scope.itemDetail = function(oneItem) {
      $scope.oneItem = oneItem;
      $scope.viewItemModalShown = true;
    };

    $scope.close = function() {
      $scope.viewItemModalShown = false;
    };
  }]);
};
