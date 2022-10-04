import _ from 'lodash';

const stringify = (obj, indent) => {
  const data = Object.entries(obj).map(([key, val]) => {
    if (!_.isObject(val)) {
      return `${indent}    ${key}: ${val}`;
    }
    return `${indent}    ${key}: ${stringify(val, `${indent}    `)}`;
  }).join('\n');
  return `{\n${data}\n${indent}}`;
};

const stylish = (diffData) => {
  const format = (arr, indent) => arr.reduce((acc, {
    type,
    key,
    status,
    children,
    data,
    firstFileData,
    secondFileData,
  }) => {
    if (type === 'complex value') {
      acc.push(`${indent}    ${key}: {\n${format(children, `${indent}    `)}\n${indent}    }`);
      return acc;
    }
    const objData = _.isObject(data) ? stringify(data, `${indent}    `) : data;
    if (status === 'added') {
      acc.push(`${indent}  + ${key}: ${objData}`);
      return acc;
    }
    if (status === 'removed') {
      acc.push(`${indent}  - ${key}: ${objData}`);
      return acc;
    }
    if (status === 'unchanged') {
      acc.push(`${indent}    ${key}: ${objData}`);
      return acc;
    }
    const firstFileDataObj = _.isObject(firstFileData) ? stringify(firstFileData, `${indent}    `) : firstFileData;
    const secondFileDataObj = _.isObject(secondFileData) ? stringify(secondFileData, `${indent}    `) : secondFileData;
    acc.push(`${indent}  - ${key}: ${firstFileDataObj}`);
    acc.push(`${indent}  + ${key}: ${secondFileDataObj}`);
    return acc;
  }, []).join('\n');
  return `{\n${format(diffData, '')}\n}`;
};

export default stylish;
