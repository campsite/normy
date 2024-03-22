"use strict";

exports.__esModule = true;
exports.useSWRNormalizer = exports.SWRNormalizerProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var _core = require("@normy/core");
var _swr = require("swr");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var createSwrNormalizer = function createSwrNormalizer(normalizerConfig) {
  if (normalizerConfig === void 0) {
    normalizerConfig = {};
  }
  var normalizer = (0, _core.createNormalizer)(normalizerConfig);
  // we solve chicken egg problem this way, we need normalizer to create swr context, and we cannot have mutate before it is created
  var mutate = null;
  return _extends({}, normalizer, {
    addMutate: function addMutate(mutateCallback) {
      mutate = mutateCallback;
    },
    normalize: normalizerConfig.normalize,
    setNormalizedData: function setNormalizedData(data) {
      var queriesToUpdate = normalizer.getQueriesToUpdate(data);
      queriesToUpdate.forEach(function (query) {
        void (mutate == null ? void 0 : mutate(query.queryKey, query.data, {
          revalidate: false
        }));
      });
    }
  });
};
var SWRNormalizerContext = /*#__PURE__*/React.createContext(undefined);
var CacheMap = /*#__PURE__*/function (_Map) {
  _inheritsLoose(CacheMap, _Map);
  function CacheMap() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Map.call.apply(_Map, [this].concat(args)) || this;
    _this.normalizer = void 0;
    return _this;
  }
  var _proto = CacheMap.prototype;
  _proto.addNormalizer = function addNormalizer(normalizer) {
    this.normalizer = normalizer;
  };
  _proto.set = function set(key, value) {
    var _this$normalizer$norm, _this$normalizer;
    if (value.data && ((_this$normalizer$norm = (_this$normalizer = this.normalizer) == null || _this$normalizer.normalize == null ? void 0 : _this$normalizer.normalize(key)) != null ? _this$normalizer$norm : true)) {
      var _this$normalizer2;
      (_this$normalizer2 = this.normalizer) == null || _this$normalizer2.setQuery(key, value.data);
    }
    return _Map.prototype.set.call(this, key, value);
  };
  _proto["delete"] = function _delete(key) {
    var _this$normalizer3;
    (_this$normalizer3 = this.normalizer) == null || _this$normalizer3.removeQuery(key);
    return _Map.prototype["delete"].call(this, key);
  };
  return CacheMap;
}( /*#__PURE__*/_wrapNativeSuper(Map));
var SWRNormalizerProviderInternal = function SWRNormalizerProviderInternal(_ref) {
  var swrNormalizer = _ref.swrNormalizer,
    children = _ref.children;
  var _useSWRConfig = (0, _swr.useSWRConfig)(),
    mutate = _useSWRConfig.mutate;
  React.useEffect(function () {
    return swrNormalizer.addMutate(mutate);
  }, []);
  return /*#__PURE__*/React.createElement(SWRNormalizerContext.Provider, {
    value: swrNormalizer
  }, children);
};
var SWRNormalizerProvider = exports.SWRNormalizerProvider = function SWRNormalizerProvider(_ref2) {
  var normalizerConfig = _ref2.normalizerConfig,
    swrConfigValue = _ref2.swrConfigValue,
    children = _ref2.children;
  var _React$useState = React.useState(function () {
      return createSwrNormalizer(normalizerConfig);
    }),
    swrNormalizer = _React$useState[0];
  var _React$useState2 = React.useState(function () {
      return function () {
        var map = new CacheMap();
        map.addNormalizer(swrNormalizer);
        return map;
      };
    }),
    cacheProvider = _React$useState2[0];
  React.useEffect(function () {
    return function () {
      return swrNormalizer.clearNormalizedData();
    };
  }, []);
  return /*#__PURE__*/React.createElement(_swr.SWRConfig, {
    value: _extends({}, swrConfigValue, {
      provider: cacheProvider
    })
  }, /*#__PURE__*/React.createElement(SWRNormalizerProviderInternal, {
    swrNormalizer: swrNormalizer
  }, children));
};
var useSWRNormalizer = exports.useSWRNormalizer = function useSWRNormalizer() {
  var swrNormalizer = React.useContext(SWRNormalizerContext);
  if (!swrNormalizer) {
    throw new Error('No SWRNormalizer set, use SWRNormalizerProvider to set one');
  }
  return swrNormalizer;
};