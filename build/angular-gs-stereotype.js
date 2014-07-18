if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'gs.stereotype';
}

(function(window, angular, undefined) {'use strict';

angular.module('gs.stereotype', ['gs.invert-case'])
.factory('Stereotype', ['$injector', 'invertCase',
function ($injector, invertCase) {
  var camelify = _.partialRight(invertCase, 'camel'),
    injectOnArray = _.memoize(_.partialRight(_.map, $injector.get)),
    reverse = _.memoize(_.partialRight(_.result, 'reverse')),
    injectConcerns = _.memoize(_.compose(injectOnArray, reverse, _.clone));

  return function () {
    var model, schema, keys, concerns;

    function mixinConcerns (object) {
      var injectedConcerns = injectConcerns(concerns);
      return _.compose.apply(null, injectedConcerns)(object);
    }

    function pickKeys (object) {
      return _.pick(object, keys);
    }

    function setDefaults (object) {
      return _.defaults(object, schema);
    }

    function addUtilityFns (object) {
      var dataFn = _.compose(pickKeys, _.cloneDeep);
      return _.extend(object, {
        data: _.partial(dataFn, object)
      });
    }

    concerns = _.flatten(Array.prototype.slice.call(arguments));

    model = {
      extend: function (arr) {
        concerns = concerns.concat(arr);
        return model;
      },
      schema: function (object) {
        object = object || {};
        schema = camelify(object);
        keys = Object.keys(schema);
        return model;
      },
      wrap: function (fn) {
        var mixin = _.compose(fn, addUtilityFns, mixinConcerns, setDefaults, pickKeys, camelify);

        return {
          concerns: concerns,
          mixin: mixin,
          schema: schema
        };
      }
    };

    return model;
  };

}]);

})(window, window.angular);
