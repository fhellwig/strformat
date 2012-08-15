var vows = require('vows');
var assert = require('assert');
var strformat = require('../strformat.js');

vows.describe('strformat').addBatch({
  "When I perform strformat on a text without placeholder": {
    topic: function() {
      return strformat('hello world', {'dummy': 'stuff'});
    },
    "Then the result should be the same input": function(res) {
      assert.strictEqual(res, 'hello world');
    }
  },
  "When I perform strformat on a text with a placeholder": {
    topic: function() {
      return strformat('hello {what}', {'what': 'world'});
    },
    "Then the result should be the original text with the replaced texts": function(res) {
      assert.strictEqual(res, 'hello world');
    }
  },
  "When I perform strformat on a text with a escaped placeholder": {
    topic: function() {
      return strformat('hello {{what}}', {'what': 'world'});
    },
    "Then the result should be the original text without the escape sequence": function(res) {
      assert.strictEqual(res, 'hello {what}');
    }
  },
  "When I perform strformat on a text with no arguments": {
    topic: function() {
      return strformat('hello {what}');
    },
    "Then the result should be the same input": function(res) {
      assert.strictEqual(res, 'hello {what}');
    }
  },
  "When I perform strformat on a text and the arguments are an array": {
    topic: function() {
      return strformat('hello {1}', ['foo', 'world']);
    },
    "Then the result should be the original text with the replaced indexes in the array": function(res) {
      assert.strictEqual(res, 'hello world');
    }
  }
}).run();
