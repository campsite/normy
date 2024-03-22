(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@normy/core"), require("react"), require("swr"));
	else if(typeof define === 'function' && define.amd)
		define(["@normy/core", "react", "swr"], factory);
	else if(typeof exports === 'object')
		exports["NormySwr"] = factory(require("@normy/core"), require("react"), require("swr"));
	else
		root["NormySwr"] = factory(root["Normy"], root["React"], root["Swr"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__normy_core__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_swr__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SWRNormalizerProvider.tsx":
/*!***************************************!*\
  !*** ./src/SWRNormalizerProvider.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SWRNormalizerProvider: () => (/* binding */ SWRNormalizerProvider),
/* harmony export */   useSWRNormalizer: () => (/* binding */ useSWRNormalizer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @normy/core */ "@normy/core");
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_normy_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr */ "swr");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swr__WEBPACK_IMPORTED_MODULE_2__);
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
  var normalizer = (0,_normy_core__WEBPACK_IMPORTED_MODULE_1__.createNormalizer)(normalizerConfig);
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
var SWRNormalizerContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
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
  var _useSWRConfig = (0,swr__WEBPACK_IMPORTED_MODULE_2__.useSWRConfig)(),
    mutate = _useSWRConfig.mutate;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    return swrNormalizer.addMutate(mutate);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SWRNormalizerContext.Provider, {
    value: swrNormalizer
  }, children);
};
var SWRNormalizerProvider = function SWRNormalizerProvider(_ref2) {
  var normalizerConfig = _ref2.normalizerConfig,
    swrConfigValue = _ref2.swrConfigValue,
    children = _ref2.children;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(function () {
      return createSwrNormalizer(normalizerConfig);
    }),
    swrNormalizer = _React$useState[0];
  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_0__.useState(function () {
      return function () {
        var map = new CacheMap();
        map.addNormalizer(swrNormalizer);
        return map;
      };
    }),
    cacheProvider = _React$useState2[0];
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    return function () {
      return swrNormalizer.clearNormalizedData();
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(swr__WEBPACK_IMPORTED_MODULE_2__.SWRConfig, {
    value: _extends({}, swrConfigValue, {
      provider: cacheProvider
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SWRNormalizerProviderInternal, {
    swrNormalizer: swrNormalizer
  }, children));
};
var useSWRNormalizer = function useSWRNormalizer() {
  var swrNormalizer = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SWRNormalizerContext);
  if (!swrNormalizer) {
    throw new Error('No SWRNormalizer set, use SWRNormalizerProvider to set one');
  }
  return swrNormalizer;
};

/***/ }),

/***/ "./src/useNormalizedSWRMutation.ts":
/*!*****************************************!*\
  !*** ./src/useNormalizedSWRMutation.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useNormalizedSWRMutation: () => (/* binding */ useNormalizedSWRMutation)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swr */ "swr");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(swr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swr_mutation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swr/mutation */ "../../node_modules/.pnpm/swr@2.2.4_react@18.2.0/node_modules/swr/mutation/dist/index.mjs");
/* harmony import */ var _SWRNormalizerProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SWRNormalizerProvider */ "./src/SWRNormalizerProvider.tsx");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint-disable @typescript-eslint/no-explicit-any */




var useNormalizedSWRMutation = function useNormalizedSWRMutation(key, fetcher, options) {
  var _useSWRConfig = (0,swr__WEBPACK_IMPORTED_MODULE_0__.useSWRConfig)(),
    mutate = _useSWRConfig.mutate;
  var normalizer = (0,_SWRNormalizerProvider__WEBPACK_IMPORTED_MODULE_2__.useSWRNormalizer)();
  return (0,swr_mutation__WEBPACK_IMPORTED_MODULE_1__["default"])(key,
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

/***/ }),

/***/ "@normy/core":
/*!********************************************************************************************************!*\
  !*** external {"commonjs":"@normy/core","commonjs2":"@normy/core","amd":"@normy/core","root":"Normy"} ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__normy_core__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "swr":
/*!******************************************************************************!*\
  !*** external {"commonjs":"swr","commonjs2":"swr","amd":"swr","root":"Swr"} ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_swr__;

/***/ }),

