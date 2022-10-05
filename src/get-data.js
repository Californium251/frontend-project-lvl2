import { readFileSync } from 'node:fs';
import process from 'node:process';
import * as path from 'path';

const makePath = (filePath) => path.resolve(process.cwd(), filePath);
export const getFileFormat = (filePath) => filePath.split('.').slice(-1)[0];
export const getData = (filePath) => readFileSync(makePath(filePath), 'utf-8');
