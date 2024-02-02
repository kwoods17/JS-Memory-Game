// Get the canvas and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set up values for the cards
const totalCards = cardPairs * 2;
const cardPairs = 8;
const colors = [
  "#FF5733",
  "#FFC300",
  "#DAF7A6",
  "#900C3F",
  "#C70039",
  "#581845",
  "#581845",
  "#C70039",
  "#FF5733",
  "#FFC300",
  "#DAF7A6",
  "#900C3F",
];
const terms = [
  "var",
  "let",
  "const",
  "function",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "continue",
];
const definitions = [
  "variable declaration",
  "variable declaration",
  "constant variable declaration",
  "function declaration",
  "if statement",
  "else statement",
  "for loop",
  "while loop",
  "switch statement",
  "case statement",
  "break statement",
  "continue statement",
];
let cards = [];
let selectedCard = null;
let matchedCards = 0;
const cardWidth = 150;
const cardHeight = 200;
const cardSpacing = 20;

function createCard(term, definition, color) {
  /**
   * Creates a card object with the specified term, definition, and color.
   *
   * @param {string} term - The term of the card.
   * @param {string} definition - The definition of the card.
   * @param {string} color - The color of the card.
   * @returns {Object} The created card object.
   */
  return {
    term,
    definition,
    color,
    x: Math.random() * (canvas.width - cardWidth),
    y: Math.random() * (canvas.height - cardHeight),
    isFaceUp: false,
  };
}

function shuffleCards() {
  /**
   * Shuffles an array of cards.
   *
   * @returns {Array} The shuffled array of cards.
   */
  const shuffledCards = [];
  for (let i = 0; i < cardPairs; i++) {
    const color = colors[i];
    const term = terms[i];
    const definition = definitions[i];
    shuffledCards.push(createCard(term, definition, color));
    shuffledCards.push(createCard(term, definition, color));
  }
  shuffledCards.sort(() => Math.random() - 0.5);
  return shuffledCards;
}

function drawCard(card, faceUp = false) {
  /**
   * Draws a card on the canvas.
   *
   * @param {Object} card - The card object to be drawn.
   * @param {boolean} [faceUp=false] - Indicates whether the card should be drawn face up or face down.
   * @returns {void}
   */
  const { x, y, color, term, definition } = card;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cardWidth, cardHeight);
  ctx.font = "14px Arial";
  ctx.fillText(faceUp ? term : definition, x + 20, y + 50);
}

function draw() {
  /**
   * Draws all the cards on the canvas.
   *
   * @returns {void}
   */
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the cards
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    drawCard(card, card.isFaceUp);
  }
}

canvas.addEventListener("click", handleCardClick);

function handleCardClick(e) {
  // Get the edges of the canvas element - This method draws a box around the canvas element and returns an object with properties describing the size and position of the box.
  const rect = canvas.getBoundingClientRect();

  // Get the x and y coordinates of the click event relative to the canvas element
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

// Check if the click event is within the bounds of a card
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    // If the card is face down and the click event is within the bounds of the card contiunue with the logic
    if (
      !card.isFaceUp &&
      Math.abs(clickX - card.x) < cardWidth / 2 &&
      Math.abs(clickY - card.y) < cardHeight / 2
    ) {
        // If the selected card is null(The card has never been set), set the selected card to the clicked card
      if (selectedCard === null) {
        selectedCard = card;
        // Else if the selected is not the current card
      } 
      // Both Cards Match
        // matchedCards++;
        // Leave cards face up
        // selectedCard = null;
      // Both Cards Dont Match
        // Flip both cards back over
        // selectedCard = null;

      
    //   else if (selectedCard !== card) {
    //     // Flip it
    //     selectedCard.isFaceUp = true;
    //     card.isFaceUp = true;
        
    //     // Unselect the card
    //     selectedCard = null;
    //     // If the selected card term is equal to the current card term
    //     if (selectedCard.term === card.term) {
    //       matchedCards++;
    //     }

    //   }
    }
  }
}


function isWin() {
  /**
   * Checks if the game is won.
   *
   * @returns {boolean} Indicates whether the game is won.
   */
    if (matchedCards === totalCards) {
        alert("Congratulations! You matched all the cards.");
    }
}

// Shuffle the cards and redraw them
cards = shuffleCards();


// Game Logic (or Game Loop)
// Function Game Loop
    // Draw the cards
    // Check if the game is won
    // Request animation frame

// Plan of Execution 
// 1. Finish the Card Checking logic in the handleCardClick function
// 2. Add the game loop function
// 3. Add delay to the card flipping logic

