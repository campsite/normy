(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Normy"] = factory();
	else
		root["Normy"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/add-or-remove-dependencies.ts":
/*!*******************************************!*\
  !*** ./src/add-or-remove-dependencies.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addOrRemoveDependencies: () => (/* binding */ addOrRemoveDependencies)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/.pnpm/@babel+runtime@7.23.5/node_modules/@babel/runtime/helpers/esm/extends.js");

var addOrRemoveDependencies = function addOrRemoveDependencies(dependentQueries, objects, queryKey, dependenciesToAdd, dependenciesToRemove) {
  dependentQueries = (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, dependentQueries);
  objects = (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, objects);
  dependenciesToAdd.forEach(function (dependency) {
    if (!dependentQueries[dependency]) {
      dependentQueries[dependency] = [queryKey];
    }
    if (!dependentQueries[dependency].includes(queryKey)) {
      dependentQueries[dependency] = [].concat(dependentQueries[dependency], [queryKey]);
    }
  });
  dependenciesToRemove.forEach(function (dependency) {
    if (dependentQueries[dependency].length > 1) {
      dependentQueries[dependency] = dependentQueries[dependency].filter(function (v) {
        return v !== queryKey;
      });
    } else {
      delete dependentQueries[dependency];
      delete objects[dependency];
    }
  });
  return {
    dependentQueries: dependentQueries,
    objects: objects
  };
};

/***/ }),

/***/ "./src/create-normalizer.ts":
/*!**********************************!*\
  !*** ./src/create-normalizer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNormalizer: () => (/* binding */ createNormalizer)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/.pnpm/@babel+runtime@7.23.5/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _normalize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normalize */ "./src/normalize.ts");
/* harmony import */ var _denormalize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./denormalize */ "./src/denormalize.ts");
/* harmony import */ var _merge_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./merge-data */ "./src/merge-data.ts");
/* harmony import */ var _default_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-config */ "./src/default-config.ts");
/* harmony import */ var _add_or_remove_dependencies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-or-remove-dependencies */ "./src/add-or-remove-dependencies.ts");
/* harmony import */ var _get_queries_dependent_on_mutation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./get-queries-dependent-on-mutation */ "./src/get-queries-dependent-on-mutation.ts");
/* harmony import */ var _get_dependencies_diff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-dependencies-diff */ "./src/get-dependencies-diff.ts");
/* harmony import */ var _warning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./warning */ "./src/warning.ts");









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
var createNormalizer = function createNormalizer(normalizerConfig, initialNormalizedData) {
  var config = (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _default_config__WEBPACK_IMPORTED_MODULE_1__.defaultConfig, normalizerConfig);
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
    var _normalize = (0,_normalize__WEBPACK_IMPORTED_MODULE_2__.normalize)(queryData, config),
      normalizedQueryData = _normalize[0],
      normalizedObjectsData = _normalize[1],
      usedKeys = _normalize[2];
    var _getDependenciesDiff = (0,_get_dependencies_diff__WEBPACK_IMPORTED_MODULE_3__.getDependenciesDiff)(normalizedData.queries[queryKey] ? normalizedData.queries[queryKey].dependencies : [], Object.keys(normalizedObjectsData)),
      addedDependencies = _getDependenciesDiff.addedDependencies,
      removedDependencies = _getDependenciesDiff.removedDependencies;
    normalizedData = (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      queries: (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, normalizedData.queries, (_extends2 = {}, _extends2[queryKey] = {
        data: normalizedQueryData,
        usedKeys: usedKeys,
        dependencies: Object.keys(normalizedObjectsData)
      }, _extends2))
    }, (0,_add_or_remove_dependencies__WEBPACK_IMPORTED_MODULE_4__.addOrRemoveDependencies)(normalizedData.dependentQueries, (0,_merge_data__WEBPACK_IMPORTED_MODULE_5__.mergeData)(normalizedData.objects, normalizedObjectsData), queryKey, addedDependencies, removedDependencies));
    (0,_warning__WEBPACK_IMPORTED_MODULE_6__.warning)(config.devLogging, 'set query:', queryKey, '\nwith data:', queryData, '\nnormalizedData:', normalizedData);
  };
  var removeQuery = function removeQuery(queryKey) {
    setQuery(queryKey, null);
    var queries = (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, normalizedData.queries);
    delete queries[queryKey];
    delete currentDataReferences[queryKey];
    normalizedData = (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, normalizedData, {
      queries: queries
    });
    (0,_warning__WEBPACK_IMPORTED_MODULE_6__.warning)(config.devLogging, 'removed query:', queryKey, '\nnormalizedData:', normalizedData);
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
    var _normalize2 = (0,_normalize__WEBPACK_IMPORTED_MODULE_2__.normalize)(mutationData, config),
      normalizedObjectsData = _normalize2[1];
    var updatedObjects = filterMutationObjects(normalizedObjectsData, normalizedData.objects);
    var normalizedDataWithMutation = (0,_merge_data__WEBPACK_IMPORTED_MODULE_5__.mergeData)(normalizedData.objects, updatedObjects);
    var foundQueries = (0,_get_queries_dependent_on_mutation__WEBPACK_IMPORTED_MODULE_7__.getQueriesDependentOnMutation)(normalizedData.dependentQueries, Object.keys(updatedObjects));
    return foundQueries.map(function (queryKey) {
      return {
        queryKey: queryKey,
        data: (0,_denormalize__WEBPACK_IMPORTED_MODULE_8__.denormalize)(normalizedData.queries[queryKey].data, normalizedDataWithMutation, normalizedData.queries[queryKey].usedKeys)
      };
    });
  };
  var getQueryFragment = function getQueryFragment(fragment, exampleObject) {
    var usedKeys = {};
    if (exampleObject) {
      var _normalize3 = (0,_normalize__WEBPACK_IMPORTED_MODULE_2__.normalize)(exampleObject, config),
        keys = _normalize3[2];
      usedKeys = keys;
    }
    try {
      var response = (0,_denormalize__WEBPACK_IMPORTED_MODULE_8__.denormalize)(fragment, normalizedData.objects, usedKeys);
      return response;
    } catch (error) {
      if (error instanceof RangeError) {
        (0,_warning__WEBPACK_IMPORTED_MODULE_6__.warning)(true, 'Recursive dependency detected. Pass example object as second argument.');
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

/***/ }),

/***/ "./src/default-config.ts":
/*!*******************************!*\
  !*** ./src/default-config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultConfig: () => (/* binding */ defaultConfig)
