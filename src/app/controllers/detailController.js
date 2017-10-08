'use strict';

/**
 * controller for page detail
 * @param {*} scope
 * @param {*} state
 * @param {*} rootScope
 * @param {*} characterService
 * @param {*} character
 */
let controller = function ($scope, $state, $rootScope, characterService, character, $filter) {
  $scope.character = character;
  $scope.countComics = character.comics.items.length;

  $scope.comics = [];
  for (var i = 0; i < 3; i++) {
    if ($scope.character.comics.items[i] !== undefined) {
      $scope.character.comics.items[i].name;
      $scope.comics.push($scope.character.comics.items[i].name);
    }
  }
};

module.exports = controller;
