const board = document.getElementById("board");
const statusDiv = document.getElementById("status");
let cells = [];
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (cell.textContent || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "x-color" : "o-color");


  if (checkWin()) {
    statusDiv.textContent = `🎉🎊🍾 Congratulations ,Player ${currentPlayer} wins!🍾🎊🎉`;
    statusDiv.style.color = currentPlayer === "x" ? "x-color" : "o-color";
    statusDiv.style.fontSize = "30px";
    statusDiv.style.fontStyle = "oblique";
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index =>
      cells[index].textContent === currentPlayer
    );
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent);
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  statusDiv.textContent = "Player X's turn";
  startGame();
}

startGame();
