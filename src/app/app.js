/* globals angular */

let app = angular.module('app', ['ui.router']);

app.run(() => {
    console.log('app is running');
});

/* configs */
app.config(['$stateProvider', '$urlRouterProvider', require('./configs/router')]);

/* controllers */
app.controller('mainController', require('./controllers/mainController'));
app.controller('detailController', require('./controllers/detailController'));

/* services */
app.service('characterService', require('./services/characterService'));

// angular.bootstrap(document.body, ['app']);
