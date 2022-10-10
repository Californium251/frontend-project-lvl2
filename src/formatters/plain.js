import _ from 'lodash';

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

export default (diffTree) => {
  const format = (arr, prefix) => arr.map(({
    type,
    key,
    children,
    data,
    data1,
    data2,
  }) => {
    if (type === 'added') {
      return `Property '${prefix}${key}' was added with value: ${stringify(data)}`;
    }
    if (type === 'removed') {
      return `Property '${prefix}${key}' was removed`;
    }
    if (type === 'updated') {
      const dataObj1 = stringify(data1);
      const dataObj2 = stringify(data2);
      return `Property '${prefix}${key}' was updated. From ${dataObj1} to ${dataObj2}`;
    }
    if (type === 'complex value') {
      const propPrefix = prefix === '' ? `${key}.` : `${prefix}${key}.`;
      return format(children, propPrefix);
    }
    return null;
  }).filter((el) => !!el).join('\n');
  return format(diffTree, '');
};
