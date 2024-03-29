import * as yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  throw new Error('Error: either data is not provided or format is not supported.');
};

export default parse;
