"use strict";

exports.__esModule = true;
exports.getDependenciesDiff = void 0;
var getDependenciesDiff = exports.getDependenciesDiff = function getDependenciesDiff(oldDependencies, newDependencies) {
  return {
    addedDependencies: newDependencies.filter(function (newDependency) {
      return !oldDependencies.includes(newDependency);
    }),
    removedDependencies: oldDependencies.filter(function (oldDependency) {
      return !newDependencies.includes(oldDependency);
    })
  };
};