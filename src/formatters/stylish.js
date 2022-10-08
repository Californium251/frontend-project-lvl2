import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const stringify = (inputData, depth) => {
  if (!_.isObject(inputData)) {
    return inputData;
  }
  const data = Object.entries(inputData).map(([key, val]) => {
    if (!_.isObject(val)) {
      return `${indent(depth)}  ${key}: ${val}`;
    }
    return `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`;
  }).join('\n');
  return `{\n${data}\n  ${indent(depth - 1)}}`;
};

const stylish = (diffData) => {
  const format = (arr, depth) => arr.map(({
    type,
    key,
    status,
    children,
    data,
    firstFileData,
    secondFileData,
  }) => {
    if (type === 'complex value') {
      return `${indent(depth)}  ${key}: {\n${format(children, depth + 1)}\n  ${indent(depth)}}`;
    }
    const objData = stringify(data, depth + 1);
    if (status === 'added') {
      return `${indent(depth)}+ ${key}: ${objData}`;
    }
    if (status === 'removed') {
      return `${indent(depth)}- ${key}: ${objData}`;
    }
    if (status === 'unchanged') {
      return `${indent(depth)}  ${key}: ${objData}`;
    }
    const firstFileDataObj = stringify(firstFileData, depth + 1);
    const secondFileDataObj = stringify(secondFileData, depth + 1);
    return `${indent(depth)}- ${key}: ${firstFileDataObj}\n${indent(depth)}+ ${key}: ${secondFileDataObj}`;
  }).join('\n');
  return `{\n${format(diffData, 1)}\n}`;
};

export default stylish;
