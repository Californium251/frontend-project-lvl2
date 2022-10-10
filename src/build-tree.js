import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        data: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, data: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'complex value',
        key,
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'updated',
        key,
        data1: data1[key],
        data2: data2[key],
      };
    }
    return { type: 'unchanged', key, data: data2[key] };
  });
};

export default buildTree;
