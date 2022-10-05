const {
  solve,
  isSolved,
  prettyBoard,
  missingNumbers,
  strToArr,
} = require('../sudoku.js')

describe('Проверка выполнения функций ', () => {
  test('Build from strings array of strings', () => {
    expect(strToArr('158')).toEqual([
      [1, 5, 8]
    ]);
  });
  test('Check hyphen changes for zero', () => {
    expect(strToArr('-----')).toEqual([
      [0, 0, 0, 0, 0]
    ]);
  });
  test('Recognize missing elements', () => {
    expect(missingNumbers([1, 2], [3, 4])).toEqual([5, 6, 7, 8, 9]);
  });
  test('Calculate missing elements', () => {
    expect(missingNumbers([1], [3, 4])).toEqual([2, 5, 6, 7, 8, 9]);
  });
});
