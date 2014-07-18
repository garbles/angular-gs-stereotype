# angular-gs-stereotype

[![Build Status](https://secure.travis-ci.org/garbles/angular-gs-stereotype.png?branch=master)](https://travis-ci.org/garbles/angular-gs-stereotype)

A library for wrapping data in AngularJS

### Installing

`bower install angular-gs-stereotype`

### Using

Include the package in your application:

```html
<!-- all of this is required -->
<script src='bower_components/lodash/dist/lodash.js'></script>
<script src='bower_components/angular-gs-capitalize/build/angular-gs-capitalize.js'></script>
<script src='bower_components/angular-gs-to-camel-case/build/angular-gs-to-camel-case.js'></script>
<script src='bower_components/angular-gs-to-snake-case/build/angular-gs-to-snake-case.js'></script>
<script src='bower_components/angular-gs-invert-case/build/angular-gs-invert-case.js'></script>
<script src='bower_components/angular-gs-invert-case/build/angular-gs-stereotype.js'></script>
```

```javascript
angular.module('app', ['gs.stereotype']);
```

Create a model by calling the Sterotype function

```javascript
.factory('SomeModel', function (Stereotype) {
  return Stereotype([
    // this mixins must be injectable services
    'someMixin',
    'someOtherMixin'
  ]).schema({
    // any keys not registered in the schema will be removed when
    // instantiating a new wrapper
    id: undefined,
    name: 'some default value'
  }).wrap(function (data) {
    // a place where you can make additional changes to the data after it's been
    // extended with the mixins
    data.doSomething = function () { 
      //...
    };

    data.someMethodAttachedBySomeMixin();

    return data;
  });
});
```

Use it in your application with the `.mixin` method

```javascript
.controller('SomeCtrl', function (SomeModel) {
  var something = SomeModel.mixin({name: 'some data', keyNotInSchema: 'will be removed'});
});
```
