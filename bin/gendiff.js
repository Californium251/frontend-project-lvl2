#!/usr/bin/env node

import { Command } from 'commander';
import {
  compare,
  stylish,
  formatPlainText,
  formatJSON,
} from '../src/compare.js';

const program = new Command();

const genDiff = () => {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .argument('<first file path>', 'first file path')
    .argument('<second file path>', 'second file path')
    .option('-f, --format <type>', 'output format')
    .action((firstFilePath, secondFilePath) => {
      const { format } = program.opts();
      if (format === 'plain') {
        console.log(compare(firstFilePath, secondFilePath, formatPlainText));
      } else if (format === 'json') {
        console.log(compare(firstFilePath, secondFilePath, formatJSON));
      } else {
        console.log(compare(firstFilePath, secondFilePath, stylish));
      }
    })
    .parse(process.argv);
};

genDiff();
export default genDiff;
