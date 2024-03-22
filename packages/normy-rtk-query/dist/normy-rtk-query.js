(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@reduxjs/toolkit"), require("@normy/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@reduxjs/toolkit", "@normy/core"], factory);
	else if(typeof exports === 'object')
		exports["NormyRtkQuery"] = factory(require("@reduxjs/toolkit"), require("@normy/core"));
	else
		root["NormyRtkQuery"] = factory(root[undefined], root["Normy"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__reduxjs_toolkit__, __WEBPACK_EXTERNAL_MODULE__normy_core__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@normy/core":
/*!********************************************************************************************************!*\
  !*** external {"commonjs":"@normy/core","commonjs2":"@normy/core","amd":"@normy/core","root":"Normy"} ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__normy_core__;

/***/ }),

/***/ "@reduxjs/toolkit":
/*!********************************************************************************************************!*\
  !*** external {"commonjs":"@reduxjs/toolkit","commonjs2":"@reduxjs/toolkit","amd":"@reduxjs/toolkit"} ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__reduxjs_toolkit__;

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
/* harmony export */   createNormalizationMiddleware: () => (/* binding */ createNormalizationMiddleware),
/* harmony export */   getId: () => (/* reexport safe */ _normy_core__WEBPACK_IMPORTED_MODULE_1__.getId),
/* harmony export */   getNormalizer: () => (/* binding */ getNormalizer)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "@reduxjs/toolkit");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @normy/core */ "@normy/core");
/* harmony import */ var _normy_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_normy_core__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var getNormalizer = function getNormalizer(dispatch) {
  return dispatch({
    type: 'getNormalization'
  });
};
var allTypes = ['api/executeMutation/fulfilled', 'api/executeQuery/fulfilled', 'api/queries/queryResultPatched', 'api/queries/removeQueryResult', 'getNormalization'];
var isNormalizerAction = function isNormalizerAction(action) {
  return (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.isAction)(action) && allTypes.includes(action.type);
};
var createNormalizationMiddleware = function createNormalizationMiddleware(api, normalizerConfig) {
  var normalizer = (0,_normy_core__WEBPACK_IMPORTED_MODULE_1__.createNormalizer)(_extends({}, normalizerConfig, {
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
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=normy-rtk-query.js.map