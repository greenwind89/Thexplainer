'use strict';

/* Services */

angular.module('user').factory('user.profileService', ['$resource',
  function($resource){
    return $resource('/user/profile', {}, {
    });
  }]);


