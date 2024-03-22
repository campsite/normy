"use strict";

var _getDependenciesDiff = require("./get-dependencies-diff");
describe('getDependenciesDiff', function () {
  it('returns no diff for the same dependencies', function () {
    expect((0, _getDependenciesDiff.getDependenciesDiff)(['x', 'y'], ['x', 'y'])).toEqual({
      addedDependencies: [],
      removedDependencies: []
    });
  });
  it('calculates removed dependencies correctly', function () {
    expect((0, _getDependenciesDiff.getDependenciesDiff)(['x', 'y', 'z'], ['x'])).toEqual({
      addedDependencies: [],
      removedDependencies: ['y', 'z']
    });
  });
  it('calculates added dependencies correctly', function () {
    expect((0, _getDependenciesDiff.getDependenciesDiff)(['x'], ['x', 'y', 'z'])).toEqual({
      addedDependencies: ['y', 'z'],
      removedDependencies: []
    });
  });
  it('calculates added and removed dependencies at the same time', function () {
    expect((0, _getDependenciesDiff.getDependenciesDiff)(['x', 'y'], ['x', 'z'])).toEqual({
      addedDependencies: ['z'],
      removedDependencies: ['y']
    });
  });
});