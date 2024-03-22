import { createNormalizer } from './create-normalizer';
import { getId } from './get-id';
describe('createNormalizer', function () {
  describe('setQuery', function () {
    it('sets initial query data', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
    });
    it('properly extends existing objects', function () {
      var normalizer = createNormalizer({}, {
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
      normalizer.setQuery('query2', {
        id: '1',
        name: 'name',
        surname: 'surname'
      });
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          },
          query2: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name', 'surname']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name',
            surname: 'surname'
          }
        },
        dependentQueries: {
          '@@1': ['query', 'query2']
        }
      });
    });
    it('works with nested objects', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        topLevel: {
          id: '1',
          name: 'name',
          nested: {
            id: '2',
            name: 'name'
          }
        }
      });
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: {
              topLevel: '@@1'
            },
            dependencies: ['@@1', '@@2'],
            usedKeys: {
              '.topLevel': ['id', 'name', 'nested'],
              '.topLevel.nested': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name',
            nested: '@@2'
          },
          '@@2': {
            id: '2',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query'],
          '@@2': ['query']
        }
      });
    });
    it('works with arrays', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', [{
        id: '1',
        name: 'name'
      }, {
        id: '2',
        name: 'name 2'
      }]);
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: ['@@1', '@@2'],
            dependencies: ['@@1', '@@2'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          },
          '@@2': {
            id: '2',
            name: 'name 2'
          }
        },
        dependentQueries: {
          '@@1': ['query'],
          '@@2': ['query']
        }
      });
    });
    it('properly extends arrays', function () {
      var normalizer = createNormalizer({}, {
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1', '@@2', '@@3'],
            usedKeys: {
              '': ['id', 'list'],
              '.list': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            list: ['@@2', '@@3']
          },
          '@@2': {
            id: '2',
            name: 'name 2'
          },
          '@@3': {
            id: '3',
            name: 'name 3'
          }
        },
        dependentQueries: {
          '@@1': ['query'],
          '@@2': ['query'],
          '@@3': ['query']
        }
      });
      normalizer.setQuery('query', {
        id: '1',
        list: [{
          id: '2',
          name: 'name 2'
        }, {
          id: '3',
          name: 'name 3'
        }, {
          id: '4',
          name: 'name 4'
        }]
      });
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1', '@@2', '@@3', '@@4'],
            usedKeys: {
              '': ['id', 'list'],
              '.list': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            list: ['@@2', '@@3', '@@4']
          },
          '@@2': {
            id: '2',
            name: 'name 2'
          },
          '@@3': {
            id: '3',
            name: 'name 3'
          },
          '@@4': {
            id: '4',
            name: 'name 4'
          }
        },
        dependentQueries: {
          '@@1': ['query'],
          '@@2': ['query'],
          '@@3': ['query'],
          '@@4': ['query']
        }
      });
    });
    it('works without objects to normalize', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        name: 'name'
      });
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: {
              name: 'name'
            },
            dependencies: [],
            usedKeys: {}
          }
        },
        objects: {},
        dependentQueries: {}
      });
    });
    it('allows to override normalization key', function () {
      var normalizer = createNormalizer({
        getNormalizationObjectKey: function getNormalizationObjectKey(obj) {
          return obj._id;
        }
      });
      normalizer.setQuery('query', {
        _id: '1',
        name: 'name',
        notNormalizableObj: {
          id: '2'
        }
      });
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['_id', 'name', 'notNormalizableObj']
            }
          }
        },
        objects: {
          '@@1': {
            _id: '1',
            name: 'name',
            notNormalizableObj: {
              id: '2'
            }
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
    });
    it('allows to disable normalization per object', function () {
      var normalizer = createNormalizer({
        getNormalizationObjectKey: function getNormalizationObjectKey(obj) {
          return obj._id;
        }
      });
      normalizer.setQuery('query', {
        _id: '1',
        name: 'name',
        notNormalizableObj: {
          id: '2'
        }
      });
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['_id', 'name', 'notNormalizableObj']
            }
          }
        },
        objects: {
          '@@1': {
            _id: '1',
            name: 'name',
            notNormalizableObj: {
              id: '2'
            }
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
    });
    it('does not update normalized data when using structural sharing and data is the same', function () {
      var normalizer = createNormalizer();
      var data = {
        id: '1',
        name: 'name'
      };
      normalizer.setQuery('query', data);
      var normalizedData = normalizer.getNormalizedData();
      normalizer.setQuery('query', data);
      expect(normalizedData).toBe(normalizer.getNormalizedData());
    });
    it('updates normalized data when using structural sharing but data is not the same', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      var normalizedData = normalizer.getNormalizedData();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      expect(normalizedData).not.toBe(normalizer.getNormalizedData());
    });
    it('updates normalized data when data is the same but without using structural sharing', function () {
      var normalizer = createNormalizer({
        structuralSharing: false
      });
      var data = {
        id: '1',
        name: 'name'
      };
      normalizer.setQuery('query', data);
      var normalizedData = normalizer.getNormalizedData();
      normalizer.setQuery('query', data);
      expect(normalizedData).not.toBe(normalizer.getNormalizedData());
    });
  });
  describe('removeQuery', function () {
    it('does nothing if a query to remove does not exist', function () {
      var state = {
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      };
      var normalizer = createNormalizer({}, state);
      normalizer.removeQuery('query2');
      expect(normalizer.getNormalizedData()).toEqual(state);
    });
    it('removes a query if it exists', function () {
      var normalizer = createNormalizer({}, {
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
      normalizer.removeQuery('query');
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {},
        objects: {},
        dependentQueries: {}
      });
    });
    it('removes a query if it exists without affecting other queries', function () {
      var normalizer = createNormalizer({}, {
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          },
          query2: {
            data: '@@2',
            dependencies: ['@@2'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          },
          '@@2': {
            id: '2',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query'],
          '@@2': ['query2']
        }
      });
      normalizer.removeQuery('query2');
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
    });
  });
  describe('getQueriesToUpdate', function () {
    it('returns empty array when no queries to update', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      expect(normalizer.getQueriesToUpdate({
        id: '2',
        name: 'name 2'
      })).toEqual([]);
    });
    it('returns query to update when found matching object', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        surname: 'surname'
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        name: 'name 2'
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          name: 'name 2',
          surname: 'surname'
        }
      }]);
    });
    it('can find multiple queries, even with nested dependencies', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        surname: 'surname'
      });
      normalizer.setQuery('query2', {
        id: '2',
        name: 'name',
        nested: {
          id: '1',
          name: 'name'
        }
      });
      normalizer.setQuery('query3', {
        id: '3',
        name: 'name'
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        name: 'name 2'
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          name: 'name 2',
          surname: 'surname'
        }
      }, {
        queryKey: 'query2',
        data: {
          id: '2',
          name: 'name',
          nested: {
            id: '1',
            name: 'name 2'
          }
        }
      }]);
    });
    it('can find dependencies in arrays', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', [{
        id: '1',
        name: 'name'
      }, {
        id: '2',
        name: 'name 2'
      }]);
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        name: 'name updated'
      })).toEqual([{
        queryKey: 'query',
        data: [{
          id: '1',
          name: 'name updated'
        }, {
          id: '2',
          name: 'name 2'
        }]
      }]);
    });
    it('works with one to one dependencies', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        self: {
          id: '1',
          name: 'name',
          surname: 'surname'
        }
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        name: 'name updated'
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          name: 'name updated',
          self: {
            id: '1',
            name: 'name updated',
            surname: 'surname'
          }
        }
      }]);
    });
    it('works with null into object updates', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        nested: null
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        nested: {
          id: '2',
          surname: 'surname'
        }
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          name: 'name',
          nested: {
            id: '2',
            surname: 'surname'
          }
        }
      }]);
    });
    it('works with objects into null updates', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        nested: {
          id: '2',
          surname: 'surname'
        }
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        nested: null
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          name: 'name',
          nested: null
        }
      }]);
    });
    it('does not return query if object did not change', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        surname: 'surname'
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        name: 'name'
      })).toEqual([]);
    });
    it('does not return query if mutation object is a superset', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        name: 'name',
        extraProperty: 'value'
      })).toEqual([]);
    });
    it('does not return query if both mutation data and query data have empty array', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        list: []
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        list: []
      })).toEqual([]);
    });
    it('returns query if mutation array is not empty and query array is empty', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        list: []
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        list: [1]
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          list: [1]
        }
      }]);
    });
    it('returns query if mutation array is empty and query array is not empty', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        list: [1]
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        list: []
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          list: []
        }
      }]);
    });
    it('returns query if mutation array and query array item is different', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        list: [1]
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        list: [2]
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          list: [2]
        }
      }]);
    });
    it('works with equal date objects', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        date: new Date(1)
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        date: new Date(1)
      })).toEqual([]);
    });
    it('works with different date objects', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        date: new Date(1)
      });
      expect(normalizer.getQueriesToUpdate({
        id: '1',
        date: new Date(2)
      })).toEqual([{
        queryKey: 'query',
        data: {
          id: '1',
          date: new Date(2)
        }
      }]);
    });
  });
  describe('clearNormalizedData', function () {
    it('clears normalized data', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      normalizer.clearNormalizedData();
      expect(normalizer.getNormalizedData()).toEqual({
        queries: {},
        objects: {},
        dependentQueries: {}
      });
    });
  });
  describe('getObjectById', function () {
    it('gets object without dependencies', function () {
      var normalizer = createNormalizer({}, {
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
      expect(normalizer.getObjectById('1')).toEqual({
        id: '1',
        name: 'name'
      });
    });
    it('returns undefined if object not found', function () {
      var normalizer = createNormalizer({}, {
        queries: {
          query: {
            data: '@@1',
            dependencies: ['@@1'],
            usedKeys: {
              '': ['id', 'name']
            }
          }
        },
        objects: {
          '@@1': {
            id: '1',
            name: 'name'
          }
        },
        dependentQueries: {
          '@@1': ['query']
        }
      });
      expect(normalizer.getObjectById('2')).toBe(undefined);
    });
    it('gets object with dependencies', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        nested: {
          id: '2',
          key: 'value'
        }
      });
      expect(normalizer.getObjectById('1')).toEqual({
        id: '1',
        name: 'name',
        nested: {
          id: '2',
          key: 'value'
        }
      });
    });
    it('fails for self dependencies', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        self: {
          id: '1',
          name: 'name',
          surname: 'surname'
        }
      });
      expect(normalizer.getObjectById('1')).toBe(undefined);
    });
    it('allows defining data structure', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        nested: {
          id: '2',
          key: 'value'
        }
      });
      expect(normalizer.getObjectById('1', {
        id: '',
        name: ''
      })).toEqual({
        id: '1',
        name: 'name'
      });
    });
    it('works with self dependencies with defined data structure', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        self: {
          id: '1',
          name: 'name',
          surname: 'surname'
        }
      });
      expect(normalizer.getObjectById('1', {
        id: '',
        self: {
          id: '',
          name: ''
        }
      })).toEqual({
        id: '1',
        self: {
          id: '1',
          name: 'name'
        }
      });
    });
  });
  describe('getQueryFragment', function () {
    it('gets fragment with two objects', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      normalizer.setQuery('query2', {
        id: '2',
        name: 'name2'
      });
      expect(normalizer.getQueryFragment([getId('1'), getId('2')])).toEqual([{
        id: '1',
        name: 'name'
      }, {
        id: '2',
        name: 'name2'
      }]);
    });
    it('gets undefined for a missing object', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name'
      });
      expect(normalizer.getQueryFragment([getId('1'), getId('2')])).toEqual([{
        id: '1',
        name: 'name'
      }, undefined]);
    });
    it('allows defining data structure', function () {
      var normalizer = createNormalizer();
      normalizer.setQuery('query', {
        id: '1',
        name: 'name',
        surname: 'surname'
      });
      expect(normalizer.getQueryFragment([getId('1'), getId('2')], [{
        id: '',
        name: ''
      }])).toEqual([{
        id: '1',
        name: 'name'
      }, undefined]);
    });
  });
});