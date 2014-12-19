'use strict';
angular.module('Badeseenapp.controllers', [
    'Badeseenapp.services'])

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
.controller('LakesCtrl', ['$scope','lakes', '$ionicPopup', 'lakeutils', 'geolocation', function($scope,lakes,$ionicPopup,lakeutils,geolocation) {
    $scope.lakes = [];
    $scope.orderby = 'name';
    $scope.location = undefined;

    function useDistance(){
        $scope.lakes = lakeutils.addDistanceToUserToLakes($scope.lakes,$scope.location);
        $scope.orderby = 'distanceToUser';
    }

    lakes.getAllLakes().success(function(data){
        var _lakes = [];
        data.forEach(function(item, index) {
            var lake = lakeutils.basicLake(item);
            lake.idOpen = lakeutils.isLakeOpen(item);
            _lakes.push(lake);           
        });
        $scope.lakes=_lakes;
        if($scope.location){
            useDistance();
        }
    })
    .catch(function(error){
        $ionicPopup.alert({
            title: 'Netzwerkfehler',
            template: 'Es können keine Badeseen angezeigt werden'
        });
    });

    geolocation.getUserLocation()
    .then(function(position){
        $scope.location = position;
        if($scope.lakes.length){
            useDistance();
        }
    }).catch(function(error){
        $ionicPopup.alert({
            title: 'Geolocation nicht verfügbar',
            template: 'Die Geolocation ist leider nicht verfügbar, bitte aktivieren Sie ihr GPS.'
        });
    });


}])
.controller('LakeCtrl', ['$scope','$stateParams','lakes','$ionicLoading', function($scope,$stateParams,lakes,$ionicLoading) {
    $scope.id = $stateParams.id;
    $scope.name ='';
    $ionicLoading.show({
        content: 'Laden',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    lakes.getLakeById($scope.id).success(function(data){
        $scope.name = data.name;
        $scope.description = data.introtext;
        $ionicLoading.hide();
    });
}])
;

