import * as yaml from 'js-yaml';

const makeObj = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  return null;
};

export default makeObj;