/* harmony export */ });
var defaultConfig = {
  getNormalizationObjectKey: function getNormalizationObjectKey(obj) {
    return obj.id;
  },
  devLogging: false,
  structuralSharing: true
};

/***/ }),

/***/ "./src/denormalize.ts":
/*!****************************!*\
  !*** ./src/denormalize.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   denormalize: () => (/* binding */ denormalize)
/* harmony export */ });
var denormalize = function denormalize(data, normalizedData, usedKeys, path) {
  if (path === void 0) {
    path = '';
  }
  if (typeof data === 'string' && data.startsWith('@@')) {
    return denormalize(normalizedData[data], normalizedData, usedKeys, path);
  } else if (Array.isArray(data)) {
    return data.map(function (value) {
      return denormalize(value, normalizedData, usedKeys, path);
    });
  } else if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    var objectEntries = usedKeys[path] ? Object.entries(data).filter(function (_ref) {
      var k = _ref[0];
      return usedKeys[path].includes(k);
    }) : Object.entries(data);
    return objectEntries.reduce(function (prev, _ref2) {
      var k = _ref2[0],
        v = _ref2[1];
      prev[k] = denormalize(v, normalizedData, usedKeys, path + "." + k);
      return prev;
    }, {});
  }
  return data;
};

/***/ }),

/***/ "./src/get-dependencies-diff.ts":
/*!**************************************!*\
  !*** ./src/get-dependencies-diff.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDependenciesDiff: () => (/* binding */ getDependenciesDiff)
/* harmony export */ });
var getDependenciesDiff = function getDependenciesDiff(oldDependencies, newDependencies) {
  return {
    addedDependencies: newDependencies.filter(function (newDependency) {
      return !oldDependencies.includes(newDependency);
    }),
    removedDependencies: oldDependencies.filter(function (oldDependency) {
      return !newDependencies.includes(oldDependency);
    })
  };
};

/***/ }),

/***/ "./src/get-id.ts":
/*!***********************!*\
  !*** ./src/get-id.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getId: () => (/* binding */ getId)
/* harmony export */ });
var getId = function getId(id) {
  return "@@" + id;
};

/***/ }),

/***/ "./src/get-queries-dependent-on-mutation.ts":
/*!**************************************************!*\
  !*** ./src/get-queries-dependent-on-mutation.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getQueriesDependentOnMutation: () => (/* binding */ getQueriesDependentOnMutation)
/* harmony export */ });
var getQueriesDependentOnMutation = function getQueriesDependentOnMutation(dependentQueries, mutationDependencies) {
  var queries = [];
  mutationDependencies.forEach(function (dependency) {
    if (dependentQueries[dependency]) {
      queries.push.apply(queries, dependentQueries[dependency]);
    }
  });
  return Array.from(new Set(queries));
};

/***/ }),

