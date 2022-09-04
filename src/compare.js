import makeObj from './parsers.js';
import { getData, getFileFormat } from './get-data.js';
import formatPlainText from './format-plain-text.js';
import stylish from './stylish.js';
import formatJSON from './format-json.js';

const makeArrOfKeys = (obj) => Object.entries(obj).map((el) => el[0]);
const removeDublicates = (acc, el) => {
  if (!acc.includes(el)) {
    acc.push(el);
  }
  return acc;
};
const addDiff = (type, value, dest, element) => {
  const res = [];
  res.push(type);
  res.push(element);
  res.push(value);
  dest.push(res);
};
const compare = (path1, path2, format) => {
  const firstObj = makeObj(getData(path1), getFileFormat(path1));
  const secondObj = makeObj(getData(path2), getFileFormat(path2));
  const doCompare = (o1, o2) => {
    const getDiff = (acc, el) => {
      if (Object.hasOwn(o1, el)) {
        if (Object.hasOwn(o2, el)) {
          if (typeof o1[el] === 'object') {
            if (typeof o2[el] === 'object') {
              addDiff('unchanged', doCompare(o1[el], o2[el]), acc, el);
            } else {
              addDiff('removed', o1[el], acc, el);
              addDiff('added', o2[el], acc, el);
            }
          } else if (o1[el] === o2[el]) {
            addDiff('unchanged', o1[el], acc, el);
          } else {
            addDiff('removed', o1[el], acc, el);
            addDiff('added', o2[el], acc, el);
          }
        } else if (typeof o1[el] === 'object') {
          addDiff('removed', o1[el], acc, el);
        } else {
          addDiff('removed', o1[el], acc, el);
        }
      } else if (typeof o2[el] === 'object') {
        addDiff('added', o2[el], acc, el);
      } else {
        addDiff('added', o2[el], acc, el);
      }
      return acc;
    };
    return makeArrOfKeys(o1)
      .concat(makeArrOfKeys(o2))
      .reduce(removeDublicates, [])
      .sort((a, b) => (a > b ? 1 : -1))
      .reduce(getDiff, []);
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
