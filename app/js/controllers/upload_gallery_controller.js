/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers*/
'use strict';

module.exports = function(app) {
  app.controller('UploadGallery', ['$rootScope', '$scope', '$upload', 'EVENTS', 'ItemSave', function($rootScope, $scope, $upload, EVENTS, ItemSave) {
    $scope.itemModalShown = false;

    $scope.$on(EVENTS.itemEditAttempt, function() {
      $scope.itemModalShown = true;
    });

    $scope.$on(EVENTS.itemEditFinished, function() {
      $scope.itemModalShown = false;
    });

    $scope.image = {};

    $scope.upload = function(image) {
      if (!image) return;
      $upload.upload({
        url: 'https://api.cloudinary.com/v1_1/dqwea7i3j/upload',
        data: {upload_preset: 'osxh5dpi'},
        file: image
      }).progress(function() {

      }).success(function(data) {
        $scope.image.url = data.url;
        var splitUrl = $scope.image.url.split('upload/');
        $scope.image.url = splitUrl[0] + 'upload/w_200,h_200/' + splitUrl[1];
        $scope.image.alt = data.public_id;
        $rootScope.$broadcast(EVENTS.itemEditAttempt);
      });
    };

    $scope.close = function() {
      $rootScope.$broadcast(EVENTS.itemEditFinished);
    };

    $scope.saveItem = function(title, description, condition, url) {
      //call service
      console.log(title, description, condition, url);
      $rootScope.$broadcast(EVENTS.itemEditFinished);
      ItemSave.save();
    };

  }]);
};