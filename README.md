# strformat

String formatting for Node.js and AngularJS.

v0.0.7

## Installation

The following describes how to install `strformat` in both Node.js using `npm` and AngularJS using `bower`.

### Node.js

Install `strformat` using npm.

```
npm install strformat --save
```

Then use the `strformat` fuction exported by the module.

```javascript
var strformat = require('strformat');

var name = {
    first: 'John',
    last: 'Smith'
};

var fullName = strformat('{first} {last}', name);
```

### AngularJS

Install `strformat` using bower.

```
bower install strformat --save
```

Declare a dependency on the `strformat` module.

```javascript
var app = angular.module('app', ['strformat']);
```

Then use the function exported by the `strformat` factory.

```javascript
app.controller('AppCtrl', function($scope, strformat) {
    var name = {
        first: 'John',
        last: 'Smith'
    };

    $scope.fullName = strformat('{first} {last}', name);
});
```

## API

    strformat(str, args...)

Replaces the placeholders in `str` with the substitution values in `args...`.
The `args...` parameter can be an object, an array, or a list of values.

If the second parameter is an object, then the placeholders are in the form of
`{<property>}` where the `<property>` is a property of the object.
(Please see the Advanced Topics section for nested properties as well as
multiple object replacement values.)

If the second parameter is an array or a list of values, then the placeholders
are in the form of `{<n>}` where `<n>` is either the array index or the
positional index of the substitution value in the argument list.

Placeholders are escaped by doubling them (e.g., {{0}}). Any placeholder not
matching an argument is left alone.

Returns the formatted string.

## Examples

For all examples, the `strformat` function is exported by the `strformat` module
or returned by the `strformat` factory in the `strformat` AngularJS module.

### Object property substitution

```javascript
var name = {
    first: 'John',
    last: 'Smith'
};

var fullName = strformat('Your full name is {first} {last}.', name);
console.log(fullName);
```

>Output: `Your full name is John Smith.`

### Array index substitution

```javascript
var code = [404, 'Not Found'];
var status = strformat('status code {0} is "{1}"', code);
console.log(status);
```

>Output: `status code 404 is "Not Found"`

### Positional argument substitution

```javascript
var message = strformat('please press {0} for {1}', 'F1', 'help');
console.log(message);
```

>Output: `please press F1 for help`

## Advanced Topics

Object property replacement can be nested. For example, given the object

```javascript
var contact = {
    name: {
        first: 'John',
        last: 'Smith'
    },
    phone: {
        work: '123-4567',
        home: '555-1212'
    }
};
```

Then the following will resolve as expected:

```javascript
strformat('Your full name is {name.first} {name.last}', contact);
```

This also works with indexed properties:

```javascript
strformat('{0}: {1.phone.home}', 'Home Phone', contact);
```

When the number of additional arguments is greater than one, a positional index
value *must* be the first item in any replacement specifier.

```javascript
strformat('{0.1} {1.0}', [4, 5], [7, 8]);
```

This results in the string '5 7' since the first components index the arguments by
position while the second components select the array element.

## Test

    $ npm test

## Contributors

- Frank Hellwig (fhellwig)
- Johan Hernandez (thepumpkin1979)

## License

(The MIT License)

Copyright (c) 2012 Frank Hellwig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
