import deepmerge from 'deepmerge';
export var mergeData = function mergeData(oldData, newData) {
  return deepmerge(oldData, newData, {
    arrayMerge: function arrayMerge(destinationArray, sourceArray) {
      return sourceArray;
    },
    clone: false
  });
};