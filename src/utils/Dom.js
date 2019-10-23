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

    displayCards(cardsArray, containerElement) {
        cardsArray.forEach(card => {
            containerElement.append(this.createPlayingCard(card));
        });
    }

};