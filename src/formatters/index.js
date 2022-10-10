import formatJSON from './json.js';
import formatToPlainText from './plain.js';
import stylish from './stylish.js';

const format = (formatName, diff) => {
  if (formatName === 'plain') {
    return formatToPlainText(diff);
  }
  if (formatName === 'json') {
    return formatJSON(diff);
  }
  if (formatName === 'stylish') {
    return stylish(diff);
  }
  throw new Error('Error: unknown output format requested.');
};

export default format;
