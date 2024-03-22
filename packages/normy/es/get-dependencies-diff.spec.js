import { getDependenciesDiff } from './get-dependencies-diff';
describe('getDependenciesDiff', function () {
  it('returns no diff for the same dependencies', function () {
    expect(getDependenciesDiff(['x', 'y'], ['x', 'y'])).toEqual({
      addedDependencies: [],
      removedDependencies: []
    });
  });
  it('calculates removed dependencies correctly', function () {
    expect(getDependenciesDiff(['x', 'y', 'z'], ['x'])).toEqual({
      addedDependencies: [],
      removedDependencies: ['y', 'z']
    });
  });
  it('calculates added dependencies correctly', function () {
    expect(getDependenciesDiff(['x'], ['x', 'y', 'z'])).toEqual({
      addedDependencies: ['y', 'z'],
      removedDependencies: []
    });
  });
  it('calculates added and removed dependencies at the same time', function () {
    expect(getDependenciesDiff(['x', 'y'], ['x', 'z'])).toEqual({
      addedDependencies: ['z'],
      removedDependencies: ['y']
    });
  });
});