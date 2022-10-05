function recSolver2(board) {
  indexes().filter((el) => options(board, el).length === 1).forEach(([i, j]) => board[i][j] = options(board, [i, j])[0]);
  return isSolved(board) ? board : recSolver2(board);
}

// Функция принимает два массива чисел
// Каждый размером 1Х9
// Возвращает массив чисел, которых не хватает
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

// Функция принимает массив 9Х9
// Возвращает массив из чисел, которых не хватает в строке х и столбце у
const options = function missingNumbers2(board, [i, j]) {
  if (board[i][j] !== 0) return [];
  const sqr = makeSqr(board, Math.floor(i / 3) * 3 + Math.floor(j / 3) * 1);
  return missingNumbers(board[i].concat(sqr), board.map((el) => el[j]));
};

// Функция принимает строку из 81 символов
// Возвращает массив 9Х9 из чисел от 0 до 9
function strToArr(str) {
  const size = 9; // размер подмассива
  const result = []; // массив в который будет выведен результат.
  for (let i = 0; i < Math.ceil(str.length / size); i += 1) {
    result[i] = str.slice((i * size), (i * size) + size);
  }
  const arr = result.map((el) => el.split('').join('').replace(/\D/g, '0').split(''));
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      arr[i][j] = Number(arr[i][j]);
    }
  }
  return arr;
}

// Функция принимает массив 9Х9
// Возвращает квардрат с индексом k
function makeSqr(board, k) {
  let toCheck = [];
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      toCheck = toCheck.concat([board[i].slice(j, j + 3).concat(board[i + 1].slice(j, j + 3)).concat(board[i + 2].slice(j, j + 3))]);
    }
  }
  return toCheck[k];
}

// Takes a board as a string in the format
// you see in the puzzle file. Returns
// something representing a board after
// your solver has tried to solve it.
// How you represent your board is up to you!
const solve = (boardString) => recSolver2(strToArr(boardString));

function indexes() {
  const result = [];
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      result.push([i, j]);
    }
  }
  return result;
}

// Returns a boolean indicating whether
// or not the provided board is solved.
// The input board will be in whatever
// form `solve` returns.
function isSolved(boardToCheck) {
  const board = [];
  for (let i = 0; i < 9; i += 1) {
    board.push([...boardToCheck[i]]);
  }
  let toCheck = [].concat(board);
  for (let i = 0; i < 9; i += 1) { toCheck = toCheck.concat([board.map((a) => a[i])]); }

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      toCheck = toCheck.concat([board[i].slice(j, j + 3).concat(board[i + 1].slice(j, j + 3)).concat(board[i + 2].slice(j, j + 3))]);
    }
  }
  return toCheck.every((a) => a.sort().join('') === '123456789');
}

// Takes in a board in some form and
// returns a String that's well formatted
// for output to the screen.
// The input board will be in whatever
// form `solve` returns.
function prettyBoard(board) {
  return `\n\n${board.map((row) => `   ${row.join(' ')}`).join('\n')}\n\n`;
}

// Exports all the functions to use them in another file.
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