/***/ "../../node_modules/.pnpm/swr@2.2.4_react@18.2.0/node_modules/swr/_internal/dist/index.mjs":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/swr@2.2.4_react@18.2.0/node_modules/swr/_internal/dist/index.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INFINITE_PREFIX: () => (/* binding */ INFINITE_PREFIX),
/* harmony export */   IS_REACT_LEGACY: () => (/* binding */ IS_REACT_LEGACY),
/* harmony export */   IS_SERVER: () => (/* binding */ IS_SERVER),
/* harmony export */   OBJECT: () => (/* binding */ OBJECT),
/* harmony export */   SWRConfig: () => (/* binding */ SWRConfig),
/* harmony export */   SWRGlobalState: () => (/* binding */ SWRGlobalState),
/* harmony export */   UNDEFINED: () => (/* binding */ UNDEFINED),
/* harmony export */   cache: () => (/* binding */ cache),
/* harmony export */   compare: () => (/* binding */ compare),
/* harmony export */   createCacheHelper: () => (/* binding */ createCacheHelper),
/* harmony export */   defaultConfig: () => (/* binding */ defaultConfig),
/* harmony export */   defaultConfigOptions: () => (/* binding */ defaultConfigOptions),
/* harmony export */   getTimestamp: () => (/* binding */ getTimestamp),
/* harmony export */   hasRequestAnimationFrame: () => (/* binding */ hasRequestAnimationFrame),
/* harmony export */   initCache: () => (/* binding */ initCache),
/* harmony export */   internalMutate: () => (/* binding */ internalMutate),
/* harmony export */   isDocumentDefined: () => (/* binding */ isDocumentDefined),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isPromiseLike: () => (/* binding */ isPromiseLike),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined),
/* harmony export */   isWindowDefined: () => (/* binding */ isWindowDefined),
/* harmony export */   mergeConfigs: () => (/* binding */ mergeConfigs),
/* harmony export */   mergeObjects: () => (/* binding */ mergeObjects),
/* harmony export */   mutate: () => (/* binding */ mutate),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   preload: () => (/* binding */ preload),
/* harmony export */   preset: () => (/* binding */ preset),
/* harmony export */   rAF: () => (/* binding */ rAF),
/* harmony export */   revalidateEvents: () => (/* binding */ events),
/* harmony export */   serialize: () => (/* binding */ serialize),
/* harmony export */   slowConnection: () => (/* binding */ slowConnection),
/* harmony export */   stableHash: () => (/* binding */ stableHash),
/* harmony export */   subscribeCallback: () => (/* binding */ subscribeCallback),
/* harmony export */   useIsomorphicLayoutEffect: () => (/* binding */ useIsomorphicLayoutEffect),
/* harmony export */   useSWRConfig: () => (/* binding */ useSWRConfig),
/* harmony export */   withArgs: () => (/* binding */ withArgs),
/* harmony export */   withMiddleware: () => (/* binding */ withMiddleware)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


// Shared state between server components and client components
const noop = ()=>{};
// Using noop() as the undefined value as undefined can be replaced
// by something else. Prettier ignore and extra parentheses are necessary here
// to ensure that tsc doesn't remove the __NOINLINE__ comment.
// prettier-ignore
const UNDEFINED = /*#__NOINLINE__*/ noop();
const OBJECT = Object;
const isUndefined = (v)=>v === UNDEFINED;
const isFunction = (v)=>typeof v == 'function';
const mergeObjects = (a, b)=>({
        ...a,
        ...b
    });
const isPromiseLike = (x)=>isFunction(x.then);

// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap();
// counter of the key
let counter = 0;
// A stable hash implementation that supports:
// - Fast and ensures unique hash properties
// - Handles unserializable values
// - Handles object key ordering
// - Generates short results
//
// This is not a serialization function, and the result is not guaranteed to be
// parsable.
const stableHash = (arg)=>{
    const type = typeof arg;
    const constructor = arg && arg.constructor;
    const isDate = constructor == Date;
    let result;
    let index;
    if (OBJECT(arg) === arg && !isDate && constructor != RegExp) {
        // Object/function, not null/date/regexp. Use WeakMap to store the id first.
        // If it's already hashed, directly return the result.
        result = table.get(arg);
        if (result) return result;
        // Store the hash first for circular reference detection before entering the
        // recursive `stableHash` calls.
        // For other objects like set and map, we use this id directly as the hash.
        result = ++counter + '~';
        table.set(arg, result);
        if (constructor == Array) {
            // Array.
            result = '@';
            for(index = 0; index < arg.length; index++){
                result += stableHash(arg[index]) + ',';
            }
            table.set(arg, result);
        }
        if (constructor == OBJECT) {
            // Object, sort keys.
            result = '#';
            const keys = OBJECT.keys(arg).sort();
            while(!isUndefined(index = keys.pop())){
                if (!isUndefined(arg[index])) {
                    result += index + ':' + stableHash(arg[index]) + ',';
                }
            }
            table.set(arg, result);
        }
    } else {
        result = isDate ? arg.toJSON() : type == 'symbol' ? arg.toString() : type == 'string' ? JSON.stringify(arg) : '' + arg;
    }
    return result;
};

