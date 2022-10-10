import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const stringify = (inputData, depth) => {
  if (!_.isObject(inputData)) {
    return inputData;
  }
  const data = Object.entries(inputData)
    .map(([key, val]) => `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`)
    .join('\n');
  return `{\n${data}\n  ${indent(depth - 1)}}`;
};

export default (diffData) => {
  const format = (arr, depth) => arr.map(({
    type,
    key,
    children,
    data,
    data1,
    data2,
  }) => {
    if (type === 'complex value') {
      return `${indent(depth)}  ${key}: {\n${format(children, depth + 1)}\n  ${indent(depth)}}`;
    }
    if (type === 'added') {
      return `${indent(depth)}+ ${key}: ${stringify(data, depth + 1)}`;
    }
    if (type === 'removed') {
      return `${indent(depth)}- ${key}: ${stringify(data, depth + 1)}`;
    }
    if (type === 'unchanged') {
      return `${indent(depth)}  ${key}: ${stringify(data, depth + 1)}`;
    }
    const dataObj1 = stringify(data1, depth + 1);
    const dataObj2 = stringify(data2, depth + 1);
    return `${indent(depth)}- ${key}: ${dataObj1}\n${indent(depth)}+ ${key}: ${dataObj2}`;
  }).join('\n');
  return `{\n${format(diffData, 1)}\n}`;
};
