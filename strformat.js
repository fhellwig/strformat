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

// Matches '{{', '}}', and '{<token>}' where <token> is one or more
// word characters (letter, number, or underscore).
var RE = /\{\{|\}\}|\{(\w+)\}/g;

/**
 * Formats the specified string by replacing placeholders in the string with
 * replacement values from the function arguments. Placeholders are specified
 * with curly braces.
 *
 * The arguments can be a list of values, an array, or an object. For a list of
 * values or an array, numeric placeholders are used. For an object, property
 * name placeholders are used.
 *
 * Placeholders are escaped by doubling them (e.g., {{0}}). Any placeholder not
 * matching an argument is left alone.
 *
 * strformat('Error {0}: {1}', 404, 'Not Found');
 *      Returns: 'Error 404: Not Found' (uses argument position placeholders)
 *
 * strformat('{0}, {1}, and {2}', ['Red', 'Green', 'Blue']);
 *      Returns: 'Red, Green, and Blue' (uses array index placeholders)
 *
 * strformat('Hi {first} {last}', {first: 'John', last: 'Doe'});
 *      Returns: 'Hi John Doe' (uses object property name placeholders)
 */
function strformat(str, args) {
    if (typeof args !== 'object') {
        args = Array.prototype.slice.call(arguments, 1);
    }
    return str.replace(RE, function (m, n) {
        if (m == '{{') {
            return '{';
        }
        if (m == '}}') {
            return '}';
        }
        var val = args[n];
        return (typeof val === 'undefined') ? m : val;
    });
}

module.exports = exports = strformat;