// Global state used to deduplicate requests and store listeners
const SWRGlobalState = new WeakMap();

const EMPTY_CACHE = {};
const INITIAL_CACHE = {};
const STR_UNDEFINED = 'undefined';
// NOTE: Use the function to guarantee it's re-evaluated between jsdom and node runtime for tests.
const isWindowDefined = typeof window != STR_UNDEFINED;
const isDocumentDefined = typeof document != STR_UNDEFINED;
const hasRequestAnimationFrame = ()=>isWindowDefined && typeof window['requestAnimationFrame'] != STR_UNDEFINED;
const createCacheHelper = (cache, key)=>{
    const state = SWRGlobalState.get(cache);
    return [
        // Getter
        ()=>!isUndefined(key) && cache.get(key) || EMPTY_CACHE,
        // Setter
        (info)=>{
            if (!isUndefined(key)) {
                const prev = cache.get(key);
                // Before writing to the store, we keep the value in the initial cache
                // if it's not there yet.
                if (!(key in INITIAL_CACHE)) {
                    INITIAL_CACHE[key] = prev;
                }
                state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
            }
        },
        // Subscriber
        state[6],
        // Get server cache snapshot
        ()=>{
            if (!isUndefined(key)) {
                // If the cache was updated on the client, we return the stored initial value.
                if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
            }
            // If we haven't done any client-side updates, we return the current value.
            return !isUndefined(key) && cache.get(key) || EMPTY_CACHE;
        }
    ];
} // export { UNDEFINED, OBJECT, isUndefined, isFunction, mergeObjects, isPromiseLike }
;

/**
 * Due to the bug https://bugs.chromium.org/p/chromium/issues/detail?id=678075,
 * it's not reliable to detect if the browser is currently online or offline
 * based on `navigator.onLine`.
 * As a workaround, we always assume it's online on the first load, and change
 * the status upon `online` or `offline` events.
 */ let online = true;
const isOnline = ()=>online;
// For node and React Native, `add/removeEventListener` doesn't exist on window.
const [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
    window.addEventListener.bind(window),
    window.removeEventListener.bind(window)
] : [
    noop,
    noop
];
const isVisible = ()=>{
    const visibilityState = isDocumentDefined && document.visibilityState;
    return isUndefined(visibilityState) || visibilityState !== 'hidden';
};
const initFocus = (callback)=>{
    // focus revalidate
    if (isDocumentDefined) {
        document.addEventListener('visibilitychange', callback);
    }
    onWindowEvent('focus', callback);
    return ()=>{
        if (isDocumentDefined) {
            document.removeEventListener('visibilitychange', callback);
        }
        offWindowEvent('focus', callback);
    };
};
const initReconnect = (callback)=>{
    // revalidate on reconnected
    const onOnline = ()=>{
        online = true;
        callback();
    };
    // nothing to revalidate, just update the status
    const onOffline = ()=>{
        online = false;
    };
    onWindowEvent('online', onOnline);
    onWindowEvent('offline', onOffline);
    return ()=>{
        offWindowEvent('online', onOnline);
        offWindowEvent('offline', onOffline);
    };
};
const preset = {
    isOnline,
    isVisible
};
const defaultConfigOptions = {
    initFocus,
    initReconnect
};

