(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@normy/core"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["@normy/core", "react"], factory);
	else if(typeof exports === 'object')
		exports["NormyReactQuery"] = factory(require("@normy/core"), require("react"));
	else
		root["NormyReactQuery"] = factory(root["Normy"], root["React"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__normy_core__, __WEBPACK_EXTERNAL_MODULE_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/QueryNormalizerProvider.tsx":
/*!*****************************************!*\
  !*** ./src/QueryNormalizerProvider.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryNormalizerProvider: () => (/* binding */ QueryNormalizerProvider),
/* harmony export */   useQueryNormalizer: () => (/* binding */ useQueryNormalizer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_query_normalizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-query-normalizer */ "./src/create-query-normalizer.ts");


var QueryNormalizerContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
var QueryNormalizerProvider = function QueryNormalizerProvider(_ref) {
  var queryClient = _ref.queryClient,
    normalizerConfig = _ref.normalizerConfig,
    children = _ref.children;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(function () {
      return (0,_create_query_normalizer__WEBPACK_IMPORTED_MODULE_1__.createQueryNormalizer)(queryClient, normalizerConfig);
    }),
    queryNormalizer = _React$useState[0];
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    queryNormalizer.subscribe();
    return function () {
      queryNormalizer.unsubscribe();
      queryNormalizer.clear();
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(QueryNormalizerContext.Provider, {
    value: queryNormalizer
  }, children);
};
var useQueryNormalizer = function useQueryNormalizer() {
  var queryNormalizer = react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryNormalizerContext);
  if (!queryNormalizer) {
    throw new Error('No QueryNormalizer set, use QueryNormalizerProvider to set one');
  }
  return queryNormalizer;
};

/***/ }),

/***/ "./src/create-query-normalizer.ts":
/*!****************************************!*\
  !*** ./src/create-query-normalizer.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createQueryNormalizer: () => (/* binding */ createQueryNormalizer)
/* harmony export */ });
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @normy/core */ "@normy/core");
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_normy_core__WEBPACK_IMPORTED_MODULE_0__);

var shouldBeNormalized = function shouldBeNormalized(globalNormalize, localNormalize) {
  if (localNormalize === undefined) {
    return globalNormalize;
  }
  return localNormalize;
};
var createQueryNormalizer = function createQueryNormalizer(queryClient, normalizerConfig) {
  var _normalizerConfig$nor;
  if (normalizerConfig === void 0) {
    normalizerConfig = {};
  }
  var normalize = (_normalizerConfig$nor = normalizerConfig.normalize) != null ? _normalizerConfig$nor : true;
  var normalizer = (0,_normy_core__WEBPACK_IMPORTED_MODULE_0__.createNormalizer)(normalizerConfig);
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
/* harmony export */   QueryNormalizerProvider: () => (/* reexport safe */ _QueryNormalizerProvider__WEBPACK_IMPORTED_MODULE_2__.QueryNormalizerProvider),
/* harmony export */   createQueryNormalizer: () => (/* reexport safe */ _create_query_normalizer__WEBPACK_IMPORTED_MODULE_1__.createQueryNormalizer),
/* harmony export */   getId: () => (/* reexport safe */ _normy_core__WEBPACK_IMPORTED_MODULE_0__.getId),
/* harmony export */   useQueryNormalizer: () => (/* reexport safe */ _QueryNormalizerProvider__WEBPACK_IMPORTED_MODULE_2__.useQueryNormalizer)
/* harmony export */ });
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @normy/core */ "@normy/core");
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_normy_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_query_normalizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-query-normalizer */ "./src/create-query-normalizer.ts");
/* harmony import */ var _QueryNormalizerProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryNormalizerProvider */ "./src/QueryNormalizerProvider.tsx");



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=normy-react-query.js.map