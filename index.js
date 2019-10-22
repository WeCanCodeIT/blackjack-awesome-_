// const {
//     default: { singleDeckGame }
//   } = require("blackjack-dealer-logic");
  
//   singleDeckGame.deal();
  
//   const userHand = singleDeckGame.getUserHand();
  
//   createPlayingCard(userHand.getCards()[0]);
//   createPlayingCard(userHand.getCards()[1]);


const hit_button = document.querySelector(".action__hit");
hit_button.addEventListener("click", () => {

    // createPlayingCard(userHand.getCards()[0]);
    createPlayingCard();
    
})

function createPlayingCard() {

    const playing_card = document.createElement("div");
    playing_card.classList.add("playing-card");

    const container = document.createElement("div");
    container.classList.add("playing-card__container");
    container.classList.add("red-suit");

    const suit = document.createElement("div");
    suit.classList.add("playing-card__suit");
    suit.textContent = "♠";

    const value = document.createElement("div");
    value.classList.add("playing-card__value");
    value.textContent = "A";

    container.append(suit);
    container.append(value);
    playing_card.append(container);

    const cards = document.querySelector(".game__player-cards");
    cards.append(playing_card);

}




