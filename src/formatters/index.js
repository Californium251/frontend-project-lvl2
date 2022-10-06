import formatJSON from './json.js';
import formatPlainText from './plain.js';
import stylish from './stylish.js';

const format = (formatName, diff) => {
  if (formatName === 'plain') {
    return formatPlainText(diff);
  }
  if (formatName === 'json') {
    return formatJSON(diff);
  }
  return stylish(diff);
};

export default format;
