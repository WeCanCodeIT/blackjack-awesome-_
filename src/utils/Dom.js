module.exports = {
    createPlayingCard(card) {

        const playing_card = document.createElement("div");
        playing_card.classList.add("playing-card");

        const container = document.createElement("div");
        container.classList.add("playing-card__container");

        let cardSuit = card.getSuit();
        console.log(cardSuit);

        if (cardSuit == "♡" || cardSuit == "♢") {
            container.classList.add("red-suit");
        } else {
            container.classList.add("black-suit");
        }

        const suit = document.createElement("div");
        suit.classList.add("playing-card__suit");
        suit.textContent = cardSuit;

        const value = document.createElement("div");
        value.classList.add("playing-card__value");
        value.textContent = card.getValue();

        container.append(suit);
        container.append(value);
        playing_card.append(container);

        return playing_card;

    },

    disableActionButtons() {
        const actionsContainer = document.querySelector(".game__player-actions");
        const actionButtons = actionsContainer.querySelectorAll(".button");
        actionButtons.forEach(button => button.setAttribute("disabled", "true"));
    },

    displayCards(cardsArray, containerElement) {
        cardsArray.forEach(card => {
            containerElement.append(this.createPlayingCard(card));
        });
    },

    clickStand(singleDeckGame) {
        singleDeckGame.standUser();
        singleDeckGame.evaluateUser();
        this.disableActionButtons();
    },

    clickHit(singleDeckGame) {
        singleDeckGame.evaluateUser();
        if (!singleDeckGame.isUserBust()) {
            singleDeckGame.hitUser();   
            singleDeckGame.evaluateUser();             
        
            if (singleDeckGame.isUserBust()) {       
                this.disableActionButtons();
                this.finishDealerHand(singleDeckGame);
                document.querySelector(".game__dealer-cards").innerHTML = "";
                this.displayCards(singleDeckGame.getDealerHand().getCards(), document.querySelector(".game__dealer-cards"));
            }
        }
    },

    clickWager(singleDeckGame, wager) {
        singleDeckGame.resetAnte();
        singleDeckGame.receiveAnte(wager);
    },

    finishDealerHand(singleDeckGame){
        userHandValue = singleDeckGame.evaluateUser();
        console.log("User Hand Value: " + userHandValue);

        dealerHandValue = singleDeckGame.evaluateDealer();        
        console.log("Dealer Hand (after evaluate): " + dealerHandValue);

        singleDeckGame.settleDealerHand();
        dealerHandValue = singleDeckGame.evaluateDealer();  
        console.log("Dealer Hand (after settle): " + dealerHandValue);

        if (singleDeckGame.isUserBust()) {
            console.log("User is bust when dealer hand is finishing.")
        }  

    }

};