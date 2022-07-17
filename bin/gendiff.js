#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

const genDiff = () => {
  program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
};

genDiff();

export default genDiff;