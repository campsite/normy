"use strict";

exports.__esModule = true;
exports.getNormalizer = exports.getId = exports.createNormalizationMiddleware = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _core = require("@normy/core");
exports.getId = _core.getId;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getNormalizer = exports.getNormalizer = function getNormalizer(dispatch) {
  return dispatch({
    type: 'getNormalization'
  });
};
var allTypes = ['api/executeMutation/fulfilled', 'api/executeQuery/fulfilled', 'api/queries/queryResultPatched', 'api/queries/removeQueryResult', 'getNormalization'];
var isNormalizerAction = function isNormalizerAction(action) {
  return (0, _toolkit.isAction)(action) && allTypes.includes(action.type);
};
var createNormalizationMiddleware = exports.createNormalizationMiddleware = function createNormalizationMiddleware(api, normalizerConfig) {
  var normalizer = (0, _core.createNormalizer)(_extends({}, normalizerConfig, {
    // TODO: we wait for rtk-query maintainers to make this work
    structuralSharing: false
  }));
  var args = {};
  return function (store) {
    return function (next) {
      return function (action) {
        var _normalizerConfig$nor, _normalizerConfig$nor2, _normalizerConfig$nor3;
        if (!isNormalizerAction(action)) {
          return next(action);
        }
        if (action.type === 'api/queries/queryResultPatched' && ((_normalizerConfig$nor = normalizerConfig == null || normalizerConfig.normalizeQuery == null ? void 0 : normalizerConfig.normalizeQuery(action.payload.queryCacheKey)) != null ? _normalizerConfig$nor : true)) {
          var response = next(action);
          normalizer.setQuery(action.payload.queryCacheKey,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          store.getState()[api.reducerPath].queries[action.payload.queryCacheKey].data);
          return response;
        }
        if (action.type === 'getNormalization') {
          return _extends({}, normalizer, {
            setNormalizedData: function setNormalizedData(data) {
              var queriesToUpdate = normalizer.getQueriesToUpdate(data);
              queriesToUpdate.forEach(function (query) {
                var endpoint = query.queryKey.split('(')[0];
                store.dispatch(
                // @ts-expect-error this is generic api, which is not typed
                api.util.updateQueryData(
                // @ts-expect-error this is generic api, which is not typed
                endpoint, args[query.queryKey], function () {
                  return query.data;
                }));
              });
            }
          });
        }
        if (action.type === 'api/executeQuery/fulfilled' && ((_normalizerConfig$nor2 = normalizerConfig == null || normalizerConfig.normalizeQuery == null ? void 0 : normalizerConfig.normalizeQuery(action.meta.arg.queryCacheKey)) != null ? _normalizerConfig$nor2 : true)) {
          normalizer.setQuery(action.meta.arg.queryCacheKey, action.payload);
          args[action.meta.arg.queryCacheKey] = action.meta.arg.originalArgs;
        } else if (action.type === 'api/queries/removeQueryResult') {
          normalizer.removeQuery(action.payload.queryCacheKey);
          delete args[action.payload.queryCacheKey];
        } else if (action.type === 'api/executeMutation/fulfilled' && ((_normalizerConfig$nor3 = normalizerConfig == null || normalizerConfig.normalizeMutation == null ? void 0 : normalizerConfig.normalizeMutation(action.meta.arg.endpointName)) != null ? _normalizerConfig$nor3 : true)) {
          var queriesToUpdate = normalizer.getQueriesToUpdate(action.payload);
          queriesToUpdate.forEach(function (query) {
            var endpoint = query.queryKey.split('(')[0];
            store.dispatch(
            // @ts-expect-error ddd
            api.util.updateQueryData(
            // @ts-expect-error ddd
            endpoint, args[query.queryKey], function () {
              return query.data;
            }));
          });
        }
        return next(action);
      };
    };
  };
};