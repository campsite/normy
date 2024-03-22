"use strict";

exports.__esModule = true;
exports.useSWRNormalizer = exports.useNormalizedSWRMutation = exports.getId = exports.SWRNormalizerProvider = void 0;
var _core = require("@normy/core");
exports.getId = _core.getId;
var _SWRNormalizerProvider = require("./SWRNormalizerProvider");
exports.SWRNormalizerProvider = _SWRNormalizerProvider.SWRNormalizerProvider;
exports.useSWRNormalizer = _SWRNormalizerProvider.useSWRNormalizer;
var _useNormalizedSWRMutation = require("./useNormalizedSWRMutation");
exports.useNormalizedSWRMutation = _useNormalizedSWRMutation.useNormalizedSWRMutation;