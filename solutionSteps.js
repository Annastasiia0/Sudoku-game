function missingNumbers(arr1, arr2) {
  const result = [];
  const newArr = arr1.concat(arr2);
  for (let i = 1; i <= 9; i += 1) {
    if (!newArr.includes(i)) {
      result.push(i);
    }
  }
  return result;
}

const options = function missingNumbers2(board, [i, j]) {
  if (board[i][j] !== 0) return [];
  const sqr = makeSqr(board, Math.floor(i / 3) * 3 + Math.floor(j / 3) * 1);
  return missingNumbers(board[i].concat(sqr), board.map((el) => el[j]));
};

function makeSqr(board, k) {
  let toCheck = [];
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      toCheck = toCheck.concat([board[i].slice(j, j + 3).concat(board[i + 1].slice(j, j + 3)).concat(board[i + 2].slice(j, j + 3))]);
    }
  }
  return toCheck[k];
}

function solve(boardString) {
  const board = strToArr(boardString);
  let done = false;
  do {
    done = true;
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (board[i][j] === 0) {
          const opts = options(board, [i, j]);
          if (opts.length === 1) {
            done = false;
            board[i][j] = opts[0];
          }
        }
      }
    }
  } while (!done);
  return board;
}

const getSolutions = (board) => {
  let done = false;
  const result = [];
  do {
    done = true;
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (board[i][j] === 0) {
          const opts = options(board, [i, j]);
          const step = [i, j, 0];
          if (opts.length === 1) {
            done = false;
            board[i][j] = opts[0];
            step[2] = opts[0];
          }
          result.push(step);
        }
      }
    }
  } while (!done);
  return result;
};

const getSolutions2 = (board) => {
  let done = false;
  let result = [];
  do {
    done = true;
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (board[i][j] === 0) {
          const opts = options(board, [i, j]);
          const step = [i, j, 0];
          if (opts.length === 1) {
            done = false;
            board[i][j] = opts[0];
            step[2] = opts[0];
            const fromCross = checkCross(board, i, j);
            result.push(step);
            result = result.concat(fromCross);
          } else {
            result.push(step);
          }
        }
      }
    }
  } while (!done);

  return result;
};

const checkSqr = (board, x, y) => {
  const result = [];
  const sectorRow = Math.floor(x / 3) * 3; ///  в какой строке начниается сектор
  const sectorCol = Math.floor(y / 3) * 3; /// в какой колонке начинается наш сектор

  for (let i = sectorRow; i < sectorRow + 3; i += 1) { ///
    for (let j = sectorCol; j < sectorCol + 3; j += 1) {
      if (board[i][j] === 0) {
        const opts = options(board, [i, j]);
        const step = [i, j, 0];
        if (opts.length === 1) {
          board[i][j] = opts[0];
          step[2] = opts[0];
        }
        result.push(step);
      }
    }
  }
  return result;
};

const checkCross = (board, x, y) => {
  const result = [];
  for (let j = 0; j < 9; j += 1) {
    if (board[x][j] === 0) {
      const opts = options(board, [x, j]);
      const step = [x, j, 0];
      if (opts.length === 1) {
        board[x][j] = opts[0];
        step[2] = opts[0];
      }
      result.push(step);
    }
  }
  for (let i = 0; i < 9; i += 1) {
    if (board[i][y] === 0) {
      const opts = options(board, [i, y]);
      const step = [i, y, 0];
      if (opts.length === 1) {
        board[i][y] = opts[0];
        step[2] = opts[0];
      }
      result.push(step);
    }
  }

  return result;
};

const getSolutions3 = (board) => {
  let done = false;
  let result = [];
  do {
    done = true;
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (board[i][j] === 0) {
          const opts = options(board, [i, j]);
          const step = [i, j, 0];
          if (opts.length === 1) {
            done = false;
            board[i][j] = opts[0];
            step[2] = opts[0];
            const fromCross = checkCross(board, i, j);
            const fromSqr = checkSqr(board, i, j);
            result.push(step);
            result = result.concat(fromCross).concat(fromSqr);
          } else {
            result.push(step);
          }
        }
      }
    }
  } while (!done);

  return result;
};
