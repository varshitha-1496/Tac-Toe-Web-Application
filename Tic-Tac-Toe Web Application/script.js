const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!boardState.includes("")) {
    message.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = 'X';
  boardState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  message.textContent = "X's Turn";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
