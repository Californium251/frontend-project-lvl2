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

const formatPlainText = (dataToBeFormatted) => {
  const format = (arr, prefix) => arr.reduce((acc, {
    type,
    key,
    status,
    children,
    data,
    firstFileData,
    secondFileData,
  }) => {
    const objData = stringify(data);
    if (status === 'added') {
      acc.push(`Property ${prefix}${key} was added with value: ${objData}`);
    }
    if (status === 'removed') {
      acc.push(`Property ${prefix}${key} was removed`);
    }
    if (status === 'updated') {
      const firstFileDataObj = stringify(firstFileData);
      const secondFileDataObj = stringify(secondFileData);
      acc.push(`Property ${prefix}${key} was updated. From ${firstFileDataObj} to ${secondFileDataObj}`);
    }
    if (type === 'complex value') {
      const propPrefix = prefix === '' ? `${key}.` : `${prefix}${key}.`;
      acc.push(format(children, propPrefix));
    }
    return acc;
  }, []).join('\n');
  return format(dataToBeFormatted, '');
};

export default formatPlainText;
