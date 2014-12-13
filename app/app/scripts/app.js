'use strict';

angular.module('Badeseenapp', ['ionic', 'config', 'Badeseenapp.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.map', {
        url: '/map',
        views: {
            'menuContent' :{
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/app/map');
});

