import _extends from "@babel/runtime/helpers/extends";
export var addOrRemoveDependencies = function addOrRemoveDependencies(dependentQueries, objects, queryKey, dependenciesToAdd, dependenciesToRemove) {
  dependentQueries = _extends({}, dependentQueries);
  objects = _extends({}, objects);
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