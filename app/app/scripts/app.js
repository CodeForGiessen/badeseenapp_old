'use strict';

angular.module('Badeseenapp', [
    'ionic',
    'Badeseenapp.config',
    'Badeseenapp.controllers',
    'Badeseenapp.services',
    'Badeseenapp.filters',
    'leaflet-directive',
    'ngAnimate'])

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
    })
    .state('app.lakes', {
        url: '/lakes',
        views: {
            'menuContent' :{
                templateUrl: 'templates/lakes.html',
                controller: 'LakesCtrl'
            }
        }
    })
    .state('app.single', {
        url: '/lake/:id',
        views: {
            'menuContent' :{
                templateUrl: 'templates/lake.html',
                controller: 'LakeCtrl'
            }
        }
    })

    ;

    $urlRouterProvider.otherwise('/app/map');
});

