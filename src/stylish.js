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
const stylish = (arr) => arr.reduce((acc, el) => {
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

export default stylish;
