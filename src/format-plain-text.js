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

export default formatPlainText;
