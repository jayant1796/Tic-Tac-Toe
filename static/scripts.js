
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const dialog = document.getElementById('dialog');
const dialogMessage = document.getElementById('dialog-message');
const restartBtn = document.getElementById('restart');
const exitBtn = document.getElementById('exit');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    running = true;
    dialog.style.display = 'none'; // Hide dialog initially
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    if (board[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            highlightWinningCells(condition);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        running = false;
        showDialog(`Player ${currentPlayer} wins! Do you want to restart the game?`);
    } else if (!board.includes("")) {
        statusText.textContent = `It's a tie!`;
        running = false;
        showDialog(`It's a tie! Do you want to restart the game?`);
    } else {
        changePlayer();
    }
}

function highlightWinningCells(condition) {
    condition.forEach(index => {
        cells[index].classList.add("winner-animation");
    });
}

function showDialog(message) {
    dialogMessage.textContent = message;
    dialog.style.display = 'block'; // Show the dialog
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player X's turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner-animation"); // Remove animations
    });
    running = true;
    dialog.style.display = 'none'; // Hide the dialog
}

function exitGame() {
    window.close(); // Close the browser window (works only in some browsers)
}


restartBtn.addEventListener('click', restartGame);
exitBtn.addEventListener('click', exitGame);
