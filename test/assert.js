'use strict'

var BaseAssert = require('test/assert').Assert

exports.Assert = function () {
  return Object.create(BaseAssert.apply(null, arguments), DAssert)
}
var DAssert = {
  equalText: { value: function equalText(actual, expected, message) {
    var lines
    if (actual == expected) this.pass(message)
    else {
      message = 'Diff lines: ' + Object.keys(diff(actual.split('\n'),
                                                  expected.split('\n')))

      this.fail({
        actual: actual,
        expected: expected,
        operation: 'eqalText',
        message: message
      })
    }
  }, enumerable: true }
}

function diff(actual, expected) {
  value = []
  Array.prototype.forEach.call(actual, function(element, index) {
    if (expected[index] !== element)
      value[index] = { actual: element, expected: expected[index] }
  })
  return value
}
