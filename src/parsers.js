import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import process from 'node:process';
import * as path from 'path';

const makePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileFormat = (filePath) => filePath.split('.').slice(-1)[0];
const makeObj = (filePath) => {
  const fileFormat = getFileFormat(makePath(filePath));
  const fileContent = readFileSync(makePath(filePath), 'utf-8');
  let res;
  if (fileFormat === 'json') {
    res = JSON.parse(fileContent);
  }
  if (fileFormat === 'yml' || fileFormat === 'yaml') {
    res = yaml.load(fileContent);
  }
  return res;
};

export default makeObj;