const IS_REACT_LEGACY = !react__WEBPACK_IMPORTED_MODULE_0__.useId;
const IS_SERVER = !isWindowDefined || 'Deno' in window;
// Polyfill requestAnimationFrame
const rAF = (f)=>hasRequestAnimationFrame() ? window['requestAnimationFrame'](f) : setTimeout(f, 1);
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect = IS_SERVER ? react__WEBPACK_IMPORTED_MODULE_0__.useEffect : react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
// This assignment is to extend the Navigator type to use effectiveType.
const navigatorConnection = typeof navigator !== 'undefined' && navigator.connection;
// Adjust the config based on slow connection status (<= 70Kbps).
const slowConnection = !IS_SERVER && navigatorConnection && ([
    'slow-2g',
    '2g'
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);

const serialize = (key)=>{
    if (isFunction(key)) {
        try {
            key = key();
        } catch (err) {
            // dependencies not ready
            key = '';
        }
    }
    // Use the original key as the argument of fetcher. This can be a string or an
    // array of values.
    const args = key;
    // If key is not falsy, or not an empty array, hash it.
    key = typeof key == 'string' ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : '';
    return [
        key,
        args
    ];
};

// Global timestamp.
let __timestamp = 0;
const getTimestamp = ()=>++__timestamp;

const FOCUS_EVENT = 0;
const RECONNECT_EVENT = 1;
const MUTATE_EVENT = 2;
const ERROR_REVALIDATE_EVENT = 3;

var events = {
  __proto__: null,
  ERROR_REVALIDATE_EVENT: ERROR_REVALIDATE_EVENT,
  FOCUS_EVENT: FOCUS_EVENT,
  MUTATE_EVENT: MUTATE_EVENT,
  RECONNECT_EVENT: RECONNECT_EVENT
};

async function internalMutate(...args) {
    const [cache, _key, _data, _opts] = args;
    // When passing as a boolean, it's explicitly used to disable/enable
    // revalidation.
    const options = mergeObjects({
        populateCache: true,
        throwOnError: true
    }, typeof _opts === 'boolean' ? {
        revalidate: _opts
    } : _opts || {});
    let populateCache = options.populateCache;
    const rollbackOnErrorOption = options.rollbackOnError;
    let optimisticData = options.optimisticData;
    const revalidate = options.revalidate !== false;
    const rollbackOnError = (error)=>{
        return typeof rollbackOnErrorOption === 'function' ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
    };
    const throwOnError = options.throwOnError;
    // If the second argument is a key filter, return the mutation results for all
    // filtered keys.
    if (isFunction(_key)) {
        const keyFilter = _key;
        const matchedKeys = [];
        const it = cache.keys();
        for (const key of it){
            if (// Skip the special useSWRInfinite and useSWRSubscription keys.
            !/^\$(inf|sub)\$/.test(key) && keyFilter(cache.get(key)._k)) {
                matchedKeys.push(key);
            }
        }
        return Promise.all(matchedKeys.map(mutateByKey));
    }
    return mutateByKey(_key);
    async function mutateByKey(_k) {
        // Serialize key
        const [key] = serialize(_k);
        if (!key) return;
        const [get, set] = createCacheHelper(cache, key);
        const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
        const startRevalidate = ()=>{
            const revalidators = EVENT_REVALIDATORS[key];
            if (revalidate) {
                // Invalidate the key by deleting the concurrent request markers so new
                // requests will not be deduped.
                delete FETCH[key];
                delete PRELOAD[key];
                if (revalidators && revalidators[0]) {
                    return revalidators[0](MUTATE_EVENT).then(()=>get().data);
                }
            }
            return get().data;
        };
        // If there is no new data provided, revalidate the key with current state.
        if (args.length < 3) {
            // Revalidate and broadcast state.
            return startRevalidate();
        }
        let data = _data;
        let error;
        // Update global timestamps.
        const beforeMutationTs = getTimestamp();
        MUTATION[key] = [
            beforeMutationTs,
            0
        ];
        const hasOptimisticData = !isUndefined(optimisticData);
        const state = get();
        // `displayedData` is the current value on screen. It could be the optimistic value
        // that is going to be overridden by a `committedData`, or get reverted back.
        // `committedData` is the validated value that comes from a fetch or mutation.
        const displayedData = state.data;
        const currentData = state._c;
        const committedData = isUndefined(currentData) ? displayedData : currentData;
        // Do optimistic data update.
        if (hasOptimisticData) {
            optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
            // When we set optimistic data, backup the current committedData data in `_c`.
            set({
                data: optimisticData,
                _c: committedData
            });
        }
        if (isFunction(data)) {
            // `data` is a function, call it passing current cache value.
            try {
                data = data(committedData);
            } catch (err) {
                // If it throws an error synchronously, we shouldn't update the cache.
                error = err;
            }
        }
        // `data` is a promise/thenable, resolve the final data first.
        if (data && isPromiseLike(data)) {
            // This means that the mutation is async, we need to check timestamps to
            // avoid race conditions.
            data = await data.catch((err)=>{
                error = err;
            });
            // Check if other mutations have occurred since we've started this mutation.
            // If there's a race we don't update cache or broadcast the change,
            // just return the data.
            if (beforeMutationTs !== MUTATION[key][0]) {
                if (error) throw error;
                return data;
            } else if (error && hasOptimisticData && rollbackOnError(error)) {
                // Rollback. Always populate the cache in this case but without
                // transforming the data.
                populateCache = true;
                // Reset data to be the latest committed data, and clear the `_c` value.
                set({
                    data: committedData,
                    _c: UNDEFINED
                });
            }
        }
        // If we should write back the cache after request.
        if (populateCache) {
            if (!error) {
                // Transform the result into data.
                if (isFunction(populateCache)) {
                    const populateCachedData = populateCache(data, committedData);
                    set({
                        data: populateCachedData,
                        error: UNDEFINED,
                        _c: UNDEFINED
                    });
                } else {
                    // Only update cached data and reset the error if there's no error. Data can be `undefined` here.
                    set({
                        data,
                        error: UNDEFINED,
                        _c: UNDEFINED
                    });
                }
            }
        }
        // Reset the timestamp to mark the mutation has ended.
        MUTATION[key][1] = getTimestamp();
        // Update existing SWR Hooks' internal states:
        Promise.resolve(startRevalidate()).then(()=>{
            // The mutation and revalidation are ended, we can clear it since the data is
            // not an optimistic value anymore.
            set({
                _c: UNDEFINED
            });
        });
        // Throw error or return data
        if (error) {
            if (throwOnError) throw error;
            return;
        }
        return data;
    }
}

const revalidateAllKeys = (revalidators, type)=>{
    for(const key in revalidators){
        if (revalidators[key][0]) revalidators[key][0](type);
    }
};
const initCache = (provider, options)=>{
    // The global state for a specific provider will be used to deduplicate
    // requests and store listeners. As well as a mutate function that is bound to
    // the cache.
    // The provider's global state might be already initialized. Let's try to get the
    // global state associated with the provider first.
    if (!SWRGlobalState.has(provider)) {
        const opts = mergeObjects(defaultConfigOptions, options);
        // If there's no global state bound to the provider, create a new one with the
        // new mutate function.
        const EVENT_REVALIDATORS = {};
        const mutate = internalMutate.bind(UNDEFINED, provider);
        let unmount = noop;
        const subscriptions = {};
        const subscribe = (key, callback)=>{
            const subs = subscriptions[key] || [];
            subscriptions[key] = subs;
            subs.push(callback);
            return ()=>subs.splice(subs.indexOf(callback), 1);
        };
        const setter = (key, value, prev)=>{
            provider.set(key, value);
            const subs = subscriptions[key];
            if (subs) {
                for (const fn of subs){
                    fn(value, prev);
                }
            }
        };
        const initProvider = ()=>{
            if (!SWRGlobalState.has(provider)) {
                // Update the state if it's new, or if the provider has been extended.
                SWRGlobalState.set(provider, [
                    EVENT_REVALIDATORS,
                    {},
                    {},
                    {},
                    mutate,
                    setter,
                    subscribe
                ]);
                if (!IS_SERVER) {
                    // When listening to the native events for auto revalidations,
                    // we intentionally put a delay (setTimeout) here to make sure they are
                    // fired after immediate JavaScript executions, which can be
                    // React's state updates.
                    // This avoids some unnecessary revalidations such as
                    // https://github.com/vercel/swr/issues/1680.
                    const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
                    const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
                    unmount = ()=>{
                        releaseFocus && releaseFocus();
                        releaseReconnect && releaseReconnect();
                        // When un-mounting, we need to remove the cache provider from the state
                        // storage too because it's a side-effect. Otherwise, when re-mounting we
                        // will not re-register those event listeners.
                        SWRGlobalState.delete(provider);
                    };
                }
            }
        };
        initProvider();
        // This is a new provider, we need to initialize it and setup DOM events
        // listeners for `focus` and `reconnect` actions.
        // We might want to inject an extra layer on top of `provider` in the future,
        // such as key serialization, auto GC, etc.
        // For now, it's just a `Map` interface without any modifications.
        return [
            provider,
            mutate,
            initProvider,
            unmount
        ];
    }
    return [
        provider,
        SWRGlobalState.get(provider)[4]
    ];
};

// error retry
const onErrorRetry = (_, __, config, revalidate, opts)=>{
    const maxRetryCount = config.errorRetryCount;
    const currentRetryCount = opts.retryCount;
    // Exponential backoff
    const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
    if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
        return;
    }
    setTimeout(revalidate, timeout, opts);
};
const compare = (currentData, newData)=>stableHash(currentData) == stableHash(newData);
// Default cache provider
const [cache, mutate] = initCache(new Map());
// Default config
const defaultConfig = mergeObjects({
    // events
    onLoadingSlow: noop,
    onSuccess: noop,
    onError: noop,
    onErrorRetry,
    onDiscarded: noop,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 10000 : 5000,
    focusThrottleInterval: 5 * 1000,
    dedupingInterval: 2 * 1000,
    loadingTimeout: slowConnection ? 5000 : 3000,
    // providers
    compare,
    isPaused: ()=>false,
    cache,
    mutate,
    fallback: {}
}, // use web preset by default
preset);

