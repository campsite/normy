"use strict";

exports.__esModule = true;
exports.useQueryNormalizer = exports.QueryNormalizerProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var _createQueryNormalizer = require("./create-query-normalizer");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var QueryNormalizerContext = /*#__PURE__*/React.createContext(undefined);
var QueryNormalizerProvider = exports.QueryNormalizerProvider = function QueryNormalizerProvider(_ref) {
  var queryClient = _ref.queryClient,
    normalizerConfig = _ref.normalizerConfig,
    children = _ref.children;
  var _React$useState = React.useState(function () {
      return (0, _createQueryNormalizer.createQueryNormalizer)(queryClient, normalizerConfig);
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
var useQueryNormalizer = exports.useQueryNormalizer = function useQueryNormalizer() {
  var queryNormalizer = React.useContext(QueryNormalizerContext);
  if (!queryNormalizer) {
    throw new Error('No QueryNormalizer set, use QueryNormalizerProvider to set one');
  }
  return queryNormalizer;
};