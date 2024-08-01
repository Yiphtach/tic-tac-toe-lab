/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // First column
  [1, 4, 7], // Second column
  [2, 5, 8], // Third column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

/*---------------------------- Variables (state) ----------------------------*/

let board;   // represents the state of the squares on the board
let turn;    // turn tracks whose turn it is
let winner;  // winner represents if anyone has won yet
let tie;     // tie represents if the game has ended in a tie


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr'); // selects all elements w/the class 'sqr'
const messageEl = document.getElementById('message'); // selects the element with the id 'message'
const boardEl = document.querySelector('.board');
const resetBtnEl = document.getElementById("reset"); // selects the reset button

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = ['', '', '', '', '', '', '', '', '']; // Initialize board with empty strings
  turn = 'X';                                  // Set the initial turn to 'X'
  winner = false;                              // No winner initially
  tie = false;                                 // No tie initially
  render();                                    // Call the render function
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((value, index) => {
      const square = squareEls[index];
      square.textContent = value; // Ensure textContent is set correctly
      square.classList.remove('x', 'o'); // Remove existing classes
      if (value === 'X') {
          square.classList.add('x');
      } else if (value === 'O') {
          square.classList.add('o');
      }
  });
}

function updateMessage() {
  if (!winner && !tie) {
      messageEl.textContent = `It's ${turn}'s turn`; // Update message for current turn
  } else if (!winner && tie) {
      messageEl.textContent = 'It\'s a tie!'; // Update message for tie
  } else {
      messageEl.textContent = `Congratulations! ${turn} wins!`; // Update message for winner
  }
}

function handleClick(event) {
  const sqr = event.target; // Get the target element
  const squareIndex = parseInt(sqr.id); // Get the index from the id
  if (board[squareIndex] !== '' || winner) {
      return; // If the square is already taken or the game is over, do nothing
  }
  placePiece(squareIndex); // Place the piece on the board
  checkForWinner(); // Check if there's a winner
  checkForTie(); // Check if there's a tie
  switchPlayerTurn(); // Switch the player turn
  render(); // Re-render the board and message
}

function placePiece(index) {
  board[index] = turn; // Update the board state with the current turn
}

function checkForWinner() {
  for (let combo of winningCombos) {
      const [a, b, c] = combo; // Destructure the winning combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          winner = true; // Set winner to true if there's a winning combination
          return;
      }
  }
}

function checkForTie() {
  if (winner) {
      return; // If there's a winner, return early
  }
  tie = board.every(cell => cell !== ''); // Check if all cells are filled
}

function switchPlayerTurn() {
  if (winner) {
      return; // If there's a winner, return early
  }
  turn = turn === 'X' ? 'O' : 'X'; // Switch turn
}

// Call the init function when the app loads
init();

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', (event) => {
  if (event.target.classList.contains('sqr')) {
      handleClick(event); // Call handleClick if a square is clicked
  }
});

resetBtnEl.addEventListener('click', init); // Call the init function when the reset button is clicked
