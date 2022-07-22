import genDiff from '../src/compare.js';

test('test Jest', () => {
  expect(genDiff(`${__dirname}/src/file2.json`, `${__dirname}/src/file1.json`)).toStrictEqual({
    '+ follow': false,
    '  host': 'hexlet.io',
    '+ proxy': '123.234.53.22',
    '- timeout': 20,
    '+ timeout': 50,
    '- verbose': true,
  });
});
