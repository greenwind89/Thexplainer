'use strict';

/* jasmine specs for controllers go here */
describe('taskInAdayController', function() {

  beforeEach(function(){
  });

  beforeEach(module('yoda'));

  describe('test updateTaskAndUIStatusBar', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.tasksInThisDate = [{
        title: 'task1'
      }];
      ctrl = $controller('calendar.tasksInADayCtrl', {$scope: scope});
    }));


    it('should create "phones" model with 2 phones fetched from xhr', function() {
      // expect(scope.phones).toEqualData([]);
      // $httpBackend.flush();

      // expect(scope.phones).toEqualData(
      //     [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      // expect(scope.orderProp).toBe('age');
    });
  });

});

