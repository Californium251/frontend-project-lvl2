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

test('test files from the task on Hexlet', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_1.1.json`, `${__dirname}/../__fixtures__/test_file_1.2.json`)).toStrictEqual({
    '  common': {
      '+ follow': false,
      '  setting1': 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': {
        '  key5': 'value5',
      },
      '  setting6': {
        '  doge': {
          '- wow': '',
          '+ wow': 'so much',
        },
        '  key': 'value',
        '+ ops': 'vops',
      },
    },
    '  group1': {
      '- baz': 'bas',
      '+ baz': 'bars',
      '  foo': 'bar',
      '- nest': {
        '  key': 'value',
      },
      '+ nest': 'str',
    },
    '- group2': {
      '  abc': 12345,
      '  deep': {
        '  id': 45,
      },
    },
    '+ group3': {
      '  deep': {
        '  id': {
          '  number': 45,
        },
      },
      '  fee': 100500,
    },
  });
});

test('test YAML files from the task on Hexlet', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/test_file_1.1.yml`, `${__dirname}/../__fixtures__/test_file_1.2.yml`)).toStrictEqual({
    '  common': {
      '+ follow': false,
      '  setting1': 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': {
        '  key5': 'value5',
      },
      '  setting6': {
        '  doge': {
          '- wow': '',
          '+ wow': 'so much',
        },
        '  key': 'value',
        '+ ops': 'vops',
      },
    },
    '  group1': {
      '- baz': 'bas',
      '+ baz': 'bars',
      '  foo': 'bar',
      '- nest': {
        '  key': 'value',
      },
      '+ nest': 'str',
    },
    '- group2': {
      '  abc': 12345,
      '  deep': {
        '  id': 45,
      },
    },
    '+ group3': {
      '  deep': {
        '  id': {
          '  number': 45,
        },
      },
      '  fee': 100500,
    },
  });
});
