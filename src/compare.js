import { readFileSync } from 'node:fs';
import process from 'node:process';
import * as path from 'path';

const makeObj = (filePath) => JSON.parse(readFileSync(filePath, 'utf-8'));
const makeArrOfKeys = (obj) => Object.entries(obj).map((el) => el[0]);
const makePath = (filePath) => path.resolve(process.cwd(), filePath);
const removeDublicates = (acc, el) => {
  if (!acc.includes(el)) {
    acc.push(el);
  }
  return acc;
};

const compare = (firstFilePath, secondFilePath) => {
  const firstObj = makeObj(makePath(firstFilePath));
  const secondObj = makeObj(makePath(secondFilePath));
  const getDiff = (acc, el) => {
    if (Object.hasOwn(firstObj, el)) {
      if (Object.hasOwn(secondObj, el)) {
        if (firstObj[el] === secondObj[el]) {
          acc[`  ${el}`] = firstObj[el];
        } else {
          acc[`- ${el}`] = firstObj[el];
          acc[`+ ${el}`] = secondObj[el];
        }
      } else {
        acc[`- ${el}`] = firstObj[el];
      }
    } else {
      acc[`+ ${el}`] = secondObj[el];
    }
    return acc;
  };
  return makeArrOfKeys(firstObj)
    .concat(makeArrOfKeys(secondObj))
    .reduce(removeDublicates, [])
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce(getDiff, {});
};

export default compare;
