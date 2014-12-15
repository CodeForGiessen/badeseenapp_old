'use strict';
angular.module('Badeseenapp.services', [])
.factory('lakes',['$http',
    function($http) {
        // var serviceulr = 'http://192.168.43.192:8080/';
        var serviceulr = 'http://localhost:8080/';
        return {
            getAllLakes: function() {
                return $http.get(serviceulr + 'lakes');
            },
            getLakeById: function(id){
                return $http.get(serviceulr + 'lake/' + id);
            }
        };
    }]);
