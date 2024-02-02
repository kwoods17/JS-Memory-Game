const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cardWidth = 150;
const cardHeight = 200;
const cardSpacing = 20;
const cardPairs = 8;
const totalCards = cardPairs * 2;
const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#900C3F', '#C70039', '#581845', '#581845', '#C70039', '#FF5733', '#FFC300', '#DAF7A6', '#900C3F'];
const terms = ['var', 'let', 'const', 'function', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue'];
const definitions = ['variable declaration', 'variable declaration', 'constant variable declaration', 'function declaration', 'if statement', 'else statement', 'for loop', 'while loop', 'switch statement', 'case statement', 'break statement', 'continue statement'];
let cards = [];
let selectedCard = null;
let matchedCards = 0;

function createCard(term, definition, color) {
    return {
        term,
        definition,
        color,
        x: Math.random() * (canvas.width - cardWidth),
        y: Math.random() * (canvas.height - cardHeight),
        isFaceUp: false
    };
}

function shuffleCards() {
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
    const { x, y, color, term, definition } = card;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cardWidth, cardHeight);
    ctx.font = '14px Arial';
    ctx.fillText(faceUp ? term : definition, x + 20, y + 50);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        drawCard(card, card.isFaceUp);
    }
}

// Shuffle the cards and redraw them
cards = shuffleCards();

canvas.addEventListener('click', handleCardClick);

function handleCardClick(e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (!card.isFaceUp && Math.abs(clickX - card.x) < cardWidth / 2 && Math.abs(clickY - card.y) < cardHeight / 2) {
          if (selectedCard === null) {
              selectedCard = card;
          } else if (selectedCard !== card) {
              selectedCard.isFaceUp = true;
              card.isFaceUp = true;
              selectedCard = null;
              if (selectedCard.term === card.term) {
                  matchedCards++;
              }
              if (matchedCards === totalCards) {
                  alert('Congratulations! You matched all the cards.');
              }
          }
      }
  }
}