const {
  default: { singleDeckGame, Result }
} = require("blackjack-dealer-logic");

const Dom = require("./utils/Dom");

const playerCard = document.querySelector(".game__player-cards");
const dealerCard = document.querySelector(".game__dealer-cards");

const wager_button = document.querySelector(".action__wager");
const hit_button = document.querySelector(".action__hit");
const stand_button = document.querySelector(".action__stand");
const double_button = document.querySelector(".action__double");
const play_again_button = document.querySelector(".action__play-again");

let userChips = document.querySelector(".user__chips");
let currentWager = document.querySelector(".user__wager");
let wagerInput = document.querySelector(".wager__input");
let total_wins = document.querySelector(".total-wins");
let total_games = document.querySelector(".total-games");
let totalWins = 0;
let totalLosses = 0;

hit_button.hidden = true;
stand_button.hidden = true;
double_button.hidden = true;
wager_button.disabled = false;

singleDeckGame.deal();
const userHand = singleDeckGame.getUserHand();
const dealerHand = singleDeckGame.getDealerHand();

userChips.textContent = singleDeckGame.getUserChips();
currentWager.textContent = singleDeckGame.getAnte();
total_wins.textContent = totalWins;
total_games.textContent = totalWins + totalLosses;

play_again_button.addEventListener("click", () => {
  singleDeckGame.resetAnte();
  singleDeckGame.resetPlayers();
  hit_button.hidden = true;
  hit_button.disabled = false;
  stand_button.hidden = true;
  stand_button.disabled = false;
  double_button.hidden = true;
  double_button.disabled = false;

  wagerInput.hidden = false;
  wagerInput.textContent = "";
  wager_button.hidden = false;
  wager_button.disabled = false;
})

hit_button.addEventListener("click", () => {
  Dom.clickHit(singleDeckGame);
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);

  if (singleDeckGame.isUserBust()) {
    processResult();
  }

});

stand_button.addEventListener("click", () => {
  Dom.clickStand(singleDeckGame);
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);

  Dom.finishDealerHand(singleDeckGame);
  Dom.displayCards(dealerHand.getCards(), dealerCard);
  processResult();

});

double_button.addEventListener("click", () => {
  singleDeckGame.doubleUser();
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);
  Dom.disableActionButtons();
  userChips.textContent = singleDeckGame.getUserChips();
  currentWager.textContent = singleDeckGame.getAnte();

  Dom.finishDealerHand(singleDeckGame);
  Dom.displayCards(dealerHand.getCards(), dealerCard);

  processResult();

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
  Dom.displayCards([dealerHand.getCards()[0]], dealerCard);
}));

function processResult(){

  const game_result = document.querySelector(".game-result");

  switch (singleDeckGame.outcome()) {
    case Result.WIN:
      singleDeckGame.userWin();
      ++totalWins;
      singleDeckGame.userWin();
      console.log("You won!!! Total Wins = " + totalWins);
      game_result.append("You won!!! Total Wins = " + totalWins);
      break;
    case Result.PUSH:
      ++totalLosses ;
      console.log("You pushed. Which counts as a loss because we are cheaters.");
      console.log("Total Losses = " + totalLosses);
      game_result.innerHTML = "<p>You pushed. Which counts as a loss because we are cheaters.</p>  <p>Total Losses = </p>" + totalLosses;
      break;
    case Result.LOSS:
      ++totalLosses ;
      console.log("You lost!!! Total Losses = " + totalLosses);
      game_result.append("You lost!!! Total Losses = " + totalLosses);
      break;
    default:
      break;
  }

  userChips.innerHTML = "";
  total_games.innerHTML = "";
  userChips.textContent = singleDeckGame.getUserChips();
  currentWager.textContent = singleDeckGame.getAnte();

  total_wins.innerHTML = ""; 
  total_games.innerHTML = ""; 
  total_wins.textContent = totalWins;
  total_games.textContent = totalWins + totalLosses;

  if (singleDeckGame.getUserChips() > 0) {
    play_again_button.hidden = false;
  }
}