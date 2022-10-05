const container = document.getElementById('container');
let puzzle = '1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--';
const puuzle2 = '--5-3--819-285--6-6----4-5---74-283-34976---5--83--49-15--87--2-9----6---26-495-3';
const puzzles = [];
puzzles.push('1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--');
puzzles.push('--5-3--819-285--6-6----4-5---74-283-34976---5--83--49-15--87--2-9----6---26-495-3');
puzzles.push('29-5----77-----4----4738-129-2--3-648---5--7-5---672--3-9--4--5----8-7---87--51-9');
puzzles.push('-8--2-----4-5--32--2-3-9-466---9---4---64-5-1134-5-7--36---4--24-723-6-----7--45-');
puzzles.push('6-873----2-----46-----6482--8---57-19--618--4-31----8-86-2---39-5----1--1--4562--');
puzzles.push('---6891--8------2915------84-3----5-2----5----9-24-8-1-847--91-5------6--6-41----');
puzzles.push('-3-5--8-45-42---1---8--9---79-8-61-3-----54---5------78-----7-2---7-46--61-3--5--');
puzzles.push('-96-4---11---6---45-481-39---795--43-3--8----4-5-23-18-1-63--59-59-7-83---359---7');
puzzles.push('----754----------8-8-19----3----1-6--------34----6817-2-4---6-39------2-53-2-----');
puzzles.push('3---------5-7-3--8----28-7-7------43-----------39-41-54--3--8--1---4----968---2--');
puzzles.push('3-26-9--55--73----------9-----94----------1-9----57-6---85----6--------3-19-82-4-');
puzzles.push('-2-5----48-5--------48-9-2------5-73-9-----6-25-9------3-6-18--------4-71----4-9-');
puzzles.push('--7--8------2---6-65--79----7----3-5-83---67-2-1----8----71--38-2---5------4--2--');
puzzles.push('----------2-65-------18--4--9----6-4-3---57-------------------73------9----------');
puzzles.push('---------------------------------------------------------------------------------');

const select = document.getElementById('puzzles-select');
select.addEventListener('change', (event) => {
  puzzle = puzzles[event.target.value];
  refresh();
});

for (let i = 0; i < puzzles.length; i += 1) {
  const newOption = document.createElement('option');
  newOption.innerText = `${i + 1}`;
  newOption.value = i;
  select.appendChild(newOption);
}

const solution = [[0, 1, 0], [0, 4, 0], [0, 7, 5]];
const tries = document.getElementById('tries');
const hits = document.getElementById('hits');
let hitsCount = 0;
let animationSpeed = 300;
const puzzleInput = document.getElementById('puzzle');
const speedSlider = document.getElementById('speed');

speedSlider.addEventListener('change', () => {
  animationSpeed = 1000 - speedSlider.value * 9;
});

// const getSolutions = require('./solutionSteps');

let board = strToArr(puzzle);

document.getElementById('solve').addEventListener('click', () => {
  hitsCount = 0;
  step(getSolutions(board), 0);
});

document.getElementById('solve2').addEventListener('click', () => {
  hitsCount = 0;
  step(getSolutions2(board), 0);
});

document.getElementById('solve3').addEventListener('click', () => {
  hitsCount = 0;
  step(getSolutions3(board), 0);
});

document.getElementById('load').addEventListener('click', () => {
  puzzle = puzzleInput.value;
  select.value = '';
  refresh();
});

document.getElementById('refresh').addEventListener('click', () => {
  refresh();
});

function refresh() {
  board = strToArr(puzzle);
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      document.getElementById(`${i}${j}`).innerText = board[i][j] === 0 ? '' : board[i][j];
      document.getElementById(`${i}${j}`).style.backgroundColor = board[i][j] === 0 ? 'rgba(232, 253, 255, 0.3)' : 'white';
    }
  }
  tries.style.color = 'white';
  hits.style.color = 'white';
  tries.innerText = 'Проверок:';
  hits.innerText = 'Отгадано:';
}

const step = (arr, i) => {
  tries.style.color = 'black';
  hits.style.color = 'black';
  if (i >= arr.length) { return; }
  const item = arr[i];
  const cell = document.getElementById(`${item[0]}${item[1]}`);
  tries.innerText = `Проверок: ${i + 1}`;
  if (item[2] === 0) {
    cell.style.backgroundColor = 'rgb(253, 196, 196)';
    setTimeout(() => {
      cell.style.backgroundColor = 'rgba(253, 196, 196, 0.3)';
      step(arr, i + 1);
    }, animationSpeed);
  } else {
    cell.style.backgroundColor = 'rgb(175, 234, 166)';
    cell.style.fontWeight = '900';
    cell.style.fontSize = '1.4em';
    cell.innerText = item[2];
    hitsCount += 1;
    hits.innerText = `Отгадано: ${hitsCount}`;
    setTimeout(() => {
      cell.style.fontWeight = 'normal';
      cell.style.fontSize = '1em';
      cell.style.backgroundColor = 'rgba(175, 234, 166, 0.3)';

      step(arr, i + 1);
    }, animationSpeed);
  }
};

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

function makeRows(rows, cols, sqr) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const cell = document.createElement('div');
      if (board[i][j] === 0) {
        cell.style.backgroundColor = 'rgba(232, 253, 255, 0.3)';
        cell.innerText = '';
      } else {
        cell.style.backgroundColor = 'white';
        cell.innerText = board[i][j];
      }

      cell.id = `${i}${j}`;
      cell.addEventListener('click', () => {
        board[i][j] = board[i][j] === 0 ? 1 : board[i][j] + 1;
        board[i][j] = board[i][j] === 10 ? 0 : board[i][j];
        cell.innerText = board[i][j] === 0 ? '' : board[i][j];
      });
      if (j % 3 === 0) {
        cell.classList.add('grid-item-left');
      }
      if (j === 8) {
        cell.classList.add('grid-item-right');
      }
      if (i % 3 === 0) {
        cell.classList.add('grid-item-top');
      }
      if (i === 8) {
        cell.classList.add('grid-item-bottom');
      }
      cell.classList.add('grid-item');
      container.appendChild(cell);
    }
  }
}

makeRows(9, 9);
