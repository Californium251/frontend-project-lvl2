import { readFileSync } from 'node:fs';
import process from 'node:process';
import * as path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './build-tree.js';
import stylish from './formatters/stylish.js';

const makePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileFormat = (filePath) => path.extname(filePath);
const getData = (filePath) => readFileSync(makePath(filePath), 'utf-8');

const genDiff = (path1, path2, formatName = stylish) => {
  const data1 = parse(getData(path1), getFileFormat(path1));
  const data2 = parse(getData(path2), getFileFormat(path2));
  const diff = buildTree(data1, data2);
  return format(formatName, diff);
};

export default genDiff;
