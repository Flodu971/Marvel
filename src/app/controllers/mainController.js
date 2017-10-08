'use strict';

/**
 * controller for home page
 * @param {*} scope
 * @param {*} state
 * @param {*} rootScope
 * @param {*} characterService
 * @param {*} characters
 */
let controller = function ($scope, $state, $rootScope, characterService, characters, $timeout) {
  $scope.characters = characters;
  $scope.limit = 22;
  $scope.offset = 100;

  characterService.getCharacters().then(res => {
    $scope.characters = res;
  });

  /**
   * Detail characters
   */
  $scope.seeDetail = id => {
      $state.go('detail', {id: id});
  };

  /**
   * Add more characters
   */

  $scope.add = function() {
    $timeout(function() {
      let params = { "limit": $scope.limit , "offset": $scope.offset }
        characterService.getCharacters(params).then(res => {
          $scope.characters = res;
        });
        $scope.limit = $scope.limit + 9;
        $scope.offset = $scope.offset + 1;

    }, 500);
    }
};

module.exports = controller;
