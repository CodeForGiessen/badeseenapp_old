'use strict';
angular.module('Badeseenapp.filters', [])
.filter('distance', function () {
    return function (input) {
        var meters = input || 0;
        if (meters >= 1000) {
            return (meters/1000).toFixed(2) + ' km';
        } else {
            return meters + ' m';
        }
    };
})
;
