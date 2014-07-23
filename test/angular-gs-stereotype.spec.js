describe('angular-gs-stereotype', function () {
  var Stereotype;

  angular.module('mixinModule', [])
  .filter('giveMeSomeC', function () {
    return function (object) {
      object.c = 3;

      return object;
    };
  })
  .filter('giveMeSomeFn', function () {
    return function (object) {
      object.someFunction = function () {
        return 'HELLO';
      };

      return object;
    };
  });

  beforeEach(module('gs.stereotype', 'mixinModule'));

  beforeEach(inject(function (_Stereotype_) {
    Stereotype = _Stereotype_;
  }));

  it('sets defaults based on a preset schema', function () {
    var schema = {a: 0, b: 'bacon'};
    model = Stereotype().schema(schema).wrap(function (data) {
      return data;
    }),
    mixedIn = model.mixin({a: 1});

    expect(mixedIn.data()).toEqual({a: 1, b: 'bacon'});
  });

  it('can also set other data', function () {
    var schema = {a: 0};
    model = Stereotype().schema(schema).wrap(function (data) {
      data.a++;
      return data;
    }),
    mixedIn = model.mixin({});

    expect(mixedIn.data()).toEqual({a: 1});
  });

  it('can mixin factories', function () {
    model = Stereotype('giveMeSomeC', 'giveMeSomeFn').wrap(function (data) {
      return data;
    }),
    mixedIn = model.mixin({});

    expect(mixedIn.c).toEqual(3);
    expect(mixedIn.someFunction()).toEqual('HELLO');
    expect(model.filters).toEqual(['giveMeSomeC', 'giveMeSomeFn']);
  });
});
