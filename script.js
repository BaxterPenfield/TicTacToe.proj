//Store game status element
const gameStatus = document.querySelector('.game-desc');

//State vars

let currentPlayer = "X";

let numClicks = 0;

let gameState = ["", "", "", "", "", "", "", "", ""];

let gameActive = false;

let playerName = "";

let canRestart = false;

let canStart = false;

let canChangeGame = false;

let checkOnePlayer = false;

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
const winningMessage = () => `${playerName} is the winner!`;
const drawMessage = `The game has ended in a draw.`;
const currentPlayerTurn = () => `It's ${playerName}'s turn.`;

//Buttons and input variables
const playerOneStart = document.querySelector('.game-start-one-player');
const playerTwoStart = document.querySelector('.game-start-two-player');
const singlePlayerBtn = document.querySelector('.single-player');
const twoPlayerBtn = document.querySelector('.two-player')
const playerOne = document.querySelector('.player-one');
const playerTwo = document.querySelector('.player-two');

//onLoad function
function loadFunction() {
    playerOneStart.style.display = 'none';
    playerTwoStart.style.display = 'none';
    playerOne.readOnly = true;
    playerTwo.readOnly = true;
}

//functions for handling button clicks
function singlePlayer() {
    singlePlayerBtn.style.display = 'none'
    twoPlayerBtn.style.display = 'none'
    playerOneStart.style.display = 'inline'
    playerTwo.value = 'Computer'
    document.querySelector('.game-desc').innerHTML = 'Sorry this is not quite functional yet, try 2 player in the meantime!'
    canStart = false;
    canChangeGame = true;
}

function twoPlayer() {
    playerOne.readOnly = false;
    playerTwo.readOnly = false;
    singlePlayerBtn.style.display = 'none';
    twoPlayerBtn.style.display = 'none';
    playerTwoStart.style.display = 'inline';
    document.querySelector('.game-desc').innerHTML = 'Enter player names on left then press start!'
    canStart = true;
    canChangeGame = true;
}

function gameChange() {
    if(canChangeGame === false) {
        return;
    } else
    gameActive = false;
    canRestart = false;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = 'Choose your gamemode'
    numClicks = 0;
    singlePlayerBtn.style.display = 'inline'
    twoPlayerBtn.style.display = 'inline'
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('input').forEach(input => input.value = "");
    loadFunction();
}

function replayGame() {
    if(canRestart === false) {
        return;
    } else
    gameActive = true;
    canRestart = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = `It's ${playerOne.value}'s turn.`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    numClicks = 0;

}

function startGameOnePlayer() {
    // if(playerOne.value === '' || canStart === false) {
    //     return;
    // } else
    // canStart = true;
    // gameActive = ;
    // numClicks = 0;
    // checkOnePlayer = true;
    // document.querySelector('.game-desc').innerHTML = 'Try to beat computer!'
    playerOneStart.style.display = 'none';
    playerTwo.value = '';
    twoPlayer();

}

// function computerPlayer() {
//     let random = Math.floor(Math.random() * 8)
//     let computerCellChoice = gameState[random]
//         if(computerCellChoice === '') {
//             computerCellChoice = 'O'
//         }
// }

//Functions for game

function startGameTwoPlayer() {
    if(playerOne.value === '' || playerTwo.value === '' || canStart === false) {
        return;
    } else
    canStart = false;
    gameActive = true;
    numClicks = 0;
    canRestart = true;
    gameStatus.innerHTML = `It's ${playerOne.value}'s turn.`;
}

function cellClick(clickedCellEvent) {
    //Assign cell index and clicked cell to variables for easier access
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index');
    //Check game is active
    if(gameActive !== true) {
        return;
    }
    //Check if cell has been clicked already
    if (gameState[clickedCellIndex] !== "" || gameActive == false) {
        return;
    } else
    //Track player change thru numClicks
    numClicks += 1;
    //Continue game
    cellRender(clickedCell, clickedCellIndex);
    resultValidation()
    if(checkOnePlayer = true) {
        computerPlayer()
    }
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
        //If cells are unfilled where checked, keep going
        if (gameState[winCondition[0]] === '' || gameState[winCondition[1]] === '' || gameState[winCondition[2]] === '') {
            continue;
        }
        //If the data in the cells checked matches, winner!
        if (gameState[winCondition[0]] === gameState[winCondition[1]] && gameState[winCondition[1]] === gameState[winCondition[2]]) {
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

function playerChange() {
    if(numClicks % 2) {
        currentPlayer = "O"
        playerName = document.querySelector(".player-two").value
    } else {
        playerName = document.querySelector(".player-one").value
        currentPlayer = "X"
    }
    gameStatus.innerHTML = currentPlayerTurn()
}



//Event listeners for cells and restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.game-change').addEventListener('click', gameChange);
playerOneStart.addEventListener('click', startGameOnePlayer);
playerTwoStart.addEventListener('click', startGameTwoPlayer);
document.querySelector('.replay').addEventListener('click', replayGame);
singlePlayerBtn.addEventListener('click', singlePlayer);
twoPlayerBtn.addEventListener('click', twoPlayer);