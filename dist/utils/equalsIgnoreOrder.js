"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equalsIgnoreOrder = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

// https://www.30secondsofcode.org/blog/s/javascript-array-comparison
var equalsIgnoreOrder = function equalsIgnoreOrder(a, b) {
  if (a.length !== b.length) return false;
  var uniqueValues = new Set([].concat((0, _toConsumableArray2["default"])(a), (0, _toConsumableArray2["default"])(b)));
  var equal = true;
  uniqueValues.forEach(function (v) {
    var aCount = a.filter(function (e) {
      return e === v;
    }).length;
    var bCount = b.filter(function (e) {
      return e === v;
    }).length;
    if (aCount !== bCount) equal = false;
  });
  return equal;
};

exports.equalsIgnoreOrder = equalsIgnoreOrder;
//# sourceMappingURL=equalsIgnoreOrder.js.map