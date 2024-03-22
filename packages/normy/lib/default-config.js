"use strict";

exports.__esModule = true;
exports.defaultConfig = void 0;
var defaultConfig = exports.defaultConfig = {
  getNormalizationObjectKey: function getNormalizationObjectKey(obj) {
    return obj.id;
  },
  devLogging: false,
  structuralSharing: true
};