const mergeConfigs = (a, b)=>{
    // Need to create a new object to avoid mutating the original here.
    const v = mergeObjects(a, b);
    // If two configs are provided, merge their `use` and `fallback` options.
    if (b) {
        const { use: u1, fallback: f1 } = a;
        const { use: u2, fallback: f2 } = b;
        if (u1 && u2) {
            v.use = u1.concat(u2);
        }
        if (f1 && f2) {
            v.fallback = mergeObjects(f1, f2);
        }
    }
    return v;
};

const SWRConfigContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
const SWRConfig = (props)=>{
    const { value } = props;
    const parentConfig = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SWRConfigContext);
    const isFunctionalConfig = isFunction(value);
    const config = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>isFunctionalConfig ? value(parentConfig) : value, [
        isFunctionalConfig,
        parentConfig,
        value
    ]);
    // Extend parent context values and middleware.
    const extendedConfig = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
        isFunctionalConfig,
        parentConfig,
        config
    ]);
    // Should not use the inherited provider.
    const provider = config && config.provider;
    // initialize the cache only on first access.
    const cacheContextRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(UNDEFINED);
    if (provider && !cacheContextRef.current) {
        cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
    }
    const cacheContext = cacheContextRef.current;
    // Override the cache if a new provider is given.
    if (cacheContext) {
        extendedConfig.cache = cacheContext[0];
        extendedConfig.mutate = cacheContext[1];
    }
    // Unsubscribe events.
    useIsomorphicLayoutEffect(()=>{
        if (cacheContext) {
            cacheContext[2] && cacheContext[2]();
            return cacheContext[3];
        }
    }, []);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
        value: extendedConfig
    }));
};

