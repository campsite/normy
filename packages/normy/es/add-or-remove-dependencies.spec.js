import { addOrRemoveDependencies } from './add-or-remove-dependencies';
describe('addOrRemoveDependencies', function () {
  it('correctly adds new dependency to a new object', function () {
    expect(addOrRemoveDependencies({}, {}, 'queryKey', ['x'], [])).toEqual({
      dependentQueries: {
        x: ['queryKey']
      },
      objects: {}
    });
  });
  it('correctly adds new dependency to an existing object', function () {
    expect(addOrRemoveDependencies({
      x: ['queryKey']
    }, {}, 'queryKey2', ['x'], [])).toEqual({
      dependentQueries: {
        x: ['queryKey', 'queryKey2']
      },
      objects: {}
    });
  });
  it('correctly removes a dependency', function () {
    expect(addOrRemoveDependencies({
      x: ['queryKey', 'queryKey2']
    }, {
      x: {
        id: 1
      }
    }, 'queryKey', [], ['x'])).toEqual({
      dependentQueries: {
        x: ['queryKey2']
      },
      objects: {
        x: {
          id: 1
        }
      }
    });
  });
  it('cleans after removing the last dependency of object', function () {
    expect(addOrRemoveDependencies({
      x: ['queryKey']
    }, {
      x: {
        id: 1
      }
    }, 'queryKey', [], ['x'])).toEqual({
      dependentQueries: {},
      objects: {}
    });
  });
});