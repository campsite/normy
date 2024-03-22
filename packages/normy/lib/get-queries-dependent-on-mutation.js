"use strict";

exports.__esModule = true;
exports.getQueriesDependentOnMutation = void 0;
var getQueriesDependentOnMutation = exports.getQueriesDependentOnMutation = function getQueriesDependentOnMutation(dependentQueries, mutationDependencies) {
  var queries = [];
  mutationDependencies.forEach(function (dependency) {
    if (dependentQueries[dependency]) {
      queries.push.apply(queries, dependentQueries[dependency]);
    }
  });
  return Array.from(new Set(queries));
};