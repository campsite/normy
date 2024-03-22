"use strict";

exports.__esModule = true;
exports.useQueryNormalizer = exports.getId = exports.createQueryNormalizer = exports.QueryNormalizerProvider = void 0;
var _core = require("@normy/core");
exports.getId = _core.getId;
var _createQueryNormalizer = require("./create-query-normalizer");
exports.createQueryNormalizer = _createQueryNormalizer.createQueryNormalizer;
var _QueryNormalizerProvider = require("./QueryNormalizerProvider");
exports.QueryNormalizerProvider = _QueryNormalizerProvider.QueryNormalizerProvider;
exports.useQueryNormalizer = _QueryNormalizerProvider.useQueryNormalizer;