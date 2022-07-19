import { read, readFileSync } from 'node:fs';

const compare = (firstFilePath, secondFilePath) => {
  const makeObj = (filePath) => JSON.parse(readFileSync(filePath, 'utf-8'));
  const makeArrOfKeys = (obj) => Object.entries(obj).map((el) => el[0]);
  const firstObj = makeObj(firstFilePath);
  const secondObj = makeObj(secondFilePath);
  const arr = makeArrOfKeys(firstObj)
    .concat(makeArrOfKeys(secondObj))
    .reduce((acc, el) => {
      if (!acc.includes(el)) {
        acc.push(el);
      }
      return acc
    }, [])
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((acc, el) => {
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
    }, {})
  return arr;
}

export default compare;
