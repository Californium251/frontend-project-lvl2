import _ from 'lodash';

const doCompare = (firstFileData, secondFileData) => {
  const keys = _.union(_.keys(firstFileData), _.keys(secondFileData));
  return keys.map((key) => {
    if (!_.has(firstFileData, key)) {
      return {
        status: 'added',
        key,
        data: secondFileData[key],
      };
    }
    if (!_.has(secondFileData, key)) {
      return { status: 'removed', key, data: firstFileData[key] };
    }
    if (_.isObject(firstFileData[key]) && _.isObject(secondFileData[key])) {
      return {
        type: 'complex value',
        key,
        children: doCompare(firstFileData[key], secondFileData[key]),
      };
    }
    if (firstFileData[key] !== secondFileData[key]) {
      return {
        status: 'updated',
        key,
        firstFileData: firstFileData[key],
        secondFileData: secondFileData[key],
      };
    }
    return { status: 'unchanged', key, data: secondFileData[key] };
  }).sort((a, b) => (a.key > b.key ? 1 : -1));
};

export default doCompare;
