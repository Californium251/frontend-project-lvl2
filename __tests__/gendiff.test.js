/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('test initial files in the task', () => {
  expect(genDiff(`${__dirname}/../src/file2.json`, `${__dirname}/../src/file1.json`)).toStrictEqual({
    '+ follow': false,
    '  host': 'hexlet.io',
    '+ proxy': '123.234.53.22',
    '- timeout': 20,
    '+ timeout': 50,
    '- verbose': true,
  });
});

test('test same files', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_1.1.json`, `${__dirname}/../__fixtures__/test_file_1.2.json`)).toStrictEqual({
    '  host': 'hexlet.io',
    '  timeout': 50,
    '  proxy': '123.234.53.22',
    '  follow': false,
  });
});

test('test files with no overlap', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_2.1.json`, `${__dirname}/../__fixtures__/test_file_2.2.json`)).toStrictEqual({
    '- follow': 'false',
    '+ host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '+ timeout': '50',
  });
});

test('test files with diferent values', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_3.1.json`, `${__dirname}/../__fixtures__/test_file_3.2.json`)).toStrictEqual({
    '- host': 'hexlet.io',
    '+ host': 'hexlet.ru',
    '- timeout': '50',
    '+ timeout': 30,
  });
});

test('test same files', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_4.1.yml`, `${__dirname}/../__fixtures__/test_file_4.2.yml`)).toStrictEqual({
    '  host': 'hexlet.io',
    '  timeout': 50,
    '  proxy': '123.234.53.22',
    '  follow': false,
  });
});

test('test files with no overlap', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_5.1.yml`, `${__dirname}/../__fixtures__/test_file_5.2.yml`)).toStrictEqual({
    '- follow': false,
    '+ host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '+ timeout': 50,
  });
});

test('test files with diferent values', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_6.1.yml`, `${__dirname}/../__fixtures__/test_file_6.2.yml`)).toStrictEqual({
    '- host': 'hexlet.io',
    '+ host': 'hexlet.ru',
    '- timeout': 50,
    '+ timeout': 30,
  });
});
