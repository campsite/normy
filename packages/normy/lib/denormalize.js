"use strict";

exports.__esModule = true;
exports.denormalize = void 0;
var denormalize = exports.denormalize = function denormalize(data, normalizedData, usedKeys, path) {
  if (path === void 0) {
    path = '';
  }
  if (typeof data === 'string' && data.startsWith('@@')) {
    return denormalize(normalizedData[data], normalizedData, usedKeys, path);
  } else if (Array.isArray(data)) {
    return data.map(function (value) {
      return denormalize(value, normalizedData, usedKeys, path);
    });
  } else if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    var objectEntries = usedKeys[path] ? Object.entries(data).filter(function (_ref) {
      var k = _ref[0];
      return usedKeys[path].includes(k);
    }) : Object.entries(data);
    return objectEntries.reduce(function (prev, _ref2) {
      var k = _ref2[0],
        v = _ref2[1];
      prev[k] = denormalize(v, normalizedData, usedKeys, path + "." + k);
      return prev;
    }, {});
  }
  return data;
};