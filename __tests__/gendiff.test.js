/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const expextedResult1 = readFileSync(getFixturePath('expected_1.txt'), 'utf-8');
const expectedResult2 = readFileSync(getFixturePath('expected_2.txt'), 'utf-8');
const expectedResult3 = readFileSync(getFixturePath('expected_3.json'), 'utf-8');

test('Default', () => {
  expect(genDiff(getFixturePath('test_1.json'), getFixturePath('test_2.json')))
    .toStrictEqual(expextedResult1);
});

test('YAML', () => {
  expect(genDiff(getFixturePath('test_1.yml'), getFixturePath('test_2.yml')))
    .toStrictEqual(expextedResult1);
});

test('Plain', () => {
  expect(genDiff(getFixturePath('test_1.yml'), getFixturePath('test_2.yml'), 'plain'))
    .toStrictEqual(expectedResult2);
});

test('JSON', () => {
  expect(genDiff(getFixturePath('test_1.yml'), getFixturePath('test_2.yml'), 'json'))
    .toStrictEqual(expectedResult3);
});
