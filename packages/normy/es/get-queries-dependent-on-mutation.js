export var getQueriesDependentOnMutation = function getQueriesDependentOnMutation(dependentQueries, mutationDependencies) {
  var queries = [];
  mutationDependencies.forEach(function (dependency) {
    if (dependentQueries[dependency]) {
      queries.push.apply(queries, dependentQueries[dependency]);
    }
  });
  return Array.from(new Set(queries));
};