'use strict';
angular.module('Badeseenapp.controllers', [])

/*jshint unused:false*/
.controller('AppCtrl', [ function() {
    
}])

/*jshint unused:false*/
.controller('MapCtrl', ['$scope', 'lakes', function($scope, lakes) {
    $scope.center ={
        'lat': 50.583732,
        'lng': 8.678344,
        'zoom': 11
    };
    $scope.markers = {};
    $scope.defaults = {
        tileLayer: 'https://{s}.tiles.mapbox.com/v3/foobar123.j5b19dpp/{z}/{x}/{y}.png',
        tileLayerOptions: {
            attribution: '© Mapbox © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            detectRetina: true,
            reuseTiles: true,
        }
    };
    $scope.events= {
        markers: {
            enable: ['click'],
            logic: 'emit'
        }
    };
    lakes.getAllLakes().success(function(data){
        var markers = {};
        data.forEach(function(item, index) {
            var marker = {
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude)
            };
            markers[index.toString()] = marker;
        });
        $scope.markers=markers;
    });

    $scope.$on('leafletDirectiveMarker.click',function(event,leafletEvent){
        window.location = '#/app/lake/' + leafletEvent.markerName;
    });

}])
.controller('LakeCtrl', ['$scope','$stateParams','lakes', function($scope,$stateParams,lakes) {
    $scope.id = $stateParams.id;
    $scope.name ='Badesee';

    lakes.getLakeById($scope.id).success(function(data){
        $scope.name = data.name;
        $scope.description = data.introtext;
    });
}])
;

