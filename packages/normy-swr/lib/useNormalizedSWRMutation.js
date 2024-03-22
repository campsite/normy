"use strict";

exports.__esModule = true;
exports.useNormalizedSWRMutation = void 0;
var _swr = require("swr");
var _mutation = _interopRequireDefault(require("swr/mutation"));
var _SWRNormalizerProvider = require("./SWRNormalizerProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable @typescript-eslint/no-explicit-any */
var useNormalizedSWRMutation = exports.useNormalizedSWRMutation = function useNormalizedSWRMutation(key, fetcher, options) {
  var _useSWRConfig = (0, _swr.useSWRConfig)(),
    mutate = _useSWRConfig.mutate;
  var normalizer = (0, _SWRNormalizerProvider.useSWRNormalizer)();
  return (0, _mutation["default"])(key,
  // @ts-expect-error swr types compatiblity issue, perhaps due to ts version mismatch
  function (k, opts) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (options != null && options.optimisticData) {
      var queriesToUpdate = normalizer.getQueriesToUpdate(options == null ? void 0 : options.optimisticData);
      queriesToUpdate.forEach(function (query) {
        void mutate(query.queryKey, query.data, {
          revalidate: false
        });
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return fetcher(k, opts);
  }, _extends({
    populateCache: false,
    revalidate: false
  }, options, {
    optimisticData: undefined,
    onSuccess: function onSuccess(data, mutationKey, config) {
      var _options$normalize;
      if ((_options$normalize = options == null ? void 0 : options.normalize) != null ? _options$normalize : true) {
        var queriesToUpdate = normalizer.getQueriesToUpdate(data);
        queriesToUpdate.forEach(function (query) {
          void mutate(query.queryKey, query.data, {
            revalidate: false
          });
        });
      }
      return options == null || options.onSuccess == null ? void 0 : options.onSuccess(data, mutationKey, config);
    },
    onError: function onError(error, mutationKey, config) {
      if (options != null && options.rollbackData) {
        var queriesToUpdate = normalizer.getQueriesToUpdate(options == null ? void 0 : options.rollbackData);
        queriesToUpdate.forEach(function (query) {
          void mutate(query.queryKey, query.data, {
            revalidate: false
          });
        });
      }
      return options == null || options.onError == null ? void 0 : options.onError(error, mutationKey, config);
    }
  }));
};