const INFINITE_PREFIX = '$inf$';

// @ts-expect-error
const enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
const use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
const setupDevTools = ()=>{
    if (enableDevtools) {
        // @ts-expect-error
        window.__SWR_DEVTOOLS_REACT__ = react__WEBPACK_IMPORTED_MODULE_0__;
    }
};

const normalize = (args)=>{
    return isFunction(args[1]) ? [
        args[0],
        args[1],
        args[2] || {}
    ] : [
        args[0],
        null,
        (args[1] === null ? args[2] : args[1]) || {}
    ];
};

const useSWRConfig = ()=>{
    return mergeObjects(defaultConfig, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SWRConfigContext));
};

const preload = (key_, fetcher)=>{
    const [key, fnArg] = serialize(key_);
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    // Prevent preload to be called multiple times before used.
    if (PRELOAD[key]) return PRELOAD[key];
    const req = fetcher(fnArg);
    PRELOAD[key] = req;
    return req;
};
const middleware = (useSWRNext)=>(key_, fetcher_, config)=>{
        // fetcher might be a sync function, so this should not be an async function
        const fetcher = fetcher_ && ((...args)=>{
            const [key] = serialize(key_);
            const [, , , PRELOAD] = SWRGlobalState.get(cache);
            if (key.startsWith(INFINITE_PREFIX)) {
                // we want the infinite fetcher to be called.
                // handling of the PRELOAD cache happens there.
                return fetcher_(...args);
            }
            const req = PRELOAD[key];
            if (isUndefined(req)) return fetcher_(...args);
            delete PRELOAD[key];
            return req;
        });
        return useSWRNext(key_, fetcher, config);
    };

