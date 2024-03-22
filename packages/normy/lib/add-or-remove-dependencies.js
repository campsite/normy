"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.addOrRemoveDependencies = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var addOrRemoveDependencies = exports.addOrRemoveDependencies = function addOrRemoveDependencies(dependentQueries, objects, queryKey, dependenciesToAdd, dependenciesToRemove) {
  dependentQueries = (0, _extends2["default"])({}, dependentQueries);
  objects = (0, _extends2["default"])({}, objects);
  dependenciesToAdd.forEach(function (dependency) {
    if (!dependentQueries[dependency]) {
      dependentQueries[dependency] = [queryKey];
    }
    if (!dependentQueries[dependency].includes(queryKey)) {
      dependentQueries[dependency] = [].concat(dependentQueries[dependency], [queryKey]);
    }
  });
  dependenciesToRemove.forEach(function (dependency) {
    if (dependentQueries[dependency].length > 1) {
      dependentQueries[dependency] = dependentQueries[dependency].filter(function (v) {
        return v !== queryKey;
      });
    } else {
      delete dependentQueries[dependency];
      delete objects[dependency];
    }
  });
  return {
    dependentQueries: dependentQueries,
    objects: objects
  };
};