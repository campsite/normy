import { createNormalizer } from '@normy/core';
var shouldBeNormalized = function shouldBeNormalized(globalNormalize, localNormalize) {
  if (localNormalize === undefined) {
    return globalNormalize;
  }
  return localNormalize;
};
export var createQueryNormalizer = function createQueryNormalizer(queryClient, normalizerConfig) {
  var _normalizerConfig$nor;
  if (normalizerConfig === void 0) {
    normalizerConfig = {};
  }
  var normalize = (_normalizerConfig$nor = normalizerConfig.normalize) != null ? _normalizerConfig$nor : true;
  var normalizer = createNormalizer(normalizerConfig);
  var unsubscribeQueryCache = null;
  var unsubscribeMutationCache = null;

  // prevent reentrant query updates when calling setQueryData ourselves
  var skipReentrantQueryUpdates = false;
  var updateQueriesFromMutationData = function updateQueriesFromMutationData(mutationData, normalizer, queryClient) {
    var queriesToUpdate = normalizer.getQueriesToUpdate(mutationData);
    skipReentrantQueryUpdates = true;
    queriesToUpdate.forEach(function (query) {
      queryClient.setQueryData(JSON.parse(query.queryKey), function () {
        return query.data;
      });
    });
    skipReentrantQueryUpdates = false;
  };
  return {
    getNormalizedData: normalizer.getNormalizedData,
    setNormalizedData: function setNormalizedData(data) {
      return updateQueriesFromMutationData(data, normalizer, queryClient);
    },
    clear: normalizer.clearNormalizedData,
    subscribe: function subscribe() {
      unsubscribeQueryCache = queryClient.getQueryCache().subscribe(function (event) {
        var _event$query$meta;
        if (event.type === 'removed') {
          normalizer.removeQuery(JSON.stringify(event.query.queryKey));
        } else if (event.type === 'updated' && event.action.type === 'success' && event.action.data !== undefined && shouldBeNormalized(normalize, (_event$query$meta = event.query.meta) == null ? void 0 : _event$query$meta.normalize)) {
          updateQueriesFromMutationData(event.action.data, normalizer, queryClient);
          normalizer.setQuery(JSON.stringify(event.query.queryKey), event.action.data);
        }
      });
      unsubscribeMutationCache = queryClient.getMutationCache().subscribe(function (event) {
        var _event$mutation$meta, _event$mutation$state, _event$mutation$state2;
        if (event.type === 'updated' && event.action.type === 'success' && event.action.data && shouldBeNormalized(normalize, (_event$mutation$meta = event.mutation.meta) == null ? void 0 : _event$mutation$meta.normalize)) {
          updateQueriesFromMutationData(event.action.data, normalizer, queryClient);
        } else if (event.type === 'updated' && event.action.type === 'pending' && (_event$mutation$state = event.mutation.state) != null && (_event$mutation$state = _event$mutation$state.context) != null && _event$mutation$state.optimisticData) {
          updateQueriesFromMutationData(event.mutation.state.context.optimisticData, normalizer, queryClient);
        } else if (event.type === 'updated' && event.action.type === 'error' && (_event$mutation$state2 = event.mutation.state) != null && (_event$mutation$state2 = _event$mutation$state2.context) != null && _event$mutation$state2.rollbackData) {
          updateQueriesFromMutationData(event.mutation.state.context.rollbackData, normalizer, queryClient);
        }
      });
    },
    unsubscribe: function unsubscribe() {
      unsubscribeQueryCache == null || unsubscribeQueryCache();
      unsubscribeMutationCache == null || unsubscribeMutationCache();
      unsubscribeQueryCache = null;
      unsubscribeMutationCache = null;
    },
    getObjectById: normalizer.getObjectById,
    getQueryFragment: normalizer.getQueryFragment
  };
};