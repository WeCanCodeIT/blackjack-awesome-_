module.exports = {
    createPlayingCard(card) {

        const playing_card = document.createElement("div");
        playing_card.classList.add("playing-card");

        const container = document.createElement("div");
        container.classList.add("playing-card__container");
        container.classList.add("red-suit");

        const suit = document.createElement("div");
        suit.classList.add("playing-card__suit");
        suit.textContent = card.getSuit();

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
        }
    },

    clickWager(singleDeckGame, wager) {
        singleDeckGame.resetAnte();
        singleDeckGame.receiveAnte(wager);
    }


};