import plain from './plain.js';
import stylish from './stylish.js';

const format = (formatName, diff) => {
  if (formatName === 'plain') {
    return plain(diff);
  }
  if (formatName === 'json') {
    return JSON.stringify(diff);
  }
  if (formatName === 'stylish') {
    return stylish(diff);
  }
  throw new Error('Error: unknown output format requested.');
};

export default format;
