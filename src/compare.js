import { readFileSync } from 'node:fs';
import process from 'node:process';
import * as path from 'path';
import makeObj from './parsers.js';
import doFormat from '../formatters/index.js';
import doCompare from './doCompare.js';

const makePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileFormat = (filePath) => filePath.split('.').slice(-1)[0];
const getData = (filePath) => readFileSync(makePath(filePath), 'utf-8');

const compare = (path1, path2, format) => {
  const firstObj = makeObj(getData(path1), getFileFormat(path1));
  const secondObj = makeObj(getData(path2), getFileFormat(path2));
  const diff = doCompare(firstObj, secondObj);
  return doFormat(format, diff);
};

export default compare;
