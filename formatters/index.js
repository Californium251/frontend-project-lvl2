import formatJSON from './format-json.js';
import formatPlainText from './format-plain-text.js';
import stylish from './stylish.js';

const doFormat = (format, diff) => {
  if (format === 'plain') {
    return formatPlainText(diff);
  }
  if (format === 'json') {
    return formatJSON(diff);
  }
  return stylish(diff);
};

export default doFormat;
