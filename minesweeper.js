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

const neighborBombs = (bombBoard, rowIndex, colIndex) => {
  const neighborOffsets = [[-1, 0], [-1, 1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1]];
  const numRows = bombBoard.length;
  const numCols = bombBoard[0].length;
  let numBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = numRows + offset[0];
    const neighborColIndex = numCols + offset[1];

    if(neighborRowIndex >= 0 && neighborRowIndex < numRows && neighborColIndex >= 0 && neighborColIndex < numCols) {
      if(bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
        numBombs++;
      }
    }
  });
  return numBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
  if(playerBoard[rowIndex][colIndex] != ' ') {
    console.log('This tile has already been flipped!');
  } else if(bombBoard[rowIndex][colIndex] === 'B') {
    playerBoard[rowIndex][colIndex] = 'B';
    console.log('BOOM!');
  } else {
    console.log("checking");
    playerBoard[rowIndex][colIndex] = neighborBombs(bombBoard, rowIndex, colIndex);
  }
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

flipTile(newBoard, bombBoard, 1, 1);
console.log('Updated Player Board:');

printBoard(newBoard);
