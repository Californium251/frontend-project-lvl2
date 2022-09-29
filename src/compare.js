import _ from 'lodash';
import makeObj from './parsers.js';
import { getData, getFileFormat } from './get-data.js';
import formatPlainText from './format-plain-text.js';
import stylish from './stylish.js';
import formatJSON from './format-json.js';

const compare = (path1, path2, format) => {
  const firstObj = makeObj(getData(path1), getFileFormat(path1));
  const secondObj = makeObj(getData(path2), getFileFormat(path2));
  const doCompare = (o1, o2) => {
    const keys = _.union(_.keys(o1), _.keys(o2));
    return keys.map((el) => {
      if (!_.has(o1, el)) {
        return ['added', el, o2[el]];
      }
      if (!_.has(o2, el)) {
        return ['removed', el, o1[el]];
      }
      if (_.isObject(o1[el]) && _.isObject(o2[el])) {
        return ['complex value', el, doCompare(o1[el], o2[el])];
      }
      if (o1[el] !== o2[el]) {
        return ['updated', el, [o1[el], o2[el]]];
      }
      return ['unchanged', el, o2[el]];
    }).sort(([, key1], [, key2]) => (key2 > key1 ? -1 : 1));
  };
  if (format === 'plain') {
    return formatPlainText(doCompare(firstObj, secondObj));
  }
  if (format === 'json') {
    return formatJSON(doCompare(firstObj, secondObj));
  }
  return stylish(doCompare(firstObj, secondObj));
};

export default compare;
