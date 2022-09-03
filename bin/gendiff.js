#!/usr/bin/env node

import { Command } from 'commander';
import compare from '../src/compare.js';

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
      console.log(compare(firstFilePath, secondFilePath, format));
    })
    .parse(process.argv);
};

genDiff();
export default genDiff;
