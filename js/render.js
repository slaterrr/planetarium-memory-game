// renderBoard 
function renderBoard()
{   
    // Humaira - dynamically adjust grid columns based on difficulty (rows/cols change)
    gameContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    gameContainer.innerHTML = ""; // Clear the game container before rendering the board for re-use

    for(let r = 0; r < rows; r++) 
    {
        for(let c = 0; c < cols; c++)
        {
            const cardData = board[r][c];

            const card = document.createElement("div"); // creates a new html element for each card
            card.setAttribute("draggable", "false"); //prevents dragging from user
            card.classList.add("card"); // give it the CSS class 'card' for styling
            card.addEventListener("click", cardClick); // Add click event listener to handle card flipping and matching logic
            card.dataset.row = r; // Store the row index in a data attribute for later use in the click handler
            card.dataset.col = c; // Store the column index in a data attribute for later use in the click handler
            board[r][c].card = card;

            const cardInner = document.createElement("div"); // Create a div for the inner part of the card
            cardInner.classList.add("card-inner"); // give it the CSS class 'card-inner' for styling

            const cardFront = document.createElement("div"); // Create a div for the front of the card
            cardFront.classList.add("card-front"); // give it the CSS class 'card-front' for styling

            const frontImg = document.createElement("img"); // Create an img element for the front of the card
            frontImg.setAttribute("draggable", "false");
            frontImg.src = "assets/question-mark.png"; // Set the image source to a question mark image for the front of the card
            frontImg.alt = "?"; // Set alt text for accessibility

            const cardBack = document.createElement("div"); // Create a div for the back of the card
            cardBack.classList.add("card-back"); // give it the CSS class 'card-back' for styling

            const backImg = document.createElement("img"); // Create an img element for the card
            backImg.setAttribute("draggable", "false"); //Prevents dragging from user
            backImg.src = "assets/" + cardData.image + ".png"; // Use object image value
            backImg.alt = cardData.name; // Use object name for accessibility

            cardBack.appendChild(backImg); // Add the image to the back of the card
            cardFront.appendChild(frontImg); // Add the image to the front of the card
            cardInner.appendChild(cardFront); // Add the front to the inner card
            cardInner.appendChild(cardBack); // Add the back to the inner card
            card.appendChild(cardInner); // Add the inner card to the card

            if (cardData.flipped) 
            {
                card.classList.add("flipped");
            }

            if (cardData.matched)
            {
                card.style.visibility = "hidden"; // hide matched cards
            }

            gameContainer.appendChild(card); // adds the card to 'game-container' in HTML        
        }
    }
}