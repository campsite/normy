"use strict";

var _getQueriesDependentOnMutation = require("./get-queries-dependent-on-mutation");
describe('getQueriesDependentOnMutation', function () {
  it('returns empty array when no mutation dependencies passed', function () {
    expect((0, _getQueriesDependentOnMutation.getQueriesDependentOnMutation)({
      x: ['query']
    }, [])).toEqual([]);
  });
  it('returns empty array when no dependencies found', function () {
    expect((0, _getQueriesDependentOnMutation.getQueriesDependentOnMutation)({
      x: ['query']
    }, ['y'])).toEqual([]);
  });
  it('returns array with found query', function () {
    expect((0, _getQueriesDependentOnMutation.getQueriesDependentOnMutation)({
      x: ['query']
    }, ['x'])).toEqual(['query']);
  });
  it('does not duplicate queries', function () {
    expect((0, _getQueriesDependentOnMutation.getQueriesDependentOnMutation)({
      x: ['query'],
      y: ['query']
    }, ['x', 'y'])).toEqual(['query']);
  });
  it('can find multiple queries from one object', function () {
    expect((0, _getQueriesDependentOnMutation.getQueriesDependentOnMutation)({
      x: ['query', 'query2']
    }, ['x'])).toEqual(['query', 'query2']);
  });
});