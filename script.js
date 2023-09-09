let score = 0;
const cardsContainer = document.getElementById("cards");
let cards = [];

let firstCard, secondCard;
let lockBoard = false;
document.querySelector(".score").textContent = score;
fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
   cards = [...data, ...data];
   shuffleCards();
  generateCards();
   console.log(cards);
  });

  function shuffleCards () {
let temp;
let currentIndex = cards.length;
let randomIndex;

while(currentIndex !== 0) {
  randomIndex = Math.floor (Math.random()* currentIndex);
  currentIndex -= 1;
  temp = cards[currentIndex]
  cards [currentIndex] = cards[randomIndex];
  cards[randomIndex] = temp;
}
  }
  function generateCards() {
    for (let card of cards){
      const cardElement = document.createElement("div");

      cardElement.classList.add("card");

      cardElement.setAttribute("data-name" , card.name);
      cardElement.innerHTML =`
      <div class="front">
    <img class="front-image" src=${card.image}>
</div>
<div class="back"></div>
      `;
      cardsContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
  }
  function flipCard(){
if(lockBoard) return;
if (this === firstCard) return;
this.classList.add("flipped");
if (!firstCard) {
firstCard = this;
return;
}

secondCard = this;
document.querySelector(".score").textContent = score;
 lockBoard = true;

checkForMatch()
  }
  function checkForMatch() {
let isMatch = firstCard.dataset.name === secondCard.dataset.name;

isMatch ? disableCards () : unflipCards();
  }
  function unflipCards(){
setTimeout(() => {
  firstCard.classList.remove("flipped");
  secondCard.classList.remove("flipped");
unlockBoard();
}, 1000);
  }
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.removeEventListener("touchstart", flipCard);
    secondCard.removeEventListener("touchstart", flipCard);
score = score +1;
console.log(score);
document.querySelector(".score").textContent = score;
if (score === 9) {
     startConfetti();
}
    unlockBoard();
  }
  function unlockBoard() {
firstCard =null;
secondCard = null;
lockBoard = false;
  }
  function restart(){
    unlockBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
cardsContainer.innerHTML = "";
generateCards();
stopConfetti();
  }