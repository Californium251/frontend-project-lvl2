import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const stringify = (obj, depth) => {
  const data = Object.entries(obj).map(([key, val]) => {
    if (!_.isObject(val)) {
      return `${indent(depth)}  ${key}: ${val}`;
    }
    return `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`;
  }).join('\n');
  return `{\n${data}\n  ${indent(depth - 1)}}`;
};

const stylish = (diffData) => {
  const format = (arr, depth) => arr.reduce((acc, {
    type,
    key,
    status,
    children,
    data,
    firstFileData,
    secondFileData,
  }) => {
    if (type === 'complex value') {
      acc.push(`${indent(depth)}  ${key}: {\n${format(children, depth + 1)}\n  ${indent(depth)}}`);
      return acc;
    }
    const objData = _.isObject(data) ? stringify(data, depth + 1) : data;
    if (status === 'added') {
      acc.push(`${indent(depth)}+ ${key}: ${objData}`);
      return acc;
    }
    if (status === 'removed') {
      acc.push(`${indent(depth)}- ${key}: ${objData}`);
      return acc;
    }
    if (status === 'unchanged') {
      acc.push(`${indent(depth)}  ${key}: ${objData}`);
      return acc;
    }
    const firstFileDataObj = (
      _.isObject(firstFileData) ? stringify(firstFileData, depth + 1) : firstFileData
    );
    const secondFileDataObj = (
      _.isObject(secondFileData) ? stringify(secondFileData, depth + 1) : secondFileData
    );
    acc.push(`${indent(depth)}- ${key}: ${firstFileDataObj}`);
    acc.push(`${indent(depth)}+ ${key}: ${secondFileDataObj}`);
    return acc;
  }, []).join('\n');
  return `{\n${format(diffData, 1)}\n}`;
};

export default stylish;
