"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
var get = function get() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments.length > 1 ? arguments[1] : undefined;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var travel = function travel(regexp) {
    return String.prototype.split.call(path, regexp).filter(Boolean).reduce(function (res, key) {
      return res !== null && res !== undefined ? res[key] : res;
    }, obj);
  };

  var result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

exports.get = get;
//# sourceMappingURL=get.js.map