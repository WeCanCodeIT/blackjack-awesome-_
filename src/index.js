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

const userChips = document.querySelector(".user__chips");
const currentWager = document.querySelector(".user__wager");
const wagerInput = document.querySelector(".wager__input");
const total_wins = document.querySelector(".total-wins");
const total_games = document.querySelector(".total-games");
const game_result = document.querySelector(".game-result");
let totalWins = 0;
let totalLosses = 0;

hit_button.hidden = true;
stand_button.hidden = true;
double_button.hidden = true;
wager_button.disabled = false;

singleDeckGame.deal();
let userHand = singleDeckGame.getUserHand();
let dealerHand = singleDeckGame.getDealerHand();

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
  play_again_button.hidden = true;

  wagerInput.hidden = false;
  wagerInput.textContent = "";
  wager_button.hidden = false;
  wager_button.disabled = false;

  playerCard.innerHTML = "";
  dealerCard.innerHTML = "";
  game_result.innerHTML = ""; 

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
  dealerCard.innerHTML = "";
  Dom.displayCards(userHand.getCards(), playerCard);

  Dom.finishDealerHand(singleDeckGame);
  dealerCard.innerHTML = "";
  Dom.displayCards(dealerHand.getCards(), dealerCard);
  processResult();

});

double_button.addEventListener("click", () => {
  singleDeckGame.doubleUser();
  singleDeckGame.evaluateUser();
  playerCard.innerHTML = ""; 
  Dom.displayCards(userHand.getCards(), playerCard);
  Dom.disableActionButtons();
  userChips.textContent = singleDeckGame.getUserChips();
  currentWager.textContent = singleDeckGame.getAnte();

  Dom.finishDealerHand(singleDeckGame);
  dealerCard.innerHTML = "";
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

  singleDeckGame.deal();
  userHand = singleDeckGame.getUserHand();
  dealerHand = singleDeckGame.getDealerHand();

  Dom.displayCards(userHand.getCards(), playerCard);
  Dom.displayCards([dealerHand.getCards()[0]], dealerCard);
}));

function processResult(){  

  switch (singleDeckGame.outcome()) {
    case Result.WIN:
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