const BUILT_IN_MIDDLEWARE = use.concat(middleware);

// It's tricky to pass generic types as parameters, so we just directly override
// the types here.
const withArgs = (hook)=>{
    return function useSWRArgs(...args) {
        // Get the default and inherited configuration.
        const fallbackConfig = useSWRConfig();
        // Normalize arguments.
        const [key, fn, _config] = normalize(args);
        // Merge configurations.
        const config = mergeConfigs(fallbackConfig, _config);
        // Apply middleware
        let next = hook;
        const { use } = config;
        const middleware = (use || []).concat(BUILT_IN_MIDDLEWARE);
        for(let i = middleware.length; i--;){
            next = middleware[i](next);
        }
        return next(key, fn || config.fetcher || null, config);
    };
};

// Add a callback function to a list of keyed callback functions and return
// the unsubscribe function.
const subscribeCallback = (key, callbacks, callback)=>{
    const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
    keyedRevalidators.push(callback);
    return ()=>{
        const index = keyedRevalidators.indexOf(callback);
        if (index >= 0) {
            // O(1): faster than splice
            keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
            keyedRevalidators.pop();
        }
    };
};

// Create a custom hook with a middleware
const withMiddleware = (useSWR, middleware)=>{
    return (...args)=>{
        const [key, fn, config] = normalize(args);
        const uses = (config.use || []).concat(middleware);
        return useSWR(key, fn, {
            ...config,
            use: uses
        });
    };
};

setupDevTools();




/***/ }),

/***/ "../../node_modules/.pnpm/swr@2.2.4_react@18.2.0/node_modules/swr/mutation/dist/index.mjs":
/*!************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/swr@2.2.4_react@18.2.0/node_modules/swr/mutation/dist/index.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useSWRMutation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swr */ "swr");
/* harmony import */ var swr_internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr/_internal */ "../../node_modules/.pnpm/swr@2.2.4_react@18.2.0/node_modules/swr/_internal/dist/index.mjs");




const startTransition = swr_internal__WEBPACK_IMPORTED_MODULE_2__.IS_REACT_LEGACY ? (cb)=>{
    cb();
} : react__WEBPACK_IMPORTED_MODULE_0__.startTransition;
/**
 * An implementation of state with dependency-tracking.
 */ const useStateWithDeps = (state)=>{
    const [, rerender] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    const unmountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const stateRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(state);
    // If a state property (data, error, or isValidating) is accessed by the render
    // function, we mark the property as a dependency so if it is updated again
    // in the future, we trigger a rerender.
    // This is also known as dependency-tracking.
    const stateDependenciesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
        data: false,
        error: false,
        isValidating: false
    });
    /**
   * @param payload To change stateRef, pass the values explicitly to setState:
   * @example
   * ```js
   * setState({
   *   isValidating: false
   *   data: newData // set data to newData
   *   error: undefined // set error to undefined
   * })
   *
   * setState({
   *   isValidating: false
   *   data: undefined // set data to undefined
   *   error: err // set error to err
   * })
   * ```
   */ const setState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((payload)=>{
        let shouldRerender = false;
        const currentState = stateRef.current;
        for(const _ in payload){
            const k = _;
            // If the property has changed, update the state and mark rerender as
            // needed.
            if (currentState[k] !== payload[k]) {
                currentState[k] = payload[k];
                // If the property is accessed by the component, a rerender should be
                // triggered.
                if (stateDependenciesRef.current[k]) {
                    shouldRerender = true;
                }
            }
        }
        if (shouldRerender && !unmountedRef.current) {
            rerender({});
        }
    }, []);
    (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(()=>{
        unmountedRef.current = false;
        return ()=>{
            unmountedRef.current = true;
        };
    });
    return [
        stateRef,
        stateDependenciesRef.current,
        setState
    ];
};

