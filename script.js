//Store game status element
const gameStatus = document.querySelector('.game-status');

//State variables used to store game progress
let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;

//Messages for game display
const winningMessage = `Player ${currentPlayer} is the winner!`;
const drawMessage = `The game has ended in a draw.`;
const currentPlayerTurn = `It's ${currentPlayer}'s turn.`;

//Display which players turn it is
gameStatus.innerHTML = currentPlayerTurn;

//Functions for game
function cellClick(clickedCellEvent) {
    //Assing cell index and clicked cell to variables for easier access
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index');
    //Check if cell has been clicked already
    if (gameState[clickedCellIndex] !== "" || gameActive == false) {
        return;
    }
    //Continue game
    cellRender(clickedCell, clickedCellIndex);
    playerChange();
}
function cellRender(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerHTML = currentPlayerTurn;
}
//Event listeners for cells and restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));