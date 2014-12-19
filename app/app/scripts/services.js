'use strict';
angular.module('Badeseenapp.services', ['Badeseenapp.config'])
.factory('lakes',['$http','ENV',
    function($http,ENV) {
        var serviceulr = ENV.apiEndpoint;
        return {
            getAllLakes: function() {
                return $http.get(serviceulr + 'lakes');
            },
            getLakeById: function(id){
                return $http.get(serviceulr + 'lake/' + id);
            }
        };
    }])
.factory('lakeutils',['geolocation',
    function(geolocation) {
        function basicLake(json){
            return{
                id: json.id,
                name: json.name,
                position: {
                    latitude: parseFloat(json.latitude),
                    longitude: parseFloat(json.longitude),
                }
            };
        }

        function addDistanceToUserToLake(lake,position){
            var distance = geolocation.distanceTo(lake.position,position);
            lake.distanceToUser = distance;
            return lake;
        }

        return {
            basicLake: basicLake,
            isLakeOpen: function(lake){
                var current = new Date();
                return current > new Date(lake.open_from) && current < new Date(lake.open_to); //jshint ignore:line
            },
            addDistanceToUserToLake: addDistanceToUserToLake,
            addDistanceToUserToLakes: function(lakes,position){
                return lakes.map(function(lake){
                    return addDistanceToUserToLake(lake,position);
                });
            }
        };
    }])
.factory('geolocation', ['$q',
    function($q) {
        /**
        * Get user location by querying navigator.geolocation
        *
        * @discussion Given the asynchronic nature of geolocation
        * this function returns a promise object to use like
        * `getUserLocation().then(doSmth(result));` with result holding
        * the obtained location. If the user location
        * couldn’t be obtained a fallback location will be returned.
        *
        * @see https://docs.angularjs.org/api/ng/service/$q
        *
        * @return {Object} Angular.js promise object
        */
        function getUserLocation() {
            var defer = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function success(pos) {
                        defer.resolve(pos.coords);
                    }, function error(err) {
                        defer.reject(err);
                    });
            }else{
                defer.reject('navigator not available');
            }
            return defer.promise;
        }
        /**
         * Return distance in meters between 2 points
         *
         * @discussion the points should at least have the 2
         * attributes `lat` giving the latitude and `lng` giving the
         * longitude of the point.
         *
         * @param  {[type]} point1 first point
         * @param  {[type]} point2 second point
         * @return {[type]}        distance in meters
         */
        function distanceTo(point1, point2) {
            return geolib.getDistance(point1, point2);
        }

        return {
            getUserLocation: getUserLocation,
            distanceTo: distanceTo
        };
    }])
;
