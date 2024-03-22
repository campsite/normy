import { getQueriesDependentOnMutation } from './get-queries-dependent-on-mutation';
describe('getQueriesDependentOnMutation', function () {
  it('returns empty array when no mutation dependencies passed', function () {
    expect(getQueriesDependentOnMutation({
      x: ['query']
    }, [])).toEqual([]);
  });
  it('returns empty array when no dependencies found', function () {
    expect(getQueriesDependentOnMutation({
      x: ['query']
    }, ['y'])).toEqual([]);
  });
  it('returns array with found query', function () {
    expect(getQueriesDependentOnMutation({
      x: ['query']
    }, ['x'])).toEqual(['query']);
  });
  it('does not duplicate queries', function () {
    expect(getQueriesDependentOnMutation({
      x: ['query'],
      y: ['query']
    }, ['x', 'y'])).toEqual(['query']);
  });
  it('can find multiple queries from one object', function () {
    expect(getQueriesDependentOnMutation({
      x: ['query', 'query2']
    }, ['x'])).toEqual(['query', 'query2']);
  });
});