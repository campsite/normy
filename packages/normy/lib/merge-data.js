"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.mergeData = void 0;
var _deepmerge = _interopRequireDefault(require("deepmerge"));
var mergeData = exports.mergeData = function mergeData(oldData, newData) {
  return (0, _deepmerge["default"])(oldData, newData, {
    arrayMerge: function arrayMerge(destinationArray, sourceArray) {
      return sourceArray;
    },
    clone: false
  });
};