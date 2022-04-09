//Store game status element
const gameStatus = document.querySelector('.game-status');

//State variables
let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

let gameActive = false;

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

//Messages for game display
const winningMessage = () => `Player ${currentPlayer} is the winner!`;
const drawMessage = `The game has ended in a draw.`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn.`;

//Display which players turn it is
gameStatus.innerHTML = currentPlayerTurn();

//Functions for game
function startGame() {
    gameActive = true;
    numClicks = 0;
}

function cellClick(clickedCellEvent) {
    //Assign cell index and clicked cell to variables for easier access
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index');
    //Check if cell has been clicked already
    if (gameState[clickedCellIndex] !== "" || gameActive == false) {
        return;
    }
    //Continue game
    cellRender(clickedCell, clickedCellIndex);
    resultValidation()
}

function cellRender(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function resultValidation() {
    let roundWon = false;
    //Use a loop to go through all winning conditions
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        //If cells are unfilled where checked, keep going
        if (a === '' || b === '' || c === '') {
            continue;
        }
        //If the data in the cells checked matches, winner!
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    //If we have a winner, end the game and display winning message
    if (roundWon) {
        gameStatus.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    //Handling ties
    let roundTie = !gameState.includes("");
    if(roundTie) {
        gameStatus.innerHTML = drawMessage;
        gameActive = false;
        return;
    }
    playerChange()
}

function restartGame() {
    gameActive = false;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    numClicks = 0;
}

function playerChange() {
    if(numClicks % 2){
        currentPlayer = "X"
    } else {
        currentPlayer = "O"
    }
    gameStatus.innerHTML = currentPlayerTurn()
}
//Event listeners for cells and restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.game-restart').addEventListener('click', restartGame);
document.querySelector('.game-start').addEventListener('click', startGame);
//Counting number of clicks to track player turn
let numClicks = 0;
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', function() {
    numClicks += 1;
    console.log(numClicks)
}));
