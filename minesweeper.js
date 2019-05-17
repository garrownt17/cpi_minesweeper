const generatePlayerBoard = (numRows, numCols) => {
  let board = [];

  for(let i = 0; i < numRows; i++) {
    board[i] = [];
    for(let j = 0; j < numCols; j++) {
      board[i].push(' ');
    }
  }
  return board;
}

const genBombBoard = (numRows, numCols, numBombs) => {
  if(numBombs > (numRows * numCols)) {
    return 'Too many bombs; lower the number and try again';
  }

  let board = [];

  for(let i = 0; i < numRows; i++) {
    board[i] = [];
    for(let j = 0; j < numCols; j++) {
      board[i].push(' ');
    }
  }

  let numBombsPlaced = 0;
  while(numBombsPlaced < numBombs) {
    let randRow = Math.floor(Math.random() * numRows);
    let randCol = Math.floor(Math.random() * numCols);

    if(board[randRow][randCol] !== 'B') {
      board[randRow][randCol] = 'B';
      numBombsPlaced++;
    }
  }

  return board;
}

let printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let newBoard = generatePlayerBoard(4,4);
let bombBoard = genBombBoard(4,4, 2);

console.log('New Board:');
printBoard(newBoard);
console.log('\nBomb Board:');
printBoard(bombBoard);
