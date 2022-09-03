import makeObj from './parsers.js';

const makeArrOfKeys = (obj) => Object.entries(obj).map((el) => el[0]);
const formatPlainText = (inputArr) => {
  const applyAppearence = (value) => {
    if (typeof value === 'object' && !!value) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };
  const applyFormat = (arr, res, prefix) => arr.reduce((acc, el, index, a) => {
    const [status, prop, val] = el;
    if (status === 'removed') {
      const [nextStatus, nextProp, nextVal] = a[index + 1];
      if (prop === nextProp && nextStatus === 'added') {
        if (prefix === '') {
          acc.push(`Property ${prop} was updated. From ${applyAppearence(val)} to ${applyAppearence(nextVal)}`);
        } else {
          acc.push(`Property ${prefix}.${prop} was updated. From ${applyAppearence(val)} to ${applyAppearence(nextVal)}`);
        }
      } else if (prefix === '') {
        acc.push(`Property ${prop} was removed`);
      } else {
        acc.push(`Property ${prefix}.${prop} was removed`);
      }
    }
    if (status === 'added') {
      const prevProp = index > 0 ? a[index - 1][1] : null;
      if (prop !== prevProp) {
        if (prefix === '') {
          acc.push(`Property ${prop} was added with value: ${applyAppearence(val)}`);
        } else {
          acc.push(`Property ${prefix}.${prop} was added with value: ${applyAppearence(val)}`);
        }
      }
    }
    if (Array.isArray(val)) {
      if (prefix === '') {
        applyFormat(val, acc, `${prop}`);
      } else {
        applyFormat(val, acc, `${prefix}.${prop}`);
      }
    }
    return acc;
  }, res);
  return applyFormat(inputArr, [], '').join('\n');
};
const formatJSON = (inputArr) => JSON.stringify(inputArr);
const removeDublicates = (acc, el) => {
  if (!acc.includes(el)) {
    acc.push(el);
  }
  return acc;
};
const addTwoSpaces = (obj) => {
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }
  return Object.entries(obj).map((el) => {
    const arr = [];
    arr.push(`  ${el[0]}`);
    if (typeof el[1] === 'object') {
      arr.push(addTwoSpaces(el[1]));
    } else {
      arr.push(el[1]);
    }
    return arr;
  }).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};
const addDiff = (type, value, dest, element) => {
  const res = [];
  res.push(type);
  res.push(element);
  res.push(value);
  dest.push(res);
};
export const stylish = (arr) => arr.reduce((acc, el) => {
  const [status, key, val] = el;
  switch (status) {
    case 'added':
      if (Array.isArray(val)) {
        acc[`+ ${key}`] = stylish(val);
      } else {
        acc[`+ ${key}`] = addTwoSpaces(val);
      }
      break;
    case 'removed':
      if (Array.isArray(val)) {
        acc[`  ${key}`] = stylish(val);
      } else {
        acc[`- ${key}`] = addTwoSpaces(val);
      }
      break;
    case 'unchanged':
      if (Array.isArray(val)) {
        acc[`  ${key}`] = stylish(val);
      } else {
        acc[`  ${key}`] = addTwoSpaces(val);
      }
      break;
    default:
      break;
  }
  return acc;
}, {});
const compare = (path1, path2, format) => {
  const firstObj = makeObj(path1);
  const secondObj = makeObj(path2);
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
