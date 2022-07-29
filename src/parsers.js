import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';

export const getFileFormat = (filePath) => filePath.split('.').slice(-1)[0];
export const makeObj = (filePath) => {
  const fileFormat = getFileFormat(filePath);
  const fileContent = readFileSync(filePath, 'utf-8');
  let res;
  if (fileFormat === 'json') {
    res = JSON.parse(fileContent);
  }
  if (fileFormat === 'yml' || fileFormat === 'yaml') {
    res = yaml.load(fileContent);
  }
  return res;
};
