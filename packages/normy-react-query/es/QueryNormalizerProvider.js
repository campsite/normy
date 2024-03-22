import * as React from 'react';
import { createQueryNormalizer } from './create-query-normalizer';
var QueryNormalizerContext = /*#__PURE__*/React.createContext(undefined);
export var QueryNormalizerProvider = function QueryNormalizerProvider(_ref) {
  var queryClient = _ref.queryClient,
    normalizerConfig = _ref.normalizerConfig,
    children = _ref.children;
  var _React$useState = React.useState(function () {
      return createQueryNormalizer(queryClient, normalizerConfig);
    }),
    queryNormalizer = _React$useState[0];
  React.useEffect(function () {
    queryNormalizer.subscribe();
    return function () {
      queryNormalizer.unsubscribe();
      queryNormalizer.clear();
    };
  }, []);
  return /*#__PURE__*/React.createElement(QueryNormalizerContext.Provider, {
    value: queryNormalizer
  }, children);
};
export var useQueryNormalizer = function useQueryNormalizer() {
  var queryNormalizer = React.useContext(QueryNormalizerContext);
  if (!queryNormalizer) {
    throw new Error('No QueryNormalizer set, use QueryNormalizerProvider to set one');
  }
  return queryNormalizer;
};