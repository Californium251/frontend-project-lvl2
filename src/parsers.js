import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';

export const getFileFormat = (filePath) => filePath.split('.').slice(-1)[0];
export const makeObj = (filePath) => {
  const fileFormat = getFileFormat(filePath);
  const fileContent = readFileSync(filePath, 'utf-8');
  if (fileFormat === 'json') {
    return JSON.parse(fileContent);
  }
  if (fileFormat === 'yml' || fileFormat === 'yaml') {
    return yaml.load(fileContent);
  }
};
