"use strict";

exports.__esModule = true;
exports.normalize = exports.getDependencies = void 0;
var _defaultConfig = require("./default-config");
var _mergeData = require("./merge-data");
var stipFromDeps = function stipFromDeps(data, config, root) {
  if (root === void 0) {
    root = true;
  }
  if (Array.isArray(data)) {
    return data.map(function (v) {
      return stipFromDeps(v, config);
    });
  }
  if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    var objectKey = config.getNormalizationObjectKey(data);
    if (objectKey !== undefined && root) {
      return "@@" + objectKey;
    }
    return Object.entries(data).reduce(function (prev, _ref) {
      var k = _ref[0],
        v = _ref[1];
      prev[k] = stipFromDeps(v, config);
      return prev;
    }, {});
  }
  return data;
};
var getDependencies = exports.getDependencies = function getDependencies(data, config, usedKeys, path) {
  if (config === void 0) {
    config = _defaultConfig.defaultConfig;
  }
  if (path === void 0) {
    path = '';
  }
  usedKeys = usedKeys || {};
  if (Array.isArray(data)) {
    return [data.reduce(function (prev, current) {
      return [].concat(prev, getDependencies(current, config, usedKeys, path)[0]);
    }, []), usedKeys];
  }
  if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    if (config.getNormalizationObjectKey(data) !== undefined) {
      usedKeys[path] = Object.keys(data);
    }
    return [Object.entries(data).reduce(function (prev, _ref2) {
      var k = _ref2[0],
        v = _ref2[1];
      return [].concat(prev, getDependencies(v, config, usedKeys, path + "." + k)[0]);
    }, config.getNormalizationObjectKey(data) !== undefined ? [data] : []), usedKeys];
  }
  return [[], usedKeys];
};
var normalize = exports.normalize = function normalize(data, config) {
  if (config === void 0) {
    config = _defaultConfig.defaultConfig;
  }
  var _getDependencies = getDependencies(data, config),
    dependencies = _getDependencies[0],
    usedKeys = _getDependencies[1];
  return [stipFromDeps(data, config, true), dependencies.reduce(function (prev, v) {
    var key = config.getNormalizationObjectKey(v);
    prev["@@" + key] = prev["@@" + key] ? (0, _mergeData.mergeData)(prev["@@" + key], stipFromDeps(v, config, false)) : stipFromDeps(v, config, false);
    return prev;
  }, {}), usedKeys];
};