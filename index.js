// const { singleDeckGame, Result } = require('blackjack-dealer-logic');
// const input = require('readline-sync');
 
/*
<div class="playing-card">
    <div class="playing-card__container red-suit">
        <div class="playing-card__suit">♠</div>
           <div class="playing-card__value">A</div>
        </div>
     </div>
                    */

const hit_button = document.querySelector(".action__hit");
hit_button.addEventListener("click", () => {

    const playing_card = document.createElement("div");
    playing_card.classList.add("playing-card");

    const container = document.createElement("div");
    container.classList.add("playing-card__container");
    container.classList.add("red-suit");

    const suit = document.createElement("div");
    suit.classList.add("playing-card__suit");

    const value = document.createElement("div");
    value.classList.add("playing-card__value");

    container.append(suit);
    container.append(value);
    playing_card.append(container);
    document.append(playing_card);

})

// const backgroundButton = document.querySelector(".addBackground");

// buttons.forEach(function(button) {
//   button.addEventListener("click", () => {
//     const paragraph = document.createElement("p");

//     paragraph.classList.add("newParagraph");

//     paragraph.textContent = "My new paragraph!";

//     document.body.append(paragraph);
//   });
// });

// backgroundButton.addEventListener("click", () => {
//   const paragraph = document.querySelector(".newParagraph");

//   paragraph.classList.add("redBackground");
//   paragraph.classList.remove("newParagraph");
// });