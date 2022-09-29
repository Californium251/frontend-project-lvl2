import _ from 'lodash';

const createStr = (spaces, status, key, value) => {
  const addIndent = (indent, val) => `\n${indent}${val}`;
  const createPairKeyVal = (k, val) => `${k}: ${val}`;
  const createUnchangedStr = (indent, k, val) => addIndent(indent, `  ${createPairKeyVal(k, val)}`);
  const createAddedStr = (indent, k, val) => addIndent(indent, `+ ${createPairKeyVal(k, val)}`);
  const createRemovedStr = (indent, k, val) => addIndent(indent, `- ${createPairKeyVal(k, val)}`);
  const createUpdatedStr = (indent, k, vals) => `${createRemovedStr(indent, k, vals[0])}${createAddedStr(indent, k, vals[1])}`;
  if (status === 'unchanged') {
    return createUnchangedStr(spaces, key, value);
  }
  if (status === 'added') {
    return createAddedStr(spaces, key, value);
  }
  if (status === 'removed') {
    return createRemovedStr(spaces, key, value, spaces);
  }
  return createUpdatedStr(spaces, key, (value));
};

const stylish = (arr) => {
  const addOpeningBracket = (key, indent) => `\n${indent}${key}: {`;
  const addClosingBracket = (indent) => `\n${indent}}`;
  const createTree = (data, indent) => data
    .reduce((acc, [status, key, values]) => {
      if (status === 'complex value') {
        acc.push(addOpeningBracket(key, `${indent}  `));
        acc.push(createTree(values, `${indent}    `));
        acc.push(addClosingBracket(`${indent}  `));
        return acc;
      }
      acc.push(createStr(indent, status, key, values));
      return acc;
    }, []).join('');
  return `{\n${createTree(arr, '  ')}\n}`;
};

export default stylish;