/***/ "./src/merge-data.ts":
/*!***************************!*\
  !*** ./src/merge-data.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeData: () => (/* binding */ mergeData)
/* harmony export */ });
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ "../../node_modules/.pnpm/deepmerge@4.0.0/node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);

var mergeData = function mergeData(oldData, newData) {
  return deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(oldData, newData, {
    arrayMerge: function arrayMerge(destinationArray, sourceArray) {
      return sourceArray;
    },
    clone: false
  });
};

/***/ }),

/***/ "./src/normalize.ts":
/*!**************************!*\
  !*** ./src/normalize.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDependencies: () => (/* binding */ getDependencies),
/* harmony export */   normalize: () => (/* binding */ normalize)
/* harmony export */ });
/* harmony import */ var _default_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-config */ "./src/default-config.ts");
/* harmony import */ var _merge_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./merge-data */ "./src/merge-data.ts");


var stipFromDeps = function stipFromDeps(data, config, root) {
  if (root === void 0) {
    root = true;
  }
  if (Array.isArray(data)) {
    return data.map(function (v) {
      return stipFromDeps(v, config);
    });
  }
  if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    var objectKey = config.getNormalizationObjectKey(data);
    if (objectKey !== undefined && root) {
      return "@@" + objectKey;
    }
    return Object.entries(data).reduce(function (prev, _ref) {
      var k = _ref[0],
        v = _ref[1];
      prev[k] = stipFromDeps(v, config);
      return prev;
    }, {});
  }
  return data;
};
var getDependencies = function getDependencies(data, config, usedKeys, path) {
  if (config === void 0) {
    config = _default_config__WEBPACK_IMPORTED_MODULE_0__.defaultConfig;
  }
  if (path === void 0) {
    path = '';
  }
  usedKeys = usedKeys || {};
  if (Array.isArray(data)) {
    return [data.reduce(function (prev, current) {
      return [].concat(prev, getDependencies(current, config, usedKeys, path)[0]);
    }, []), usedKeys];
  }
  if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    if (config.getNormalizationObjectKey(data) !== undefined) {
      usedKeys[path] = Object.keys(data);
    }
    return [Object.entries(data).reduce(function (prev, _ref2) {
      var k = _ref2[0],
        v = _ref2[1];
      return [].concat(prev, getDependencies(v, config, usedKeys, path + "." + k)[0]);
    }, config.getNormalizationObjectKey(data) !== undefined ? [data] : []), usedKeys];
  }
  return [[], usedKeys];
};
var normalize = function normalize(data, config) {
  if (config === void 0) {
    config = _default_config__WEBPACK_IMPORTED_MODULE_0__.defaultConfig;
  }
  var _getDependencies = getDependencies(data, config),
    dependencies = _getDependencies[0],
    usedKeys = _getDependencies[1];
  return [stipFromDeps(data, config, true), dependencies.reduce(function (prev, v) {
    var key = config.getNormalizationObjectKey(v);
    prev["@@" + key] = prev["@@" + key] ? (0,_merge_data__WEBPACK_IMPORTED_MODULE_1__.mergeData)(prev["@@" + key], stipFromDeps(v, config, false)) : stipFromDeps(v, config, false);
    return prev;
  }, {}), usedKeys];
};

/***/ }),

/***/ "./src/warning.ts":
/*!************************!*\
  !*** ./src/warning.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   warning: () => (/* binding */ warning)
/* harmony export */ });
var isProduction = "development" === 'production';
var warning = function warning(show) {
  if (!isProduction) {
    if (show) {
      var _console;
      for (var _len = arguments.length, messages = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        messages[_key - 1] = arguments[_key];
      }
      (_console = console).log.apply(_console, messages);
    }
  }
};

/***/ }),

/***/ "../../node_modules/.pnpm/deepmerge@4.0.0/node_modules/deepmerge/dist/cjs.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/.pnpm/deepmerge@4.0.0/node_modules/deepmerge/dist/cjs.js ***!
  \***********************************************************************************/
/***/ ((module) => {



var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (!options.isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		} else {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "../../node_modules/.pnpm/@babel+runtime@7.23.5/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!*********************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@babel+runtime@7.23.5/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

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
/* harmony export */   createNormalizer: () => (/* reexport safe */ _create_normalizer__WEBPACK_IMPORTED_MODULE_0__.createNormalizer),
/* harmony export */   getId: () => (/* reexport safe */ _get_id__WEBPACK_IMPORTED_MODULE_1__.getId)
/* harmony export */ });
/* harmony import */ var _create_normalizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-normalizer */ "./src/create-normalizer.ts");
/* harmony import */ var _get_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-id */ "./src/get-id.ts");


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=normy.js.map