const {
  default: { singleDeckGame }
} = require("blackjack-dealer-logic");

const Dom = require("./utils/Dom");

const playerCard = document.querySelector(".game__player-cards");
const dealerCard = document.querySelector(".game__dealer-cards");
singleDeckGame.deal();

const userHand = singleDeckGame.getUserHand();
const dealerHand = singleDeckGame.getDealerHand();

Dom.displayCards(userHand.getCards(), playerCard);
Dom.displayCards(dealerHand.getCards(), dealerCard);

console.log(singleDeckGame.getAnte());
console.log(singleDeckGame.getUserChips());

let userChips = document.querySelector(".user__chips");
userChips.textContent = singleDeckGame.getUserChips();

let currentWager = document.querySelector(".user__wager");
currentWager.textContent = singleDeckGame.getAnte();

let wagerInput = document.querySelector(".wager__input");
// wagerInput.min = singleDeckGame.getAnte();

const hit_button = document.querySelector(".action__hit");
hit_button.addEventListener("click", () => {
  Dom.clickHit(singleDeckGame);
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);
});

const stand_button = document.querySelector(".action__stand");
stand_button.addEventListener("click", () => {
  Dom.clickStand(singleDeckGame);
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);
});

const wager_button = document.querySelector(".action__wager");
wager_button.addEventListener("click", (() => {
  let wager = wagerInput.value;
  Dom.clickWager(singleDeckGame, wager);
  currentWager.textContent = singleDeckGame.getAnte();
  userChips.textContent = singleDeckGame.getUserChips();
  wagerInput.hidden = true;
  wager_button.hidden = true;
  
}));


