'use strict';

let router = function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        controller: 'mainController',
        templateUrl: 'dist/views/home.tpl.html',
        resolve: {
            characters: function (characterService) {
                console.log('the characters');
                return characterService.getCharacters();
            }
        }

    });

    $stateProvider.state('detail', {
        url: '/detail/:id',
        controller: 'detailController',
        templateUrl: 'dist/views/detail.tpl.html',
        resolve: {
            character: function (characterService, $stateParams) {
                return characterService.getCharacter($stateParams.id);
            }
        }
    });

    // default route
    $urlRouterProvider.otherwise('/home');
};

module.exports = router;
