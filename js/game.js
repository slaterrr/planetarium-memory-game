//Samira's file

let rows = 4;
let cols = 6;

const timeDisplay = document.getElementById("time-display");
const gameInstructions = document.getElementById("game-instructions");
const gameContainer = document.getElementById("game-container");
const hudDisplay = document.getElementById("hud");
const ufoDisplay = document.getElementById("ufo");
const blackHole = document.getElementById("black-hole");
const backBtn = document.getElementById("backBtn");
const exitButton = document.getElementById("exit-button");

const mode = new URLSearchParams(window.location.search).get("mode");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href =
      mode === "vertical"
        ? "Vertical_ PTechHS2-v2/story.html"
        : "Horizontal_ PTechHS-v1/story.html";
  });
}

let matchedPairs = 0;
let timeLeft = 70;
let timerStarted = false;
let timerInterval = null;

// card logic
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// message
let messageDisplay = document.getElementById("game-message");

if (!messageDisplay && hudDisplay) {
  messageDisplay = document.createElement("p");
  messageDisplay.id = "game-message";
  hudDisplay.appendChild(messageDisplay);
}

// cards
const baseCards = [
  { name: "sun", image: "sun" },
  { name: "spaceship", image: "spaceship" },
  { name: "earth", image: "earth" },
  { name: "mars", image: "mars" },
  { name: "jupiter", image: "jupiter" },
  { name: "saturn", image: "saturn" },
  { name: "venus", image: "venus" },
  { name: "neptune", image: "neptune" },
  { name: "uranus", image: "uranus" },
  { name: "mercury", image: "mercury" },
  { name: "astronaut", image: "astronaut" },
  { name: "alien", image: "alien" }
];

let cards = [];
let board = [];

function initializeBoard() {
  const numPairs = (rows * cols) / 2;
  const selectedCards = baseCards.slice(0, numPairs);

  cards = [...selectedCards, ...selectedCards].map(card => ({
    ...card,
    flipped: false,
    matched: false
  }));

  cards.sort(() => Math.random() - 0.5);

  board = [];
  let index = 0;

  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = cards[index];
      index++;
    }
  }

  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function updateTimerDisplay() {
  if (timeDisplay) {
    timeDisplay.textContent = "Time: " + timeLeft;
  }
}

function showMessage(message) {
  if (messageDisplay) {
    messageDisplay.textContent = message;
  }
}

function startTimer() {
  if (timerStarted) return;

  timerStarted = true;
  timeLeft = 70;
  updateTimerDisplay();
  showMessage("");

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerStarted = false;

      //showMessage("Time is up! You lost!");

      setTimeout(() => {
        endGame();
      }, 3000);
    }
  }, 1000);
}

function checkWin() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].matched) {
        return false;
      }
    }
  }
  return true;
}

function startGame(difficulty) {
  if (difficulty === "beginner") {
    rows = 4;
    cols = 4;
  } else {
    rows = 4;
    cols = 6;
  }

  initializeBoard();

  const difficultyOptions = document.getElementById("difficulty-options");
  const startButton = document.getElementById("start-button");

  if (difficultyOptions) difficultyOptions.style.display = "none";
  if (startButton) startButton.style.display = "block";

  matchedPairs = 0;
  updateMatchCounter();
  showMessage("");
  updateTimerDisplay();

  if (gameInstructions) gameInstructions.style.display = "none";
  if (gameContainer) gameContainer.style.display = "grid";
  if (hudDisplay) hudDisplay.style.display = "block";
  if (exitButton) exitButton.style.display = "block";
  if (blackHole) blackHole.style.display = "block";
  if (ufoDisplay) ufoDisplay.style.display = "block";
  if (backBtn) backBtn.style.display = "none";

  renderBoard();
  startTimer();
}

function endGame() {
  if (gameContainer) gameContainer.style.display = "none";
  if (gameInstructions) gameInstructions.style.display = "block";
  if (hudDisplay) hudDisplay.style.display = "none";
  if (exitButton) exitButton.style.display = "none";
  if (blackHole) blackHole.style.display = "none";
  if (ufoDisplay) ufoDisplay.style.display = "none";
  if (backBtn) backBtn.style.display = "block";

  matchedPairs = 0;
  updateMatchCounter();

  const instructionMain = document.getElementById("instruction-main");
  const startInstruction = document.getElementById("start-instruction");
  const startButton = document.getElementById("start-button");
  const difficultyOptions = document.getElementById("difficulty-options");

  if (instructionMain) instructionMain.style.display = "block";
  if (startInstruction) startInstruction.style.display = "block";
  if (startButton) startButton.style.display = "block";
  if (difficultyOptions) difficultyOptions.style.display = "none";

  showMessage("");

  timerStarted = false;
  clearInterval(timerInterval);

  timeLeft = 70;
  updateTimerDisplay();

  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function handleCardClick(card) {
  if (lockBoard) return;
  if (card.flipped || card.matched) return;

  card.flipped = true;

  if (firstCard === null) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  checkMatch();
}

function checkMatch() {
  if (firstCard && secondCard) {
    if (firstCard.name === secondCard.name) {
      setTimeout(() => {
        firstCard.matched = true;
        secondCard.matched = true;

        matchedPairs++;
        updateMatchCounter();

        resetTurn();
        renderBoard();

        if (checkWin()) {
          clearInterval(timerInterval);
          timerStarted = false;
          //showMessage("You won!");

          setTimeout(() => {
            endGame();
          }, 3000);
        }
      }, 500);
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;

        resetTurn();
        renderBoard();
      }, 550);
    }
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

updateTimerDisplay();

function updateMatchCounter() {
  const counter = document.getElementById("match-counter");
  if (counter) {
    counter.textContent = "Matches: " + matchedPairs;
  }
}