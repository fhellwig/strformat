/*
 * Copyright (c) 2012 Frank Hellwig
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

(function (isNode, isAngular) {

    // Matches '{{', '}}', and '{<token>}' where <token> is one or more
    // word characters (letter, number, or underscore).
    var RE = /\{\{|\}\}|\{([^\}]+)\}/g;

    // Gets a property from an object by string.
    function getProperty(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }
        return o;
    }

    /**
     * Formats the specified string by replacing placeholders in the
     * string with replacement values from the function arguments.
     * Placeholders are specified with curly braces.
     *
     * The arguments can be a list of values, an array, or an object.
     * For a list of values or an array, numeric placeholders are used.
     * For an object, property name placeholders are used.
     *
     * Placeholders are escaped by doubling them (e.g., {{0}}).
     * Any placeholder not matching an argument is left alone.
     *
     * strformat('Error {0}: {1}', 404, 'Not Found');
     * > 'Error 404: Not Found' (uses argument position placeholders)
     *
     * strformat('{0}, {1}, and {2}', ['Red', 'Green', 'Blue']);
     * > 'Red, Green, and Blue' (uses array index placeholders)
     *
     * strformat('Hi {first} {last}', {first: 'John', last: 'Doe'});
     * > 'Hi John Doe' (uses object property name placeholders)
     */
    function strformat(str, args) {
        args = Array.prototype.slice.call(arguments, 1);
        if (args.length < 1) {
            return str; // nothing to replace
        } else if ((args.length < 2) && (typeof args[0] === 'object')) {
            args = args[0]; // handle a single array or object
        }
        return str.replace(RE, function (m, n) {
            if (m == '{{') {
                return '{';
            }
            if (m == '}}') {
                return '}';
            }
            var val = getProperty(args, n);
            return (typeof val === 'undefined') ? m : val;
        });
    }

    if (isNode) {
        module.exports = strformat;
    }

    if (isAngular) {
        angular.module('strformat', []).factory('strformat', function () {
            return strformat;
        });
    }

})(typeof module !== 'undefined' && module.exports, typeof angular !== 'undefined');
