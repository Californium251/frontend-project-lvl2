/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import genDiff from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('test files from the task on Hexlet', () => {
  expect(genDiff(getFixturePath('test_file_1.1.json'), getFixturePath('test_file_1.2.json')))
    .toStrictEqual(JSON.parse(readFileSync(getFixturePath('test_expected_result_1.json'), 'utf-8')));
});

test('test YAML files from the task on Hexlet', () => {
  expect(genDiff(getFixturePath('test_file_1.1.yml'), getFixturePath('test_file_1.2.yml')))
    .toStrictEqual(yaml.load(readFileSync(getFixturePath('test_expected_result_2.yml'), 'utf-8')));
});

test('test plain format', () => {
  expect(genDiff(getFixturePath('test_file_1.1.yml'), getFixturePath('test_file_1.2.yml'), 'plain'))
    .toStrictEqual(readFileSync(getFixturePath('test_expected_result_3.txt'), 'utf-8'));
});

test('test JSON format', () => {
  expect(genDiff(getFixturePath('test_file_1.1.yml'), getFixturePath('test_file_1.2.yml'), 'json'))
    .toStrictEqual(readFileSync(getFixturePath('test_expected_result_4.json'), 'utf-8'));
});
