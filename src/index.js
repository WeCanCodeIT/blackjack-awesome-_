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

    const hit_button = document.querySelector(".action__hit");
    hit_button.addEventListener("click", () => {
        singleDeckGame.evaluateUser();
        
        if (!singleDeckGame.isUserBust()){
            singleDeckGame.hitUser();
            playerCard.innerHTML = "";
            Dom.displayCards(userHand.getCards(), playerCard);
        }
})




