"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.createNormalizer = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _normalize4 = require("./normalize");
var _denormalize = require("./denormalize");
var _mergeData = require("./merge-data");
var _defaultConfig = require("./default-config");
var _addOrRemoveDependencies = require("./add-or-remove-dependencies");
var _getQueriesDependentOnMutation = require("./get-queries-dependent-on-mutation");
var _getDependenciesDiff2 = require("./get-dependencies-diff");
var _warning = require("./warning");
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
var createNormalizer = exports.createNormalizer = function createNormalizer(normalizerConfig, initialNormalizedData) {
  var config = (0, _extends3["default"])({}, _defaultConfig.defaultConfig, normalizerConfig);
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
    var _normalize = (0, _normalize4.normalize)(queryData, config),
      normalizedQueryData = _normalize[0],
      normalizedObjectsData = _normalize[1],
      usedKeys = _normalize[2];
    var _getDependenciesDiff = (0, _getDependenciesDiff2.getDependenciesDiff)(normalizedData.queries[queryKey] ? normalizedData.queries[queryKey].dependencies : [], Object.keys(normalizedObjectsData)),
      addedDependencies = _getDependenciesDiff.addedDependencies,
      removedDependencies = _getDependenciesDiff.removedDependencies;
    normalizedData = (0, _extends3["default"])({
      queries: (0, _extends3["default"])({}, normalizedData.queries, (_extends2 = {}, _extends2[queryKey] = {
        data: normalizedQueryData,
        usedKeys: usedKeys,
        dependencies: Object.keys(normalizedObjectsData)
      }, _extends2))
    }, (0, _addOrRemoveDependencies.addOrRemoveDependencies)(normalizedData.dependentQueries, (0, _mergeData.mergeData)(normalizedData.objects, normalizedObjectsData), queryKey, addedDependencies, removedDependencies));
    (0, _warning.warning)(config.devLogging, 'set query:', queryKey, '\nwith data:', queryData, '\nnormalizedData:', normalizedData);
  };
  var removeQuery = function removeQuery(queryKey) {
    setQuery(queryKey, null);
    var queries = (0, _extends3["default"])({}, normalizedData.queries);
    delete queries[queryKey];
    delete currentDataReferences[queryKey];
    normalizedData = (0, _extends3["default"])({}, normalizedData, {
      queries: queries
    });
    (0, _warning.warning)(config.devLogging, 'removed query:', queryKey, '\nnormalizedData:', normalizedData);
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
    var _normalize2 = (0, _normalize4.normalize)(mutationData, config),
      normalizedObjectsData = _normalize2[1];
    var updatedObjects = filterMutationObjects(normalizedObjectsData, normalizedData.objects);
    var normalizedDataWithMutation = (0, _mergeData.mergeData)(normalizedData.objects, updatedObjects);
    var foundQueries = (0, _getQueriesDependentOnMutation.getQueriesDependentOnMutation)(normalizedData.dependentQueries, Object.keys(updatedObjects));
    return foundQueries.map(function (queryKey) {
      return {
        queryKey: queryKey,
        data: (0, _denormalize.denormalize)(normalizedData.queries[queryKey].data, normalizedDataWithMutation, normalizedData.queries[queryKey].usedKeys)
      };
    });
  };
  var getQueryFragment = function getQueryFragment(fragment, exampleObject) {
    var usedKeys = {};
    if (exampleObject) {
      var _normalize3 = (0, _normalize4.normalize)(exampleObject, config),
        keys = _normalize3[2];
      usedKeys = keys;
    }
    try {
      var response = (0, _denormalize.denormalize)(fragment, normalizedData.objects, usedKeys);
      return response;
    } catch (error) {
      if (error instanceof RangeError) {
        (0, _warning.warning)(true, 'Recursive dependency detected. Pass example object as second argument.');
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