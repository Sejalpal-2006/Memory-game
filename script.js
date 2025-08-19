const emojis = ["😀","😀","🙈","🙈","🍑","🍑","🥨","🥨",
                "🍍","🍍","🍉","🍉","🎮","🎮","🎓","🎓"];

let firstCard, secondCard;
let lockBoard = false;
const board = document.querySelector(".gameboard");

function startGame() {
  // clear board
  board.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // shuffle emojis
  let shuffled = [...emojis].sort(() => Math.random() - 0.5);

  // create cards dynamically
  shuffled.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="inner-card">
        <div class="front">${symbol}</div>
        <div class="back">?</div>
      </div>
    `;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch =
    firstCard.querySelector(".front").textContent ===
    secondCard.querySelector(".front").textContent;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function resetGame() {
  startGame();
}

// Start game on page load
startGame();