const mutation = ()=>(key, fetcher, config = {})=>{
        const { mutate } = (0,swr__WEBPACK_IMPORTED_MODULE_1__.useSWRConfig)();
        const keyRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(key);
        const fetcherRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(fetcher);
        const configRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(config);
        // Ditch all mutation results that happened earlier than this timestamp.
        const ditchMutationsUntilRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
        const [stateRef, stateDependencies, setState] = useStateWithDeps({
            data: swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED,
            error: swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED,
            isMutating: false
        });
        const currentState = stateRef.current;
        const trigger = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (arg, opts)=>{
            const [serializedKey, resolvedKey] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.serialize)(keyRef.current);
            if (!fetcherRef.current) {
                throw new Error('Can’t trigger the mutation: missing fetcher.');
            }
            if (!serializedKey) {
                throw new Error('Can’t trigger the mutation: missing key.');
            }
            // Disable cache population by default.
            const options = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.mergeObjects)((0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.mergeObjects)({
                populateCache: false,
                throwOnError: true
            }, configRef.current), opts);
            // Trigger a mutation, and also track the timestamp. Any mutation that happened
            // earlier this timestamp should be ignored.
            const mutationStartedAt = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.getTimestamp)();
            ditchMutationsUntilRef.current = mutationStartedAt;
            setState({
                isMutating: true
            });
            try {
                const data = await mutate(serializedKey, fetcherRef.current(resolvedKey, {
                    arg
                }), // We must throw the error here so we can catch and update the states.
                (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.mergeObjects)(options, {
                    throwOnError: true
                }));
                // If it's reset after the mutation, we don't broadcast any state change.
                if (ditchMutationsUntilRef.current <= mutationStartedAt) {
                    var _options_onSuccess, _options;
                    startTransition(()=>setState({
                            data,
                            isMutating: false,
                            error: undefined
                        }));
                    (_options_onSuccess = (_options = options).onSuccess) == null ? void 0 : _options_onSuccess.call(_options, data, serializedKey, options);
                }
                return data;
            } catch (error) {
                // If it's reset after the mutation, we don't broadcast any state change
                // or throw because it's discarded.
                if (ditchMutationsUntilRef.current <= mutationStartedAt) {
                    var _options_onError, _options1;
                    startTransition(()=>setState({
                            error: error,
                            isMutating: false
                        }));
                    (_options_onError = (_options1 = options).onError) == null ? void 0 : _options_onError.call(_options1, error, serializedKey, options);
                    if (options.throwOnError) {
                        throw error;
                    }
                }
            }
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []);
        const reset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
            ditchMutationsUntilRef.current = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.getTimestamp)();
            setState({
                data: swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED,
                error: swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED,
                isMutating: false
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(()=>{
            keyRef.current = key;
            fetcherRef.current = fetcher;
            configRef.current = config;
        });
        // We don't return `mutate` here as it can be pretty confusing (e.g. people
        // calling `mutate` but they actually mean `trigger`).
        // And also, `mutate` relies on the useSWR hook to exist too.
        return {
            trigger,
            reset,
            get data () {
                stateDependencies.data = true;
                return currentState.data;
            },
            get error () {
                stateDependencies.error = true;
                return currentState.error;
            },
            get isMutating () {
                stateDependencies.isMutating = true;
                return currentState.isMutating;
            }
        };
    };
/**
 * A hook to define and manually trigger remote mutations like POST, PUT, DELETE and PATCH use cases.
 *
 * @link https://swr.vercel.app/docs/mutation
 * @example
 * ```jsx
 * import useSWRMutation from 'swr/mutation'
 *
 * const {
 *   data,
 *   error,
 *   trigger,
 *   reset,
 *   isMutating
 * } = useSWRMutation(key, fetcher, options?)
 * ```
 */ const useSWRMutation = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.withMiddleware)(swr__WEBPACK_IMPORTED_MODULE_1__, mutation);




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SWRNormalizerProvider: () => (/* reexport safe */ _SWRNormalizerProvider__WEBPACK_IMPORTED_MODULE_1__.SWRNormalizerProvider),
/* harmony export */   getId: () => (/* reexport safe */ _normy_core__WEBPACK_IMPORTED_MODULE_0__.getId),
/* harmony export */   useNormalizedSWRMutation: () => (/* reexport safe */ _useNormalizedSWRMutation__WEBPACK_IMPORTED_MODULE_2__.useNormalizedSWRMutation),
/* harmony export */   useSWRNormalizer: () => (/* reexport safe */ _SWRNormalizerProvider__WEBPACK_IMPORTED_MODULE_1__.useSWRNormalizer)
/* harmony export */ });
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @normy/core */ "@normy/core");
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_normy_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SWRNormalizerProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SWRNormalizerProvider */ "./src/SWRNormalizerProvider.tsx");
/* harmony import */ var _useNormalizedSWRMutation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useNormalizedSWRMutation */ "./src/useNormalizedSWRMutation.ts");



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=normy-swr.js.map