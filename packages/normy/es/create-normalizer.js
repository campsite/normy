import _extends from "@babel/runtime/helpers/extends";
import { normalize } from './normalize';
import { denormalize } from './denormalize';
import { mergeData } from './merge-data';
import { defaultConfig } from './default-config';
import { addOrRemoveDependencies } from './add-or-remove-dependencies';
import { getQueriesDependentOnMutation } from './get-queries-dependent-on-mutation';
import { getDependenciesDiff } from './get-dependencies-diff';
import { warning } from './warning';
var initialData = {
  queries: {},
  objects: {},
  dependentQueries: {}
};
var isMutationObjectDifferent = function isMutationObjectDifferent(mutationData, normalizedData) {
  if (Array.isArray(mutationData) && Array.isArray(normalizedData)) {
    if (mutationData.length === 0) {
      return normalizedData.length !== 0;
    }
    return mutationData.some(function (v, i) {
      return isMutationObjectDifferent(v, normalizedData[i]);
    });
  }
  if (mutationData instanceof Date && normalizedData instanceof Date) {
    return mutationData.getTime() !== normalizedData.getTime();
  }
  if (mutationData !== null && typeof mutationData === 'object' && normalizedData !== null && typeof normalizedData === 'object') {
    return Object.entries(mutationData).some(function (_ref) {
      var key = _ref[0],
        value = _ref[1];
      return (normalizedData == null ? void 0 : normalizedData[key]) !== undefined && isMutationObjectDifferent(value, normalizedData[key]);
    });
  }
  return mutationData !== normalizedData;
};
export var createNormalizer = function createNormalizer(normalizerConfig, initialNormalizedData) {
  var config = _extends({}, defaultConfig, normalizerConfig);
  var normalizedData = initialNormalizedData != null ? initialNormalizedData : initialData;
  var currentDataReferences = {};
  var setQuery = function setQuery(queryKey, queryData) {
    var _extends2;
    if (config.structuralSharing) {
      if (currentDataReferences[queryKey] === queryData) {
        return;
      }
      currentDataReferences[queryKey] = queryData;
    }
    var _normalize = normalize(queryData, config),
      normalizedQueryData = _normalize[0],
      normalizedObjectsData = _normalize[1],
      usedKeys = _normalize[2];
    var _getDependenciesDiff = getDependenciesDiff(normalizedData.queries[queryKey] ? normalizedData.queries[queryKey].dependencies : [], Object.keys(normalizedObjectsData)),
      addedDependencies = _getDependenciesDiff.addedDependencies,
      removedDependencies = _getDependenciesDiff.removedDependencies;
    normalizedData = _extends({
      queries: _extends({}, normalizedData.queries, (_extends2 = {}, _extends2[queryKey] = {
        data: normalizedQueryData,
        usedKeys: usedKeys,
        dependencies: Object.keys(normalizedObjectsData)
      }, _extends2))
    }, addOrRemoveDependencies(normalizedData.dependentQueries, mergeData(normalizedData.objects, normalizedObjectsData), queryKey, addedDependencies, removedDependencies));
    warning(config.devLogging, 'set query:', queryKey, '\nwith data:', queryData, '\nnormalizedData:', normalizedData);
  };
  var removeQuery = function removeQuery(queryKey) {
    setQuery(queryKey, null);
    var queries = _extends({}, normalizedData.queries);
    delete queries[queryKey];
    delete currentDataReferences[queryKey];
    normalizedData = _extends({}, normalizedData, {
      queries: queries
    });
    warning(config.devLogging, 'removed query:', queryKey, '\nnormalizedData:', normalizedData);
  };
  var filterMutationObjects = function filterMutationObjects(mutationObjects, normalizedDataObjects) {
    var differentObjects = {};
    for (var key in mutationObjects) {
      if (isMutationObjectDifferent(mutationObjects[key], normalizedDataObjects[key])) {
        differentObjects[key] = mutationObjects[key];
      }
    }
    return differentObjects;
  };
  var getQueriesToUpdate = function getQueriesToUpdate(mutationData) {
    var _normalize2 = normalize(mutationData, config),
      normalizedObjectsData = _normalize2[1];
    var updatedObjects = filterMutationObjects(normalizedObjectsData, normalizedData.objects);
    var normalizedDataWithMutation = mergeData(normalizedData.objects, updatedObjects);
    var foundQueries = getQueriesDependentOnMutation(normalizedData.dependentQueries, Object.keys(updatedObjects));
    return foundQueries.map(function (queryKey) {
      return {
        queryKey: queryKey,
        data: denormalize(normalizedData.queries[queryKey].data, normalizedDataWithMutation, normalizedData.queries[queryKey].usedKeys)
      };
    });
  };
  var getQueryFragment = function getQueryFragment(fragment, exampleObject) {
    var usedKeys = {};
    if (exampleObject) {
      var _normalize3 = normalize(exampleObject, config),
        keys = _normalize3[2];
      usedKeys = keys;
    }
    try {
      var response = denormalize(fragment, normalizedData.objects, usedKeys);
      return response;
    } catch (error) {
      if (error instanceof RangeError) {
        warning(true, 'Recursive dependency detected. Pass example object as second argument.');
        return undefined;
      }
      throw error;
    }
  };
  var getObjectById = function getObjectById(id, exampleObject) {
    return getQueryFragment("@@" + id, exampleObject);
  };
  return {
    getNormalizedData: function getNormalizedData() {
      return normalizedData;
    },
    clearNormalizedData: function clearNormalizedData() {
      normalizedData = initialData;
      currentDataReferences = {};
    },
    setQuery: setQuery,
    removeQuery: removeQuery,
    getQueriesToUpdate: getQueriesToUpdate,
    getObjectById: getObjectById,
    getQueryFragment: getQueryFragment
  };
};