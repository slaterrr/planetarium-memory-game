/* Input handling for the planetarium matching game */

const startButton = document.getElementById('start-button');
const difficultyOptions = document.getElementById('difficulty-options');
// Humaira - added difficulty options container to allow user to choose mode

startButton.addEventListener('click', function() {
    document.getElementById('instruction-main').style.display = 'none';    // Humaira - show difficulty selection when "Let's Go" button is clicked
    document.getElementById('start-instruction').style.display = 'none';
    difficultyOptions.style.display = 'block';
    startButton.style.display = 'none';  // Humaira - hide start button after clicking to avoid duplicate clicks
});

// Humaira - added beginner button functionality to start game in beginner mode
document.getElementById('btn-beginner').addEventListener('click', function() {
    startGame('beginner');
});

// Humaira - added expert button functionality to start game in expert mod
document.getElementById('btn-expert').addEventListener('click', function() {
    startGame('expert');
});

exitButton.addEventListener('click', endGame);

function enterFullscreen() {
  const elem = document.documentElement;

  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  }
}
/*
startButton.addEventListener('click', () => {
  enterFullscreen();
  startGame();
});
*/
function cardClick(event) 
{
    if (lockBoard) return;

    const clickedCard = event.currentTarget;
    clickedCard.classList.add("flipped");
    const row = Number(clickedCard.dataset.row);
    const col = Number(clickedCard.dataset.col);

    const cardData = board[row][col];
    handleCardClick(cardData);
}

//disables right click context menu to prevent players from accidentally right-clicking.
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});


document.addEventListener("dblclick", (e) => {
  e.preventDefault();
});