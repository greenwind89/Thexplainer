'use strict';

describe('util.helper.parseHashtag', function() {
  var helper; 
  beforeEach(module('yoda'));
  beforeEach(inject(['util.helper', function(utilHelper) {
    helper = utilHelper;
  }]));


  describe('Common cases', function() {
    it('Case with unit attached to quantity', function() {
      var str = '#fiber 20g'
      var result = helper.parseHashtag(str);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].matchedString).toEqual(str);
      expect(result[0].quantity).toEqual(20);
      expect(result[0].unit).toEqual('g');
    });

    it('Case with unit seperated from quantity', function() {
      var str = '#fiber 1000 g'

      var result = helper.parseHashtag(str);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].matchedString).toEqual(str);
      expect(result[0].quantity).toEqual(1000);
      expect(result[0].unit).toEqual('g');
    });

    it('Case with two quantity', function() {
      var str = '#fiber 1000 g and #bread 2 slices'

      var result = helper.parseHashtag(str);
      expect(result.length).toEqual(2);

      expect(result[0].matchedString).toEqual('#fiber 1000 g ');
      expect(result[0].quantity).toEqual(1000);
      expect(result[0].unit).toEqual('g');

      expect(result[1].matchedString).toEqual('#bread 2 slices');
      expect(result[1].quantity).toEqual(2);
      expect(result[1].unit).toEqual('slices');
    });

  });
});
describe('util.helper.getObjectsByKeyValue', function() {
  var helper; 
  beforeEach(module('yoda'));
  beforeEach(inject(['util.helper', function(utilHelper) {
    helper = utilHelper;
  }]));
  var items = [{name: 'minh', language: {name: 'English', level: 10}},
               {name: 'truong', language: {name: 'Vietnamese', level: 1000}}]

  it('Case with key of key', function() {
    var result = helper.getObjectsByKeyValue(items, 'language.name', 'English');
    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('minh');
  });

  it('Case with key of key with custom function', function() {
    var result = helper.getObjectsByKeyValue(items, 'language.name', 'English', function(val1, val2) {return val1 === val2;});
    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('minh');
  });

});

