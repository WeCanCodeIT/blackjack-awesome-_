const {
  default: { singleDeckGame }
} = require("blackjack-dealer-logic");

const Dom = require("./utils/Dom");

const playerCard = document.querySelector(".game__player-cards");
const dealerCard = document.querySelector(".game__dealer-cards");

const wager_button = document.querySelector(".action__wager");
const hit_button = document.querySelector(".action__hit");
const stand_button = document.querySelector(".action__stand");
const double_button = document.querySelector(".action__double");

let userChips = document.querySelector(".user__chips");
let currentWager = document.querySelector(".user__wager");
let wagerInput = document.querySelector(".wager__input");

hit_button.hidden = true;
stand_button.hidden = true;
double_button.hidden = true;
wager_button.disabled = false;

singleDeckGame.deal();
const userHand = singleDeckGame.getUserHand();
const dealerHand = singleDeckGame.getDealerHand();

userChips.textContent = singleDeckGame.getUserChips();
currentWager.textContent = singleDeckGame.getAnte();

hit_button.addEventListener("click", () => {
  Dom.clickHit(singleDeckGame);
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);
});

stand_button.addEventListener("click", () => {
  Dom.clickStand(singleDeckGame);
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);
});

double_button.addEventListener("click", () => {
  // double wager code goes here
  Dom.clickHit(singleDeckGame);
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);
});

wager_button.addEventListener("click", (() => {
  let wager = wagerInput.value;
  Dom.clickWager(singleDeckGame, wager);
  currentWager.textContent = singleDeckGame.getAnte();
  userChips.textContent = singleDeckGame.getUserChips();
  wagerInput.hidden = true;
  wager_button.hidden = true;
  hit_button.hidden = false;
  stand_button.hidden = false;
  double_button.hidden = false;
  Dom.displayCards(userHand.getCards(), playerCard);
  Dom.displayCards(dealerHand.getCards(), dealerCard);
}));
